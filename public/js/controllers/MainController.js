app.controller('MainController', function($scope, gapiFactory) {
	$scope.isAuthorized = false;
	$scope.calList = {};

	$scope.auth = function() {
		gapiFactory.getAuth().then(function(authResult) {
			$scope.isAuthorized = true;
		}).then(function() {
			gapiFactory.getCalendarId('Hotel BK')
			.then(function(data) {
				return gapiFactory.getCalendarById(data)
				// $scope.calList = data;
			}).then(function(response) {
				$scope.calList = response;
			});

			// gapiFactory.getCalendarList()
			// .then(function(list) {
			// 	$scope.calList = list;
			// });
		});
	};
});