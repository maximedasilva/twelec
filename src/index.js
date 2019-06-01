import "dotenv/config";
import cors from "cors";
import express from "express";
import Twitter from 'twitter'

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  const object = {};
  object.first = "Hello World!";
  res.send(object);
});

app.listen(process.env.port, () => {
  var twitter = new Twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_key,
    access_token_secret: process.env.access_secret
  });
  var stream = twitter.stream('statuses/filter', {track: 'javascript'});
  stream.on('data', function(event) {
    console.log(event && event.text);
  });
  console.log(`Example app listening on port 3000!`);
});
