const http = require('http');
const https = require('https');
const { URL } = require('url');

class TitleFetcher {
  static fetch(siteUrl, callback) {
    let formattedUrl = siteUrl;
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = 'http://' + formattedUrl;
    }

    let client;
    try {
      const urlObj = new URL(formattedUrl);
      client = urlObj.protocol === 'https:' ? https : http;
    } catch (err) {
      return callback(null, { url: siteUrl, title: 'NO RESPONSE' });
    }

    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' // mimic a real browser
      }
    };

    client.get(formattedUrl, options, (res) => {
      let body = '';

      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return TitleFetcher.fetch(res.headers.location, callback);
      }

      res.on('data', chunk => {
        body += chunk.toString();
      });

      res.on('end', () => {
        const match = body.match(/<title[^>]*>([^<]*)<\/title>/i);
        const title = match ? match[1].trim() : 'NO RESPONSE';
        callback(null, { url: siteUrl, title });
      });
    }).on('error', () => {
      callback(null, { url: siteUrl, title: 'NO RESPONSE' });
    });
  }
}

module.exports = TitleFetcher;
