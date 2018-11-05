const express=require('express');
const app=express();
var http  = require('http');
let notifications=require('./push.js');
var mysql = require('mysql');

global.con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database :"tb_device_token"
});

con.connect(function(err) {
  if (err){ throw err};

  console.log("Connected!");
});
server = http.createServer(app);
server.listen(8040);
app.get('/push_notification', async function (req, res) {
    let final= await notifications.sendPush();
     res.send(final)
   });
app.use(express.json());
const port = process.env.PORT || 8040;
server.listen(port, () => console.log(`The port is listening.. ${port}`));