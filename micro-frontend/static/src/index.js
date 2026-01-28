var express = require("express");
var fs = require("fs");
const path = require("path");
var app = express();
function resolve(_path) {
  return path.join(__dirname, _path);
}
app.get("/", function (req, res) {
  res.setHeader("content-type", "text/html");
  res.send(fs.readFileSync(resolve("./static/1.html"), "utf-8"));
});
app.get("/index.js", function (req, res) {
  setTimeout(() => {
    res.send(fs.readFileSync(resolve("./static/index.js"), "utf-8"));
  }, 2000);
});

app.listen(3000);