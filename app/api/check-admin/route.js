import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email } = await request.json();
    // Use a non-public environment variable
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    if (!adminEmail) {
      console.error('ADMIN_EMAIL environment variable is not set.'); // Updated error message
      // It's crucial this variable is set on the server
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Explicitly check if email was provided in the request
    if (!email) {
      return NextResponse.json({ error: 'Email is required in the request body' }, { status: 400 });
    }

    const isAdmin = email === adminEmail;

    return NextResponse.json({ isAdmin });
  } catch (error) {
    console.error('Error checking admin status:', error);
    if (error instanceof SyntaxError) { // JSON parsing error
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}