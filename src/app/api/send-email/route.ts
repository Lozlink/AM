import { NextRequest, NextResponse } from 'next/server';
import { sendEnquiryEmail } from '@/lib/sesClient';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, message, enquiry_type } = body;

    if (!name || !email || !message || !enquiry_type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await sendEnquiryEmail(body);

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Send email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
