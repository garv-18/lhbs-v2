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

    // Check if post already exists
    const existingPosts = await payload.find({
      collection: 'posts',
      where: { slug: { equals: slug } },
      limit: 1,
    });

    let savedPost;

    if (existingPosts.docs.length > 0) {
      savedPost = await payload.update({
        collection: 'posts',
        id: existingPosts.docs[0].id,
        overrideAccess: true,
        data: {
          title,
          contentHtml,
          contentJson,
          coverImageUrl: coverImage,
          excerpt,
          metaTitle: title,
          metaDescription: excerpt,
        },
      });
    } else {
      savedPost = await payload.create({
        collection: 'posts',
        overrideAccess: true, // Bypass Payload's internal access control since we manually verified the admin cookie
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
    }

    return NextResponse.json({ success: true, post: savedPost });
  } catch (error) {
    console.error('Error saving post:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
