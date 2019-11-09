import "dotenv/config";
import cors from "cors";
import express from "express";
import Twitter from 'twitter';

const app = express();
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : process.env.host,
  user     : process.env.username,
  password : process.env.password,
  database : process.env.db
});

connection.connect();



app.use(cors());
const filter_text = [
"#MACRON", "#LAFRANCEENMARCHE", "#MACRON2017","MACRON",
];
let filters ='';
filters = filter_text.join(',');
console.log('hello',filters);

app.use(require('./controller/tweets'));

app.listen(process.env.port, () => {
  var twitter = new Twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_key,
    access_token_secret: process.env.access_secret
  });
  var stream = twitter.stream('statuses/filter', {track: filters});
  stream.on('data', function(event) {
    if(event.place && event.place.country_code === 'FR') {
      console.log(event.created_at);
      console.log(new Date(event.created_at).toISOString().slice(0, 19).replace('T', ' '));
      console.log('insert into tweets (lieu, date, personne) values('+ event.place.name + ',' + new Date(event.created_at).toISOString().slice(0, 19).replace('T', ' ') + ', macron)')
      connection.query('insert into tweets (lieu, date, personne) values("'+ event.place.name + '","' + new Date(event.created_at).toISOString().slice(0, 19).replace('T', ' ') + '", "macron")', function(err, rows, fields) {
        if (err) throw err;
        console.log('inserted')
      });
    }
  });
  console.log(`Example app listening on port 3000!`);
});
