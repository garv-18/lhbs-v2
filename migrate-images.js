import 'dotenv/config';
import { getPayload } from 'payload';
import configPromise from './payload.config';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

async function downloadFile(url, tempFilePath) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(tempFilePath, buffer);
  return {
    buffer,
    mimetype: response.headers.get('content-type') || 'image/png',
    size: buffer.length
  };
}

async function migrateImages() {
  const payload = await getPayload({ config: configPromise });

  console.log('Fetching courses...');
  const allCoursesRes = await payload.find({
    collection: 'coursenames',
    limit: 100,
  });

  const tempDir = path.join(process.cwd(), 'temp_images');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  let updatedCount = 0;

  for (const course of allCoursesRes.docs) {
    if (typeof course.image === 'string' && course.image.startsWith('http')) {
      console.log(`Downloading image for ${course.title}... (${course.image})`);
      
      try {
        const urlObj = new URL(course.image);
        let filename = path.basename(urlObj.pathname);
        if (!filename || filename === '') {
          filename = crypto.randomBytes(4).toString('hex') + '.png';
        }
        // Decode URI component in case filename has %20
        filename = decodeURIComponent(filename).replace(/[^a-zA-Z0-9.-]/g, '-');
        
        const tempFilePath = path.join(tempDir, filename);
        
        const { buffer, mimetype, size } = await downloadFile(course.image, tempFilePath);

        console.log(`Uploading ${filename} to Payload Media...`);
        const mediaDoc = await payload.create({
          collection: 'media',
          data: {
            alt: `${course.title} thumbnail`,
          },
          file: {
            data: buffer,
            mimetype: mimetype,
            name: filename,
            size: size,
          }
        });

        console.log(`Updating course ${course.title} with media ID: ${mediaDoc.id}`);
        await payload.update({
          collection: 'coursenames',
          id: course.id,
          data: {
            image: mediaDoc.id,
          }
        });

        updatedCount++;
        // Delete temp file
        fs.unlinkSync(tempFilePath);
      } catch (err) {
        console.error(`Failed to process image for ${course.title}:`, err.message);
      }
    } else {
        console.log(`Skipping ${course.title}, image is already a relation or not a string URL. Image: ${typeof course.image === 'object' ? course.image?.id : course.image}`);
    }
  }

  console.log(`Done! Migrated ${updatedCount} images.`);
  
  if (fs.existsSync(tempDir)) {
    fs.rmdirSync(tempDir);
  }
  process.exit(0);
}

migrateImages().catch(err => {
  console.error(err);
  process.exit(1);
});
