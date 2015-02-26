app.controller('ListController', function($scope, gapiFactory, globalFactory, taskFactory) {
	$scope.events = [];
	$scope.tasks = taskFactory;

	// fetch task events
	$scope.$watch('global.calFound', function(newValue) {
		if (!newValue) return;

		gapiFactory.gapiEvt.getEventList(globalFactory.calId)
		.then(function(events) {
			$scope.tasks.tasks = events;
			setTimeout(function() {
				$.material.init();
			}, 0);
		});
	});
});