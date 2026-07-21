import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '../../../payload.config';
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const cookieStore = await cookies();
    const hasAccess = cookieStore.get("admin_write_access")?.value === "true";
    
    if (!hasAccess) {
      return NextResponse.json({ error: 'Unauthorized: Not logged in as admin' }, { status: 401 });
    }

    const payload = await getPayload({ config: configPromise });
    const { title, slug, contentHtml, contentJson, coverImage, excerpt } = await req.json();

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
        coverImageUrl: coverImage, // The frontend passes the URL as coverImage
        excerpt,
        metaTitle: title,
        metaDescription: excerpt,
      },
    });

    return NextResponse.json({ success: true, post: newPost });
  } catch (error) {
    console.error('Error saving post:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
