import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
	const { name, email, message } = await request.json();

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL,
			pass: process.env.EMAIL_PASSWORD,
		},
	});
	const mailOptions = {
		from: email,
		to: process.env.TO_EMAIL,
		subject: `Contact from ${name} | PORTFOLIO REQUEST`,
		text: message,
		replyTo: email,
	};

	try {
		await transporter.sendMail(mailOptions);
		return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
	}
}
