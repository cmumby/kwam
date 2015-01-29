'use strict';

/**
 * @ngdoc function
 * @name kwamApp.directive:getRecentPostsFactory
 * @description
 * # getRecentPostsFactory
 * Factory for recent post on topics
 */
angular.module('kwamApp')
  .service('getKwamFactory', function($http,$routeParams){
    //console.log($http);
    console.log(Math.random());
    
  
    //alert('hhlh;h');
  this.getKwam = function (){
    var service = {};
   if(typeof $routeParams.title !== 'undefined' ){
      var title = $routeParams.title.replace('+', ' ');
      console.log(typeof title);
      var _url = 'http://dev.kwam-back-express.com:9003/api/get/kwam/' + title; //http://dev.kwam-back.com:9001/web/app.php/api/get/kwam/' + title;
      var responsePromise = $http.get(_url);
      return responsePromise;
   } 
  };
    
  //return service;
});