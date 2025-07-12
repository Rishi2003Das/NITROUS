import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { sendEmail } from '@/helpers/connectMail';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  const action = searchParams.get('action'); // "accept" or "reject"

  if (!token || !action) {
    return NextResponse.json({ error: 'Invalid or missing parameters' }, { status: 400 });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    const { senderEmail, senderName, userId } = decoded;

    let subject = '';
    let html = '';

    if (action === 'accept') {
      subject = '🎉 Your connection was accepted!';
      html = `
        <p>Hi ${senderName},</p>
        <p>Your request to connect on SkillSwap was <strong style="color:green;">ACCEPTED</strong>! 🎉</p>
        <p>You can now collaborate with your match.</p>
      `;
    } else if (action === 'reject') {
      subject = '❌ Connection request rejected';
      html = `
        <p>Hi ${senderName},</p>
        <p>Unfortunately, your request to connect was <strong style="color:red;">REJECTED</strong>.</p>
        <p>Don't be discouraged — explore more matches on SkillSwap!</p>
      `;
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    await sendEmail({
      email: senderEmail,
      emailType: 'CONNECT-RESPONSE',
      userId,
      subject,
      html,
    });

    return NextResponse.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/response-confirmed`);
  } catch (err) {
    console.error('Error verifying token or sending email:', err);
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
  }
}
