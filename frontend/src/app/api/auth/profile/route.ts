import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const token = req.headers.get('Authorization');

    const res = await fetch('http://localhost:4567/users/me', {
        method: 'GET',
        headers: {
            Authorization: token || '',
        },
    });

    if (!res.ok) {
        let error;
        try {
            error = await res.json();
        } catch {
            return NextResponse.json(
                { error: 'Erro inesperado ao processar a resposta do backend.' },
                { status: res.status }
            );
        }
        return NextResponse.json({ error: error.error }, { status: res.status });
    }

    let data;
    try {
        data = await res.json();
    } catch {
        return NextResponse.json(
            { error: 'Erro inesperado ao processar a resposta do backend.' },
            { status: 500 }
        );
    }

    return NextResponse.json(data);
}