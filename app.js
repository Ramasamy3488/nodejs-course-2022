const http = require("http");
const fs = require("fs");

const func1 = () => console.log("func1");
const func2 = () => console.log("func2");
const func3 = () => {
  console.log("func3");

  new Promise((resolve, reject) => {
    resolve("I am a promise");
  }).then((res) => console.log(res));

  setTimeout(func1, 0);
  func2();
}; // <---
func3();

// func3
// I am a promise
// func2
// func1

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile("page/home.html", "utf8", (err, data) => {
      if (err) throw err;
      res.write(data);
      res.end();
    });
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile("temp/test.html", "utf8", (err, data) => {
      if (err) throw err;
      res.write(data);
      res.end();
    });
  } else if (req.url === "/create-file") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const data = "<h1>This is test file</h1>";
    for (let i = 0; i < 100000; i++) {
      fs.appendFile("temp/test.html", data, (err) => {
        if (err) throw err;
      });
    }

    res.write("file is created");
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    fs.readFile("page/404.html", "utf8", (err, data) => {
      if (err) throw err;
      res.write(data);
      res.end();
    });
  }
});

console.log(`server is running at http://localhost:${PORT}`);
server.listen(PORT);

// settimeout
