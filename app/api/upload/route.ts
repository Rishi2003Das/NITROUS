import { NextResponse } from 'next/server';
import { uploadImage } from '@/utils/cloudinary';

export async function POST(request: Request) {
  try {
    const { image } = await request.json();
    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    const secureUrl = await uploadImage(image);
    return NextResponse.json({ secureUrl });
    
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Image upload failed', details: error instanceof Error ? error.message : undefined },
      { status: 500 }
    );
  }
}