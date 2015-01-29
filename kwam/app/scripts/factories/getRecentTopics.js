'use strict';

/**
 * @ngdoc function
 * @name kwamApp.directive:getRecentTopicsFactory
 * @description
 * # getRecentTopicsFactory
 * Factory for recently active Topics
 */
angular.module('kwamApp')
  .factory('getRecentTopicsFactory', function($http){
  	//console.log($http);
  	var service = {};
  	
	var _url = 'http://dev.kwam-back-express.com:9003/api/get/recent-topics';//'http://dev.kwam-back.com:9001/web/app.php/api/get/recent-topics';
	

	service.getRecent = function (){
		//console.log($http);
		var responsePromise = $http.get(_url);
		return responsePromise;
	};
    
	return service;
});