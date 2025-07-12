import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/helpers/connectMail'; // adjust the path if needed

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { receiverEmail, sender } = body;

    if (!receiverEmail || !sender) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    // Custom connect email content
    const html = `
      <div style="font-family: Arial, sans-serif;">
        <h2 style="color: #6366f1;">New Connect Request on SkillSwap</h2>
        <p><strong>${sender.name}</strong> wants to connect with you!</p>
        <p>Email: ${sender.email}</p>
        ${sender.location ? `<p>Location: ${sender.location}</p>` : ''}
        <p><strong>Skills Offered:</strong></p>
        <ul>
          ${sender.skillsOffered?.map((s: any) => `<li>${s.name} (${s.proficiency || 'n/a'})</li>`).join('')}
        </ul>
        <p><strong>Skills Wanted:</strong></p>
        <ul>
          ${sender.skillsWanted?.map((s: any) => `<li>${s.name} (${s.proficiency || 'n/a'})</li>`).join('')}
        </ul>
        <p>Reply directly to this email to continue the conversation.</p>
      </div>
    `;

    await sendEmail({
      email: receiverEmail,
      emailType: 'VERIFY', // you can use a custom type or rename this
      userId: 'connect-action', // dummy
      html, // pass custom HTML to your modified sendEmail function
      subject: 'SkillSwap: Someone wants to connect with you!',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
