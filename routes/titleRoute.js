const { parse } = require('url');
const TitleFetcher = require('../services/TitleFetcher');
const buildHtml = require('../utils/HtmlBuilder');

function handleTitleRequest(req, res) {
  const parsed = parse(req.url, true);
  const query = parsed.query;
  const addresses = Array.isArray(query.address) ? query.address : [query.address];

  let results = [];
  let done = 0;

  addresses.forEach((addr, i) => {
    TitleFetcher.fetch(addr, (err, result) => {
      results[i] = result;
      done++;
      if (done === addresses.length) {
        const html = buildHtml(results);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
      }
    });
  });
}

module.exports = handleTitleRequest;
