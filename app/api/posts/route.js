import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '../../../payload.config';
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/authOptions";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Strict admin email checking
    const adminEmails = [
      'pramod@martialartsschool.in', 
      'garv@martialartsschool.in',
      'theestatecompany11@gmail.com'
    ];
    
    if (!adminEmails.includes(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized: Not an admin' }, { status: 401 });
    }

    const payload = await getPayload({ config: configPromise });
    const { title, slug, contentHtml, contentJson } = await req.json();

    if (!title || !slug) {
      return NextResponse.json({ error: 'Title and Slug are required' }, { status: 400 });
    }

    const newPost = await payload.create({
      collection: 'posts',
      data: {
        title,
        slug,
        contentHtml,
        contentJson,
        metaTitle: title,
      },
    });

    return NextResponse.json({ success: true, post: newPost });
  } catch (error) {
    console.error('Error saving post:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
