import 'dotenv/config';
import { getPayload } from 'payload';
import configPromise from './payload.config.ts';

const niches = [
  {
    name: 'Martial Arts',
    slug: 'martial-arts',
    description: 'Ancient techniques focused on discipline, self-defense, and physical mastery. Our martial arts programs build foundational strength and advanced combat skills.',
  },
  {
    name: 'Holistic Health',
    slug: 'holistic-health',
    description: 'Integrative practices combining physical movement, breathing exercises, and mental clarity for overall wellness and longevity.',
  },
  {
    name: 'Functional Fitness',
    slug: 'functional-fitness',
    description: 'Dynamic exercises designed to improve mobility, core strength, and natural body movement mechanics.',
  },
  {
    name: 'Self Defense',
    slug: 'self-defense',
    description: 'Practical, real-world techniques to protect yourself and build unshakeable confidence in high-pressure situations.',
  },
  {
    name: 'Chi Energy',
    slug: 'chi-energy',
    description: 'Internal energy cultivation techniques that enhance vitality, focus, and the mind-body connection.',
  }
];

const audiences = [
  {
    name: 'for Beginners',
    slug: 'for-beginners',
    painPoints: 'Feeling intimidated, lacking foundational strength, and unsure where to start without getting injured.',
    benefits: 'Provides a safe, structured, and easy-to-follow path to master the basics and build confidence from day one.',
  },
  {
    name: 'for Business Leaders',
    slug: 'for-business-leaders',
    painPoints: 'High daily stress, mental fatigue, lack of focus during critical decisions, and limited time for traditional workouts.',
    benefits: 'Instills sharp mental discipline, acts as the ultimate stress-relief biohack, and optimizes peak professional performance.',
  },
  {
    name: 'for Women',
    slug: 'for-women',
    painPoints: 'Concerns about personal safety, looking for empowering environments, and wanting to build functional strength without bulk.',
    benefits: 'Builds self-reliance, teaches leverage-based techniques that do not rely on size, and fosters an empowering community.',
  },
  {
    name: 'for Weight Loss',
    slug: 'for-weight-loss',
    painPoints: 'Boredom with traditional gym routines, plateauing results, and struggling to stay motivated.',
    benefits: 'Delivers high-intensity, engaging workouts that burn calories rapidly while learning a valuable life skill.',
  },
  {
    name: 'for Corporate Wellness',
    slug: 'for-corporate-wellness',
    painPoints: 'Employee burnout, sedentary desk habits causing back pain, and disconnected teams.',
    benefits: 'Improves team cohesion, corrects posture through functional movement, and drastically reduces workplace stress.',
  },
  {
    name: 'for Seniors',
    slug: 'for-seniors',
    painPoints: 'Decreasing mobility, joint stiffness, and fear of falling or losing independence.',
    benefits: 'Enhances balance, promotes joint longevity through gentle movements, and maintains physical independence.',
  },
  {
    name: 'for Kids & Teens',
    slug: 'for-kids-and-teens',
    painPoints: 'Bullying, lack of discipline, excessive screen time, and low self-esteem.',
    benefits: 'Teaches respect, builds character, instills anti-bullying confidence, and keeps them physically active.',
  },
  {
    name: 'for Athletes',
    slug: 'for-athletes',
    painPoints: 'Looking for a competitive edge, cross-training variety, and advanced mobility work to prevent sports injuries.',
    benefits: 'Increases explosive power, enhances proprioception, and provides active recovery through dynamic stretching.',
  },
  {
    name: 'for Anxiety Relief',
    slug: 'for-anxiety-relief',
    painPoints: 'Overthinking, racing thoughts, panic attacks, and inability to stay present.',
    benefits: 'Forces the mind into the present moment through intense focus and rhythmic breathing, acting as moving meditation.',
  },
  {
    name: 'for Flexibility',
    slug: 'for-flexibility',
    painPoints: 'Tight hips, stiff shoulders, and restricted range of motion from modern lifestyles.',
    benefits: 'Unlocks tight joints, dramatically increases active range of motion, and prevents future musculoskeletal issues.',
  }
];

async function seedPseo() {
  console.log('Initializing Payload...');
  const payload = await getPayload({ config: configPromise });
  
  console.log('Fetching existing courses to link...');
  const coursesRes = await payload.find({
    collection: 'coursenames',
    limit: 100,
  });
  const courseIds = coursesRes.docs.map(c => c.id);

  console.log('Seeding PseoNiches...');
  for (const niche of niches) {
    // Optionally link some random courses
    const shuffledCourses = [...courseIds].sort(() => 0.5 - Math.random());
    const relatedCourses = shuffledCourses.slice(0, 3); // Link 3 random courses

    try {
      await payload.create({
        collection: 'pseo-niches',
        data: {
          ...niche,
          relatedCourses,
        }
      });
      console.log(`Created Niche: ${niche.name}`);
    } catch (e) {
      console.log(`Failed or already exists: ${niche.name}`);
    }
  }

  console.log('Seeding PseoAudiences...');
  for (const audience of audiences) {
    try {
      await payload.create({
        collection: 'pseo-audiences',
        data: audience,
      });
      console.log(`Created Audience: ${audience.name}`);
    } catch (e) {
      console.log(`Failed or already exists: ${audience.name}`);
    }
  }

  console.log('pSEO Seeding complete!');
  process.exit(0);
}

seedPseo();
