import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    const { email, subject, message } = await req.json();

    if (!email || !subject || !message) {
        return NextResponse.json({ error: 'Champs manquants' }, { status: 400 });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: email,
            to: process.env.SMTP_USER,
            subject: `[Portfolio] ${subject}`,
            text: message,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Erreur email:', err);
        return NextResponse.json({ error: 'Erreur envoi email' }, { status: 500 });
    }
}
