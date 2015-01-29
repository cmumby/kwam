'use strict';

/**
 * @ngdoc overview
 * @name kwamApp
 * @description
 * # kwamApp
 *
 * Main module of the application.
 */
angular
  .module('kwamApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/kwam/:title', {
        templateUrl: 'views/kwam.html',
        controller: 'KwamCtrl',
        resolve: {
            message: function($route, getKwamFactory){
                return getKwamFactory.getKwam($route.current.params.title);
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });