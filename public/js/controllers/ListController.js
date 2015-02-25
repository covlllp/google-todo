app.controller('ListController', function($scope, gapiFactory, globalFactory) {
	$scope.events = [];

	// fetch task events
	$scope.$watch('global.calFound', function(newValue) {
		if (!newValue) return;

		gapiFactory.gapiEvt.getEventList(globalFactory.calId)
		.then(function(events) {
			$scope.events = events;
		});
	});
});