app.controller('MainController', function($scope, gapiFactory) {
	$scope.isAuthorized = false;
	$scope.calList = {};

	$scope.auth = function() {
		gapiFactory.getAuth().then(function(authResult) {
			$scope.isAuthorized = true;
		}).then(function() {
			return gapiFactory.getCalendarId('Hotel BK');
		}).then(function(data) {
			return gapiFactory.getEventList(data);
		}).then(function(response) {
			var list = response.map(function(item) {
				return item.summary;
			});
			$scope.calList = list;
		}).catch(function(err) {
			$scope.calList = err.body;
		});
	};
});