'use strict';

/**
 * @ngdoc function
 * @name kwamApp.controller:EbolaCtrl
 * @description
 * # EbolaCtrl
 * Controller of the kwamApp
 */
angular.module('kwamApp')
  .controller('EbolaCtrl', function ($scope,$http,$routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.test = 'hey';
 	  $scope.movie = function(){};
 	  //var  movie = function(){};
 	  var title = $routeParams.title.replace('+','%20');
 	  
    var url = 'http://www.omdbapi.com/?t=' + title;
	  var responsePromise = $http.get( url
             
            );

  	responsePromise.success(function(data) {
  		console.log($scope);
  		$scope.movie = data;
  	});
    
  });


