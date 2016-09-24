angular.module('starter.controllers', ['ngCordova'])
.run(function($rootScope){
  $rootScope.usuario = {};
  $rootScope.usuario.name;
  $rootScope.usuario.trivia = [];
})

.controller('LoginCtrl', function($scope, $state, $rootScope){
$scope.datos = {
  'username': ''
}

  $scope.entrar = function(){
    $rootScope.usuario.name = $scope.datos.username;
    $state.go('audio');
  }
})
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

.controller('AudioCtrl', function($ionicPlatform, $scope, $state, $cordovaDeviceMotion,$timeout, $cordovaNativeAudio){
	try{
		$ionicPlatform.ready(function() {
	      $cordovaNativeAudio
	      .preloadSimple('abajo', 'sounds/abajo.m4a')
	      .then(function (msg) {
	        console.log(msg);
	      }, function (error) {
	        alert(error);
	      });

	      $cordovaNativeAudio
	      .preloadSimple('izquierda', 'sounds/izquierda.m4a')
	      .then(function (msg) {
	        console.log(msg);
	      }, function (error) {
	        alert(error);
	      });

	      $cordovaNativeAudio
	      .preloadSimple('derecha', 'sounds/derecha.m4a')
	      .then(function (msg) {
	        console.log(msg);
	      }, function (error) {
	        alert(error);
	      });

	      $cordovaNativeAudio
	      .preloadSimple('atras', 'sounds/atras.m4a')
	      .then(function (msg) {
	        console.log(msg);
	      }, function (error) {
	        alert(error);
	      });

	      $cordovaNativeAudio
	      .preloadSimple('adelante', 'sounds/adelante.m4a')
	      .then(function (msg) {
	        console.log(msg);
	      }, function (error) {
	        alert(error);
	      });


			$scope.grabarIzquierda = function(){
				alert('Grabando izquierda');	
			}

			$scope.grabarDerecha = function(){
				alert('Grabando derecha');
			}

			$scope.grabarAdelante = function(){
				alert('Grabando adelante');
			}

			$scope.grabarAtras = function(){
				alert('Grabando atras');
			}

			$scope.grabarAbajo = function(){
				alert('Grabando abajo');
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
		      		$cordovaNativeAudio.play('izquierda');
		      		orientacion = 'izquierda';
		      	}
		      	if(-9 > result.x &&  -5 < result.y < 5 && -5 < result.z < 5 &&
		      		orientacion != 'derecha'){
		      		$cordovaNativeAudio.play('derecha');
		      		orientacion = 'derecha';
		      	}
		      	if(9 < result.y && -5 < result.x < 5 && -5 < result.z < 5 &&
		      		orientacion != 'adelante'){
		      		$cordovaNativeAudio.play('adelante');
		      		orientacion = 'adelante';
		      	}
		      	if(-9 > result.y &&  -5 < result.x < 5 && -5 < result.z < 5 &&
		      		orientacion != 'atras'){
		      		$cordovaNativeAudio.play('atras');
		      		orientacion = 'atras';
		      	}
		      	if(-9 > result.z &&  -5 < result.x < 5 && -5 < result.y < 5 &&
		      		orientacion != 'abajo'){
		      		$cordovaNativeAudio.play('abajo');
		      		orientacion = 'abajo';
		      	}
		    });
		});
	}catch(e){
		console.log(e.message);
	}

	$scope.toAutor = function(){
		$state.go('autor');
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


.controller('AutorCtrl', function($scope, $window, $state) {

  $scope.toAudio = function(){
  	$state.go('audio');
  }
  $scope.sendMail = function(emailId, subject, message){
    $window.open("mailto:" + emailId + "?subject=" + subject+"&body="+message,"_self");
  }
});