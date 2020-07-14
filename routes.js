const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.write(`<html>
                      <header>
                          <title>Enter Message</title>
                      </header             
                      <body>
                         <form action="/message" method="POST">
                              <input type='text' name="message">
                              <button type='submit'>Send</button>
                         </form>
                      </body>
                  </html>`);
    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
      console.log(chunk);
    });
    return req.on('end', () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split('=')[1];
      fs.writeFile('message.txt', message, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }

  res.setHeader('Content-type', 'text/html');
  res.write(`<html>
                      <header>
                          <title>Node based web application</title>
                      </header             
                      <body>
                          <h1>This page is renderd from JS file backed by Node JS</h1>
                      </body>
                  </html>`);
  res.end();
};

module.exports = {
  handler: requestHandler,
  someText: 'Some HardCoded Text',
};
