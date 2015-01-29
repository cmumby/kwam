var express = require('express');
var Sequelize = require('sequelize');
var path = require('path');
var mysql = require('mysql');
var app = express();

/* var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root'
});

connection.query('USE kwam');
*/

app.set('port', 9003);
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
//app.use(express.static(path.join(__dirname, 'public')));


// You can also specify a non-default host/port
var sequelize = new Sequelize('kwam', 'root', 'root', {
  host: "localhost",
  //port: 12345
});
var Kwam = sequelize.define('Kwam', {
  topic: Sequelize.STRING(2048),
  user_id: Sequelize.INTEGER,
  reason: Sequelize.TEXT,
  main_picture: Sequelize.TEXT
},
{
  getterMethods   : {
      topic       : function()  { return this.getDataValue('topic');},
      user_id     : function()  { return this.getDataValue('user_id');},
      reason      : function()  { return this.getDataValue('reason');},
      main_picture       : function()  { return this.getDataValue('main_picture');}
  },
  setterMethods   : {
      topic       : function(v) { this.setDataValue('topic', v); },
      user_id     : function(v) { this.setDataValue('user_id', v); },
      reason      : function(v) { this.setDataValue('reason',v); },
      main_picture      : function(v) { this.setDataValue('main_picture',v); }
  },
  freezeTableName: true, 
});

app.get('/', function(req, res){
  connection.query('SELECT * FROM User', function(err, rows){
    //res.render('users', {users : rows});
    res.json(rows);
  });
});

app.get('/api/get/recent-topics', function(req, res){
  Kwam.findAll().success(function(kwam) {
    var topics = [];
    kwam.forEach(function(value){
      topics.push(value.dataValues.topic);
    });

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(topics);
  });
  
  /* connection.query('SELECT * FROM Kwams', function(err, rows){
    //res.render('users', {users : rows});
    topics = [];
    rows.forEach(function(row){
      topics.push(row.topic);
    });
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(topics);
  }); */
});

app.listen(app.get('port'));
console.log('Express server listening on port ' + app.get('port'));
