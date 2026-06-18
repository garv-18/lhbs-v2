import 'dotenv/config';
import ImageKit from '@imagekit/nodejs';

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || '',
});

async function test() {
  try {
    const details = await imagekit.getFileDetails('6a33fc8a5c7cd75eb89521e4');
    console.log(details);
  } catch (err) {
    console.error(err);
  }
}
test();
