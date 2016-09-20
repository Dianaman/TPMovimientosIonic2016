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

.controller('FotoCtrl', function($scope, $stateParams){
	$scope.foto={};
	$scope.foto = JSON.parse($stateParams.foto);
})