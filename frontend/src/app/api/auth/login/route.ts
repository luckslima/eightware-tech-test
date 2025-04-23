import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { email, password } = await req.json();

    const res = await fetch('http://localhost:4567/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
        const error = await res.json();
        return NextResponse.json({ error: error.error }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
}