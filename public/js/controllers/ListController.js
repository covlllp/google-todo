app.controller('ListController', function($scope, gapiFactory, globalFactory, selectedTask) {
	$scope.events = [];
	$scope.selectedTask = selectedTask;

	// fetch task events
	$scope.$watch('global.calFound', function(newValue) {
		if (!newValue) return;

		gapiFactory.gapiEvt.getEventList(globalFactory.calId)
		.then(function(events) {
			$scope.events = events;
		});
	});
});