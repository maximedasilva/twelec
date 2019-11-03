import "dotenv/config";
import cors from "cors";
import express from "express";
import Twitter from 'twitter';
import fs from 'fs';

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
const filter_text = ["#LR","#LESREPUBLICAINS","#FILLON","#FF2017","#FILLON2017","FILLON",
"#DEBOUTLAFRANCE","#DLF","#DUPONTAIGNAN","#DA2017","DUPONTAIGNAN",
"#UPR", "#ASSELINEAU2017", "#FA2017","ASSELINEAU",
"#FN", "#AUNOMDUPEUPLE", "#MARINE2017","#LEPEN","LE PEN",
"#JC2017", "#CHEMINADE2017","CHEMINADE",
"#LASSALLE","LASSALLE",
"#MACRON", "#LAFRANCEENMARCHE", "#MACRON2017","MACRON",
"#HAMON", "#HAMON", "#PS", "#PARTISOCIALISTE","HAMON",
"#JLM2017", "#AVENIRENCOMMUNN", "#MELENCHON","MELENCHON","MÉLENCHON",
"#LUTTEOUVRIERE", "#ARTHAUD","ARTHAUD",
"#POUTOU", "#NPA","POUTOU"
];
let filters ='';
filters = filter_text.join(',');
console.log('hello',filters);
app.get("/", (req, res) => {
  let object = {};
  connection.query('SELECT * from Instrument', function(err, rows, fields) {
    if (err) throw err;
    object = {rows};
    console.log('The solution is: ', rows);
    res.send(object);
  });
});


app.listen(process.env.port, () => {
  var twitter = new Twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_key,
    access_token_secret: process.env.access_secret
  });
  var stream = twitter.stream('statuses/filter', {track: "rugby, world cup, rwc, RWC, #RWC2019, #NZLvIRE, NZLvIRE"});
  stream.on('data', function(event) {
    if(event.place && event.place.country_code === 'FR') {
      console.log(event);
    }
  });
  console.log(`Example app listening on port 3000!`);
});
