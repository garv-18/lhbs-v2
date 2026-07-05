import 'dotenv/config';
import { getPayload } from 'payload';
import configPromise from './payload.config.ts';

async function init() {
  console.log('Initializing Payload to push schema...');
  const payload = await getPayload({ config: configPromise });
  console.log('Schema pushed successfully!');
  process.exit(0);
}

init();
