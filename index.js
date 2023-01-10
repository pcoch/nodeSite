const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
  const query = url.parse(req.url);
  console.log("this is query", query);
  let fileName = `.${query.pathname}`;
  console.log("this is filename", fileName);

  switch (fileName) {
    case "./":
      fileName = "./index.html";
      break;
    case "./about":
      fileName = "./about.html";
      break;
    case "./contact-me":
      fileName = "./contact-me.html";
      break;
    case "./404":
      fileName = "./404.html";
      break;
    default:
      fileName = "./404.html";
  }

  fs.readFile(fileName, (err, data) => {
    console.log("this is the new filename", fileName);
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      return res.end("404 Not Found");
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
});

server.listen(8000);
