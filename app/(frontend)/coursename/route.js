import { getPayload } from 'payload';
import configPromise from '../../../payload.config';
import { NextResponse } from 'next/server';

export async function GET() {
  const payload = await getPayload({ config: configPromise });
  const courses = await payload.find({
    collection: 'coursenames',
  });
  return NextResponse.json(courses.docs);
}