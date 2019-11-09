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

const rugby_text = [
"rugby", "top14", "top 14"
];
const football_text = [
"football", "foot",  "ligue1", "ligue 1"
];
let filters ='';
filters = rugby_text.join(',');
filters+= ','
filters += football_text.join(',')
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
      let isRugby = false
      console.log(event.created_at);
      (rugby_text).forEach(element => {
        if(event.text.includes(element)) {
          isRugby = true
        }
      });

      let isFootball = false
      (rugby_text).forEach(element => {
        if(event.text.includes(element)) {
          isFootball = true
        }
      });
      if(isRugby) {
        connection.query('insert into tweets (lieu, date, personne) values("'+ event.place.name + '","' + new Date(event.created_at).toISOString().slice(0, 19).replace('T', ' ') + '", "rugby")', function(err, rows, fields) {
          if (err) throw err;
          console.log('inserted')
        });
      }
      if(isFootball) {
        connection.query('insert into tweets (lieu, date, personne) values("'+ event.place.name + '","' + new Date(event.created_at).toISOString().slice(0, 19).replace('T', ' ') + '", "football")', function(err, rows, fields) {
          if (err) throw err;
          console.log('inserted')
        });
      }
    }
  });
  console.log(`Example app listening on port 3000!`);
});
