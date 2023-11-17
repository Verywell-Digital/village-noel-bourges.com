import { NextRequest, NextResponse } from 'next/server';
import sendEmail from '@/service/send-email';

export async function POST(req: NextRequest) {
  const { formData, emailDestinationAddress, emailSubject } = await req.json();

  try {
    await sendEmail(formData, emailDestinationAddress, emailSubject);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

