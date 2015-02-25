app.controller('MainController', function($scope, gapiFactory, globalFactory) {
	$scope.global = globalFactory;

	$scope.showLoading = false;
});