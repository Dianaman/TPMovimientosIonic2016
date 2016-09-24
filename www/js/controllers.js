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

.controller('AudioCtrl', function($ionicPlatform, MediaSrv, $scope, $stateParams, $cordovaDeviceMotion,$timeout, $cordovaMedia){
	try{
		$ionicPlatform.ready(function() {
			var izq = "/audio/izquierda.mp3";
			var der = "/audio/derecha.mp3";
			var atr = "/audio/atras.mp3";
			var ade = "/audio/adelante.mp3";
			var aba = "/audio/abajo.mp3";
			var pr = "/audio/prueba.mp3";

			var mediaIzq = $cordovaMedia.newMedia(izq);
			var mediaDer = $cordovaMedia.newMedia(der);
			var mediaAtr = $cordovaMedia.newMedia(atr);
			var mediaAde = $cordovaMedia.newMedia(ade);
			var mediaAba = $cordovaMedia.newMedia(aba);
			var prueba = $cordovaMedia.newMedia(pr);
			$scope.grabarIzquierda = function(){
				console.log('Grabando izquierda');
				mediaIzq.startRecord();
				$timeout(function(){
					mediaIzq.stopRecord();
				}, 1500);
			}

			$scope.grabarDerecha = function(){
				console.log('Grabando derecha');
				mediaDer.startRecord();
				$timeout(function(){
					mediaDer.stopRecord();
				}, 1500);
			}

			$scope.grabarAdelante = function(){
				console.log('Grabando adelante');
				mediaAde.startRecord();
				$timeout(function(){
					mediaAde.stopRecord();
				}, 1500);
			}

			$scope.grabarAtras = function(){
				console.log('Grabando atras');
				mediaAtr.startRecord();
				$timeout(function(){
					mediaAtr.stopRecord();
				}, 1500);
			}

			$scope.grabarAbajo = function(){
				console.log('Grabando abajo');
				mediaAba.startRecord();
				$timeout(function(){
					mediaAba.stopRecord();
				}, 1500);
			}

			 $cordovaDeviceMotion.getCurrentAcceleration().then(function(result) {
		      $scope.x = result.x;
		      $scope.y = result.y;
		      $scope.z = result.z;
		      $scope.timeStamp = result.timestamp;
		    }, function(err) {
		    	console.log(err);
		    });

			var orientacion = '';

			var options = { frequency: 4000 };

			var watch = $cordovaDeviceMotion.watchAcceleration(options);
		    watch.then(
		      null,
		      function(error) {
		      	console.log(error);
		      },
		      function(result) {
		      	if(9 < result.x && -5 < result.y < 5 && -5 < result.z < 5 &&
		      		orientacion != 'izquierda'){
		      		alert('izquierda');
		      		MediaSrv.loadMedia('audio/prueba.mp3').then(function(media){
					  media.play();
					});
		      		orientacion = 'izquierda';
		      	}
		      	if(-9 > result.x &&  -5 < result.y < 5 && -5 < result.z < 5 &&
		      		orientacion != 'derecha'){
		      		alert('derecha');
		      		prueba.play();
		      		orientacion = 'derecha';
		      	}
		      	if(9 < result.y && -5 < result.x < 5 && -5 < result.z < 5 &&
		      		orientacion != 'adelante'){
		      		alert('adelante');
		      		mediaAde.play();
		      		orientacion = 'adelante';
		      	}
		      	if(-9 > result.y &&  -5 < result.x < 5 && -5 < result.z < 5 &&
		      		orientacion != 'atras'){
		      		alert('atras');
		      		mediaAtr.play();
		      		orientacion = 'atras';
		      	}
		      	if(-9 > result.z &&  -5 < result.x < 5 && -5 < result.y < 5 &&
		      		orientacion != 'abajo'){
		      		alert('abajo');
		      		mediaAtr.play();
		      		orientacion = 'abajo';
		      	}
		    });
		});
	}catch(e){
		console.log(e.message);
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


.controller('AutorCtrl', function($scope, $window) {
  $scope.sendMail = function(emailId, subject, message){
    $window.open("mailto:" + emailId + "?subject=" + subject+"&body="+message,"_self");
  }
});