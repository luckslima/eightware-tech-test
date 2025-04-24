import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const formData = await req.formData();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;
    const bio = formData.get('bio') as string;
    const photo = formData.get('photo') as File | null;

    const res = await fetch('http://localhost:4567/users/signup', {
        method: 'POST',
        body: formData
    });

    if (!res.ok) {
        const error = await res.json();
        return NextResponse.json({ error: error.error }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
}