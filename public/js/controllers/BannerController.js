app.controller('BannerController', function($scope, gapiFactory, globalFactory) {
	$scope.isAuthorized = false;

	$scope.auth = function() {
		$scope.showLoading = true;
		gapiFactory.gapiInit.getAuth()
		.then(function(authResult) {
			$scope.showLoading = false;
			findCalId();
		});
	}

	function findCalId() {
		gapiFactory.gapiCal.getCalendarId(globalFactory.calName)
		.then(function(id) {
			console.log('Calendar found, Cal ID is: ', id);
			globalFactory.calId = id;
			$scope.isAuthorized = true;
			globalFactory.calFound = true;
		}, function(err) {
			$scope.isAuthorized = true;
			console.log(err.body);
		});
	}

	$scope.createCal = function() {
		gapiFactory.gapiCal
		.makeCalendar(globalFactory.calName, globalFactory.calDesc)
		.then(function(id) {
			globalFactory.calId = id;
			globalFactory.calFound = true;
		});
	}

	$scope.searchForCal = function(calName) {
		globalFactory.calName = calName;
		findCalId();
	}
});