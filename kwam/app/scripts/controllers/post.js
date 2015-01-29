'use strict';

/**
 * @ngdoc function
 * @name kwamApp.controller:KwamCtrl
 * @description
 * # PostCtrl
 * Controller of the kwamApp
 */
angular.module('kwamApp')
  .controller('PostCtrl', function ($scope, $routeParams, $http) {
   
   $scope.master = {};

      $scope.writePost = function(newPost){
        console.log({user:300, message:newPost.message,topic: $routeParams.title.replace('+', ' ')})
        $http({
        method: 'POST',
        url: 'http://dev.kwam-back.com:9001/web/app_dev.php/api/post/new',
        data: $.param({user:300, message:newPost.message,topic: $routeParams.title.replace('+', ' ')}),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
    }
});