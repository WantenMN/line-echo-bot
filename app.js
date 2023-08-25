import express from "express";
import axios from "axios";
import { httpAgent, httpsAgent } from "./utils.js";

const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/line-webhook", handleLineWebhook);

function handleLineWebhook(req, res) {
  // Return a response to acknowledge receipt of the event
  res.sendStatus(200);

  req.body.events.map(handleEvent);
}

function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    // Ignore non-text-message events
    return;
  }

  const text = event.message.text;
  // Use reply API
  return replyMessage(event.replyToken, text);
}

function replyMessage(replyToken, text) {
  const LINE_CHANNEL_ACCESS_TOKEN = ""; // User needs to configure this

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
  };

  const url = "https://api.line.me/v2/bot/message/reply";
  const data = {
    replyToken,
    messages: [{ type: "text", text }],
  };

  return axios.post(url, data, {
    headers,
    httpAgent,
    httpsAgent,
    proxy: false,
  });
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
