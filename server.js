const http = require('http');
const https = require('https');
const url = require('url');

function fetchTitle(siteUrl, callback) {
  let formattedUrl = siteUrl;
  if (!/^https?:\/\//i.test(siteUrl)) {
    formattedUrl = 'http://' + siteUrl;
  }

  const lib = formattedUrl.startsWith('https') ? https : http;

  lib.get(formattedUrl, (res) => {
    let body = '';

    res.on('data', (chunk) => {
      body += chunk.toString();
    });

    res.on('end', () => {
      const match = body.match(/<title>(.*?)<\/title>/i);
      const title = match ? match[1] : 'NO RESPONSE';
      callback(null, { siteUrl, title });
    });
  }).on('error', () => {
    callback(null, { siteUrl, title: 'NO RESPONSE' });
  });
}

function buildHtml(titles) {
  const items = titles.map(({ siteUrl, title }) =>
    `<li>${siteUrl} - "${title}"</li>`
  ).join('\n');

  return `
    <html>
      <head></head>
      <body>
        <h1>Following are the titles of given websites:</h1>
        <ul>${items}</ul>
      </body>
    </html>
  `;
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const query = parsedUrl.query;

  if (path === '/I/want/title' && query.address) {
    const addresses = Array.isArray(query.address)
      ? query.address
      : [query.address];

    let results = [];
    let completed = 0;

    addresses.forEach((addr, index) => {
      fetchTitle(addr, (err, result) => {
        results[index] = result;
        completed++;
        if (completed === addresses.length) {
          const html = buildHtml(results);
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(html);
        }
      });
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
