import https from 'https';

['lohan.png', 'ninjutsu.png', 'samurai.png', 'jacket.png', 'tonfa.png'].forEach(file => {
  https.get(`https://ik.imagekit.io/lhbs/${file}`, (res) => {
    console.log(`${file}: ${res.statusCode} ${res.headers['content-type']}`);
  }).on('error', (e) => {
    console.error(e);
  });
});
