import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const authHeader = req.headers.get('Authorization');

    if (!authHeader) {
        return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 });
    }

    const res = await fetch('http://localhost:4567/users/me', {
        method: 'GET',
        headers: {
            'Authorization': authHeader,
        },
    });

    if (!res.ok) {
        const error = await res.json();
        return NextResponse.json({ error: error.error }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
}