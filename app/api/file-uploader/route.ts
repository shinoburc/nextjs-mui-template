import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/app/_utils/prismaSingleton';

/*
export const config = {
  api : {
    bodyParser : false
  }
}
*/

export async function POST(request : NextRequest, response : NextResponse) {
  console.log('POST /api/file-uploader');

  const formData = await request.formData();
  const formDataList = formData.getAll('files');
  const anyJsonString = formData.get('anyJson') as string | null;

  if(anyJsonString) {
    const anyJson = JSON.parse(anyJsonString);
    console.log(anyJson)
  }
  console.log(formDataList);
  
  return NextResponse.json({ message: 'Hello' });
}
