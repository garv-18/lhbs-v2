import http from 'http';

http.get('http://localhost:3000/courses', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const matches = data.match(/<img[^>]+src="([^">]+)"/g);
    if (matches) {
      matches.forEach(m => console.log(m));
    } else {
      console.log('No img tags found');
    }
  });
}).on('error', err => console.log(err));
