'use strict';

/**
 * @ngdoc function
 * @name kwamApp.directive:getRecentPostsFactory
 * @description
 * # getRecentPostsFactory
 * Factory for recent post on topics
 */
angular.module('kwamApp')
  .factory('getRecentPostsFactory', function($http){
    //console.log($http);
    var service = {};
    console.log('hey');
  var _url = 'http://dev.kwam-back.com:9001/web/app.php/api/get/recent-posts';
  

  service.getRecent = function (){
    //console.log($http);
    var responsePromise = $http.get(_url);
    return responsePromise;
  };
    
  return service;
});