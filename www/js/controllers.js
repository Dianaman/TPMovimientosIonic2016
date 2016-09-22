angular.module('starter.controllers', ['ngCordova'])

.controller('GaleriaCtrl', function($scope, $state,$http){
	$scope.pictures = [];

	$http.get('datos.json').then(function(response){
		console.info(response);
		$scope.pictures = response.data.pictures;
	})

	$scope.verFoto = function(foto){
		console.log(foto.image);
		var foto = JSON.stringify(foto);
		$state.go('foto', {foto:foto});
	}
})

.controller('FotoCtrl', function($ionicPlatform, $scope, $stateParams, $cordovaDeviceMotion,$timeout){
	$scope.foto={};
	$scope.foto = JSON.parse($stateParams.foto);


	/*$timeout(function(){
		$scope.x = 50;
		$scope.y = 30;
		$timeout(function(){
		$scope.x = 100;
		$scope.y = 20;
		$timeout(function(){
		$scope.x = -50;
		$scope.y = 400;
	}, 2000);
	}, 2000);
	}, 2000);
	*/
	
	try{
		$ionicPlatform.ready(function() {
			 $cordovaDeviceMotion.getCurrentAcceleration().then(function(result) {
		      $scope.x = result.x;
		      $scope.y = result.y;
		      $scope.z = result.z;
		      $scope.timeStamp = result.timestamp;
		    }, function(err) {
		    	console.log(err);
		    });

			var options = { frequency: 2000 };

			var watch = $cordovaDeviceMotion.watchAcceleration(options);
		    watch.then(
		      null,
		      function(error) {
		      	console.log(error);
		      },
		      function(result) {
		      	if(result.x * 50 < 300){
			      $scope.x = result.x * 50;
		      	}
				if(result.y * 50 < 150){
			      $scope.y = (result.y * 50)-150;
			  	}
			      $scope.z = result.z * 300;
			      $scope.timeStamp = result.timestamp;
		    });
		});
	}catch(e){
		console.log(e.message);
	}
})