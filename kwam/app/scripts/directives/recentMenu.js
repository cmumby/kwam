'use strict';

/**
 * @ngdoc function
 * @name kwamApp.directive:recentMenu
 * @description
 * # recentMenu
 * Directive for the Top Menu Navigation
 */
angular.module('kwamApp')
	.directive('recentMenu',function(){
	return{
		restrict: 'E',
		templateUrl: 'views/recent-menu.html',
		controller:['$scope', '$http', 'getRecentTopicsFactory', 
		function($scope, $http, getRecentTopicsFactory){
			var _recentData = getRecentTopicsFactory.getRecent();
    
    		_recentData.success(function(data) {
                console.log(data);
     			data.forEach(function(d,i){
     				data[i] = {
     							'title': d,
     							'url': d.replace(' ', '+')
     						};
     				console.log(i);
     			});
     			$scope.topics = data;
    		});
		}]
	};
});