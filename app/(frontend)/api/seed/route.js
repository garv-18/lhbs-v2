import { getPayload } from 'payload';
import configPromise from '../../../../payload.config';

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise });
    
    // Seed About Us
    await payload.create({
      collection: 'pages',
      data: {
        title: 'About Us',
        slug: 'about',
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                type: 'heading',
                tag: 'h2',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    mode: 'normal',
                    text: 'Our Legacy',
                    type: 'text',
                    version: 1
                  }
                ]
              },
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    mode: 'normal',
                    text: 'Welcome to LHBS Martial Arts Academy. Master Pramod has dedicated his life to the art of self-defense, discipline, and physical mastery. With decades of experience, we provide a safe, structured, and highly effective training environment for students of all levels.',
                    type: 'text',
                    version: 1
                  }
                ]
              }
            ]
          }
        }
      }
    });

    // Seed Refund Policy
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Refund Policy',
        slug: 'refundpolicy',
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    mode: 'normal',
                    text: 'No refund is provided once the payment is made, under any circumstances. Refund is only applicable if the institution fails to deliver promised sessions. All terms are legally binding under the laws of Indore, Madhya Pradesh.',
                    type: 'text',
                    version: 1
                  }
                ]
              }
            ]
          }
        }
      }
    });

    // Seed Terms and Conditions
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Terms & Conditions',
        slug: 'termsandconditions',
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    mode: 'normal',
                    text: 'By enrolling in our academy, you agree to abide by all the rules and regulations. Daily training and attendance policies are strictly enforced. Golden Time Slot clients must maintain strict punctuality and attendance.',
                    type: 'text',
                    version: 1
                  }
                ]
              }
            ]
          }
        }
      }
    });

    return Response.json({ success: true, message: 'Pages seeded' });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
