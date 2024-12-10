import { NextResponse } from "next/server";
import { getAll } from "@vercel/edge-config";

export async function GET() {
	const configItems = await getAll();

	return NextResponse.json({
		label: `These are all the values in my Edge Config.`,
		value: configItems,
	});
}
