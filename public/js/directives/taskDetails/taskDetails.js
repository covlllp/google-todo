app.directive('taskDetails', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/directives/taskDetails/taskDetails.html',
		scope: {
			task: '='
		}
	}
})