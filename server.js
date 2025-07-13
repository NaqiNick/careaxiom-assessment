const http = require('http');
const { parse } = require('url');
const handleTitleRequest = require('./routes/titleRoute');

const server = http.createServer((req, res) => {
  const path = parse(req.url).pathname;
  const normalizedPath = path.replace(/\/+$/, '');
  if (normalizedPath === '/I/want/title') {
    handleTitleRequest(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
