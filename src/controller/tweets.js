import "dotenv/config";
import cors from "cors";
import Twitter from 'twitter';
var router = require('express').Router();


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : process.env.host,
  user     : process.env.username,
  password : process.env.password,
  database : process.env.db
});

connection.connect();


router.get("/", (req, res) => {
    let object = {};
    connection.query('SELECT * from tweets', function(err, rows, fields) {
      if (err) throw err;
      object = {rows};
      console.log('The solution is: ', rows);
      res.send(object);
    });
  });
  module.exports = router;