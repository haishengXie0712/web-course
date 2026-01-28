import axios from "axios";
import readline from "readline";
console.log("开始请求");

axios
  .get("https://api-demo.exante.eu/md/3.0/feed/trades/SO.COMEX.V2024.P26_5", {
    headers: {
      Accept: "application/x-json-stream",
      Authorization:
        "Basic Y2Q4NjZlZWYtZTFmMC00YWE1LTlhMDQtMjExYjE3MGRkNjQ1OndycWdRbkZvYTZIMlhObGk2VzIy",
    },
    responseType: "stream",
    timeout: 1000 * 20,
  })
  .then(async (response) => {
    const stream = response.data;

    const rl = readline.createInterface({
      input: stream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      if (line.trim()) {
        try {
          const jsonObj = JSON.parse(line);
          console.log("Parsed JSON object:", jsonObj);
        } catch (error) {
          console.error("Failed to parse JSON:", error);
        }
      }
    }
  })
  .catch((err) => {
    console.log(err);
  });

