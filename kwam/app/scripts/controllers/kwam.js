'use strict';

/**
 * @ngdoc function
 * @name kwamApp.controller:KwamCtrl
 * @description
 * # KwamCtrl
 * Controller of the kwamApp
 */
angular.module('kwamApp')
  .controller('KwamCtrl', function ($scope,getKwamFactory,message) {
    
    //page load toics data, main post and comments
    var _data = message = getKwamFactory.getKwam();
    
    //emulates login data for now
    $scope.currentUser = {name: 'JornadaPro', uid: 300, 
    'avatar': 'https://scontent-b-ord.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/1928812_504570020934_4936_n.jpg?oh=1b205e5990776bd9a2f2ab018c64330d&oe=550C2F73'}
    _data.success(function(data) { 
        
      //Sends the main image through an image resizer
      $scope.background = 'url('+ resize(data.picture,700,320) +') no-repeat';

      //Also, run any post of type 'picture' through the resizer
      data.messages.forEach(function(d,i){
        if(d.type == 'picture'){
          d.message = resize(d.message, 620, 300);
        }
      });

        		
        $scope.kwam = data;
        //console.log($scope.kwam);
    });

    //formats the image path to work image resizer 
    //(/orignilalDomain.com/widht/height/image.(jpg|png|gif))
    function resize(picture, width, height){
      var picturePath = picture.replace('http://','');
      var pictureArray = picturePath.split('/');
      var pictureArrayLength = pictureArray.length;
      var filename = pictureArray[(pictureArrayLength -1)];
      var pictureSize =  width + '/' + height;
        
        pictureArray[(pictureArrayLength -1)] = pictureSize;
        pictureArray[pictureArrayLength] = filename;
        return picture = 'http://dev.kwam-size.com:9001/' + pictureArray.join('/');
    }
});