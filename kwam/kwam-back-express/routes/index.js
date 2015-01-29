var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/api/get/recent-topics', function(req, res){
  models.Kwam.findAll().success(function(kwam) {
    var topics = [];
    kwam.forEach(function(value){
      topics.push(value.dataValues.topic);
    });

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(topics);
  });
  
});

router.get('/api/get/users', function(req, res){
  models.User.findAll().success(function(user) {
    var users = [];
    user.forEach(function(value){
      users.push(value.dataValues);
    });

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(users);
  });
  
});

router.get('/api/get/kwam/:topic', function(req, res) {
	//Find Matching Topic
	models.Kwam.findAll({
		where: {
			topic:req.params.topic //"Freemium Games"
		}
	}).success(function(kwam) {
	    var topics = {};
	    kwam.forEach(function(value){

	      //Match the User with the Topic
	      models.User.find(value.dataValues.id).success(function(uValue){
	      	//console.log(uValue.dataValues.username);
	      	topics.topic = value.dataValues.topic;
	      	topics.reson = value.dataValues.reason;
	     	topics.picture = value.dataValues.main_picture;
	      	topics.moderator = uValue.dataValues.username;
	      	topics.moderator_avatar = uValue.dataValues.avatar;
	      	topics.messages =[];
	      	models.Post.findAll({
	      		where:{
	      			kwam_id: value.dataValues.id
	      		},
	      		order:'`id` DESC'
	      	}).success(function(pValue){
	      		var pCount = pValue.length;
	      		var index = 0;
	      		// matach User data for each Post
	      		pValue.forEach(function(post){
	      			var message = {};
	      			models.User.find(post.dataValues.user_id).success(function(upValue){
	      				message.user = upValue.dataValues.username;
	      				message.avatar = upValue.dataValues.avatar;
	      				message.type = post.dataValues.message_type;
	      				message.message = post.dataValues.message;
	      				message.topic_id = post.dataValues.kwam_id;
	      				topics.messages.push(message);
	      				//Perparing the Response
	      				console.log("Count: " + pCount + "index: " + index);
	      				console.log(post.dataValues);
	      				index++;
	      				if(index == (pCount)){
	      					//topics.messages = topics.messages.reverse();
	      					
	      					//Handle the Response
	      					res.setHeader('Access-Control-Allow-Origin', '*');
			      			res.json(topics);
			      			index = 0;
	      				}
			      		
	      			});
		    			
	      		});

	      	});
	      	
	      });
	      
	    });

	    //res.setHeader('Access-Control-Allow-Origin', '*');
	    //res.json(topics);
	});

  //res.render('index', { title: 'Express' });
});

module.exports = router;
