app.directive('task', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/directives/task/task.html',
		scope: {
			task: '='
		},
		link: function(scope, elem, attr) {
			scope.checked = false;
			scope.selected = false;

			scope.check = function() {
				scope.checked = !scope.checked;
				scope.selected = !scope.selected;
				
			}

			scope.select = function() {
				scope.selected = !scope.selected;
			}
		}
	};
});