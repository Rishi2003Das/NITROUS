import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import  connectToDB  from '@/dbConnect/dbConnect';
import { generateConnectToken } from '@/helpers/getToken'; // assumes you added generateConnectToken
import { sendEmail } from '@/helpers/connectMail';

export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const { recipientId } = await req.json();
    const senderJSON = req.cookies.get('User')?.value;
    if (!senderJSON) {
      return NextResponse.json({ error: 'Unauthorized: No sender data' }, { status: 401 });
    }

    const sender = JSON.parse(senderJSON);
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return NextResponse.json({ error: 'Recipient not found' }, { status: 404 });
    }

    // Generate JWT token with sender info
    const token = generateConnectToken({
      userId: recipient._id.toString(),
      senderEmail: sender.email,
      senderName: sender.name,
      emailType: 'CONNECT'
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const subject = `${sender.name} wants to connect with you on SkillSwap`;
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
        <h2>👋 New Connection Request</h2>
        <p><strong>${sender.name}</strong> wants to connect with you on <strong>SkillSwap</strong>.</p>
        <p>Email: ${sender.email}</p>

        <div style="margin: 20px 0;">
          <a href="${baseUrl}/api/respond?token=${token}&action=accept" 
             style="padding: 12px 20px; background: #10b981; color: white; text-decoration: none; border-radius: 5px; margin-right: 10px;">
            ✅ Accept
          </a>
          <a href="${baseUrl}/api/respond?token=${token}&action=reject" 
             style="padding: 12px 20px; background: #ef4444; color: white; text-decoration: none; border-radius: 5px;">
            ❌ Reject
          </a>
        </div>

        <p>If you do not recognize this request, you can safely ignore this email.</p>
        <hr />
        <p style="font-size: 12px; color: #999;">SkillSwap &copy; ${new Date().getFullYear()}</p>
      </div>
    `;

    // Send the email with Accept/Reject buttons
    await sendEmail({
      email: recipient.email,
      emailType: 'CONNECT',
      userId: recipient._id.toString(),
      subject,
      html,
    });

    return NextResponse.json({ message: 'Connection email sent successfully.' });

  } catch (error) {
    console.error('Connect route error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
