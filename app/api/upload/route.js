import { NextResponse } from 'next/server';
import ImageKit from '@imagekit/nodejs';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || '',
    });

    const uploadResponse = await imagekit.files.upload({
      file: buffer.toString('base64'), // required
      fileName: file.name || 'blog-image.jpg', // required
      folder: '/blogs', // Specific folder for all blog photos
    });

    return NextResponse.json({ url: uploadResponse.url });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
