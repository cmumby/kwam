var express = require('express');
var router = express.Router();

router.get('/api/get/recent-topics', function(req, res){
  Kwam.findAll().success(function(kwam) {
    var topics = [];
    kwam.forEach(function(value){
      topics.push(value.dataValues.topic);
    });

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(topics);
  });
  
});

module.exports = router;