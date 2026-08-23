import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getAll } from "@vercel/edge-config";
import { getAllProjectsMeta } from "@/lib/projects";

const CHECK_TIMEOUT_MS = 3_000;
const HTTP_ATTEMPT_TIMEOUT_MS = 1_500;
const CRITICAL_SERVICES = new Set(["data", "mailer"]);

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), ms)
    );
    return Promise.race([promise, timeout]);
}

async function check(name: string, operation: () => Promise<boolean>): Promise<[string, boolean]> {
    try {
        const isUp = await withTimeout(operation(), CHECK_TIMEOUT_MS);
        return [name, isUp];
    } catch {
        return [name, false];
    }
}

async function checkHttp(url: string, headers?: HeadersInit, retries = 1): Promise<boolean> {
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url, {
                headers,
                signal: AbortSignal.timeout(HTTP_ATTEMPT_TIMEOUT_MS),
                cache: "no-store",
            });
            if (response.ok) return true;
            if (attempt === retries) {
                console.error(`HTTP check failed: ${response.status}`, await response.text());
            }
        } catch (err) {
            if (attempt === retries) console.error("HTTP check threw:", err);
        }
        if (attempt < retries) await new Promise((r) => setTimeout(r, 250));
    }
    return false;
}

export async function GET() {
    const results = await Promise.all([
        check("mailer", async () => {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });
            return transporter.verify().then(() => true).catch(() => false);
        }),
        check("vercel_config", async () => {
            const configItems = await getAll();
            return configItems && Object.keys(configItems).length > 0;
        }),
        check("data", async () => {
            const projects = getAllProjectsMeta();
            return projects && projects.length > 0;
        }),
    ]);

    const checks = Object.fromEntries(results);

    const coreUp = results
        .filter(([name]) => CRITICAL_SERVICES.has(name))
        .every(([, isUp]) => isUp);
    const allUp = coreUp;

    return NextResponse.json(
        {
            status: allUp ? "up" : "down",
            checks,
            timestamp: new Date().toISOString(),
        },
        {
            status: allUp ? 200 : 503,
            headers: { "Cache-Control": "no-store" },
        }
    );
}