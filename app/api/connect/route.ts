import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/helpers/connectMail';
import User from '@/models/userModel';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { receiverEmail, sender } = body;

    if (!receiverEmail || !sender) {
      return NextResponse.json({ error: 'Missing sender or receiver data' }, { status: 400 });
    }

    const receiver = await User.findOne({ email: receiverEmail });
    if (!receiver) {
      return NextResponse.json({ error: 'Receiver not found' }, { status: 404 });
    }
    const URL='https://nitrous-iota.vercel.app'
    const html = `
      <h2>New SkillSwap Request from ${sender.name}</h2>
      <p><strong>Email:</strong> ${sender.email}</p>
      <p><strong>Location:</strong> ${sender.location || 'N/A'}</p>

      <h4>Skills Offered:</h4>
      <ul>${(sender.skillsOffered || []).map((s: { name: string }) => `<li>${s.name}</li>`).join('')}</ul>

      <h4>Skills Wanted:</h4>
      <ul>${(sender.skillsWanted || []).map((s: { name: string }) => `<li>${s.name}</li>`).join('')}</ul>

      <p>Respond:</p>
      <a href="${URL}/api/respond?email=${encodeURIComponent(sender.email)}&action=accept"
         style="padding: 10px 15px; background: green; color: white; text-decoration: none; margin-right: 10px;">
        ✅ Accept
      </a>

      <a href="${URL}/api/respond?email=${encodeURIComponent(sender.email)}&action=reject"
         style="padding: 10px 15px; background: red; color: white; text-decoration: none;">
        ❌ Reject
      </a>
    `;

    await sendEmail({
      email: receiver.email,
      subject: `New SkillSwap Request from ${sender.name}`,
      emailType: 'CONNECT_REQUEST',
      html,
    });

    return NextResponse.json({ message: 'Connection request sent' });

  } catch (err) {
    console.error('Connect error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
