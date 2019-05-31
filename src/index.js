import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  const object = {};
  object.first = 'Hello World!';
  object.second = process.env.MY_SECRET;
  res.send(object);
});

app.listen(process.env.port, () =>
  console.log(`Example app listening on port 3000!`),
);