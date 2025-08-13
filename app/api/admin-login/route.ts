import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const body = await req.json()
    const { password } = body

    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

    if (password === ADMIN_PASSWORD) {
        return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false }, { status: 401 })
}