import { getPayload } from 'payload';
import configPromise from '../../../../payload.config';

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise });
    
    // Seed Reviews
    await payload.create({
      collection: 'reviews',
      data: {
        reviewerName: 'Rahul Sharma',
        rating: 5,
        datePosted: '2 weeks ago',
        googleMapsUrl: 'https://maps.google.com',
        reviewText: 'Master Pramod is an exceptional instructor! The training is intense but highly rewarding. I have learned so much about self-defense and discipline. Highly recommend LHBS to anyone looking to master martial arts.',
      }
    });

    await payload.create({
      collection: 'reviews',
      data: {
        reviewerName: 'Neha Verma',
        rating: 5,
        datePosted: 'a month ago',
        googleMapsUrl: 'https://maps.google.com',
        reviewText: 'Best martial arts academy in Indore! The facility is top-notch and the community is extremely supportive. Whether you are a beginner or advanced, you will find immense value here. 5 stars!',
      }
    });

    return Response.json({ success: true, message: 'Reviews seeded' });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
