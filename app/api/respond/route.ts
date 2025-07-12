import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/helpers/connectMail';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const senderEmail = searchParams.get('email');
    const action = searchParams.get('action');

    if (!senderEmail || !action) {
      return NextResponse.json({ error: 'Missing email or action' }, { status: 400 });
    }

    let subject = '';
    let html = '';

    if (action === 'accept') {
      subject = 'Your SkillSwap Request was Accepted 🎉';
      html = `<p>Great news! Your request has been accepted. You may now reach out and start swapping skills.</p>`;
    } else if (action === 'reject') {
      subject = 'Your SkillSwap Request was Rejected ❌';
      html = `<p>Unfortunately, your request was not accepted this time.</p>`;
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    await sendEmail({
      email: senderEmail,
      subject,
      emailType: action === 'accept' ? 'CONNECT_ACCEPTED' : 'CONNECT_REJECTED',
      html,
    });

    return new Response(`<h2>Email sent to ${senderEmail} for ${action}</h2>`, {
      headers: { 'Content-Type': 'text/html' }
    });

  } catch (err) {
    console.error('Respond error:', err);
    return NextResponse.json({ error: 'Failed to process response' }, { status: 500 });
  }
}
