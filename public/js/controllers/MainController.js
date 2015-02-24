app.controller('MainController', function($scope, gapiFactory) {
	$scope.isAuthorized = false;
	$scope.calList = {};
	$scope.showLoading = false;

	gapiFactory.gapiInit.getToken()
	.then(function(token) {
		$scope.isAuthorized = !!token;
		if (token) {
			console.log('hi');
			$scope.$digest;
		}
	});

	$scope.auth = function() {
		$scope.showLoading = true;
		gapiFactory.gapiInit.getAuth().then(function(authResult) {
			$scope.isAuthorized = true;
			$scope.showLoading = false;
		// }).then(function() {
		// 	return gapiFactory.gapiCal.safeMakeCalendar('Hotel BK', 'Hello!');
		// }).then(function(data) {
		// 	$scope.calList = data;
		});
	};
});