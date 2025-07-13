function buildHtml(results) {
  const listItems = results.map(r =>
    `<li>${r.url} - "${r.title}"</li>`
  ).join('');

  return `
    <html>
      <head></head>
      <body>
        <h1>Following are the titles of given websites:</h1>
        <ul>${listItems}</ul>
      </body>
    </html>`;
}

module.exports = buildHtml;
