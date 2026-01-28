import fs from "fs";
import https from "https";
import express from "express";

import { resolve } from "./utils";

const app = express();

app.use('/static', express.static(resolve('public')))

app.get("/", (req, res) => {
  res.send(fs.readFileSync(resolve("../cert/localhost.pem"), "utf-8"));
});

const options = {
  key: fs.readFileSync(resolve("../cert/localhost-key.pem"), "utf-8"),
  cert: fs.readFileSync(resolve("../cert/localhost.pem"), "utf-8"),
};
https.createServer(options, app).listen(8888);

