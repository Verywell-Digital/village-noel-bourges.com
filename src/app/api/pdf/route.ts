// PROXY for fixing CORS issue

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.nextUrl);
  const pdfUrl = url.searchParams.get('pdfUrl');

  if (!pdfUrl) {
    return NextResponse.json({ error: "pdfUrl query parameter is required" }, { status: 400 });
  }

  const pdfResponse = await fetch(pdfUrl);

  if (!pdfResponse.ok) {
    return NextResponse.json({ error: pdfResponse.statusText }, { status: pdfResponse.status });
  }

  const pdfBuffer = await pdfResponse.arrayBuffer();

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf'
    }
  });
}
