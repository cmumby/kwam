'use strict';

/**
 * @ngdoc function
 * @name kwamApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the kwamApp
 */
angular.module('kwamApp')
  .controller('MainCtrl', function ($scope,getRecentPostsFactory) {
    
    var _recentData = getRecentPostsFactory.getRecent();
    
    _recentData.success(function(data) { 
      
      var count = 0;
        
      //Sends the images through an image resizer, creates topic urls
      data.forEach(function(d){
        var picturePath = d.message.picture.replace('http://','');
        var pictureArray = picturePath.split('/');
        var pictureArrayLength = pictureArray.length;
        var filename = pictureArray[(pictureArrayLength -1)];
        var pictureSize = (count === 0)?'700/0':'100/100';
        
        pictureArray[(pictureArrayLength -1)] = pictureSize;
        pictureArray[pictureArrayLength] = filename;
        d.message.picture = 'http://dev.kwam-size.com:9001/' + pictureArray.join('/');
        d.message.topicLink = d.message.topic.replace(' ', '+');
        
        if(count === 0){
          $scope.background = 'url('+ d.message.picture +') no-repeat';
          
        }
        count++;
      });
        		
      //Seperate the first Index from the rest
      $scope.first = data[0];
       
      //send the rest as posts
      data.splice(0, 1);
      

      $scope.posts = data;

      console.log($scope.first);
      console.log($scope.posts);
    });
});