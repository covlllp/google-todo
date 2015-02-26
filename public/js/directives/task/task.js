app.directive('task', function(selectedTask) {
	return {
		restrict: 'E',
		templateUrl: 'js/directives/task/task.html',
		scope: {
			task: '='
		},
		link: function(scope, elem, attr) {
			scope.checked = false;
			scope.selected = false;
			scope.selectedTask = selectedTask;

			scope.check = function() {
				console.log('check func')
				scope.checked = !scope.checked;
				selectedTask.task = null;
				// scope.selected = scope.selected;
			}

			scope.$watch('selectedTask.task', function(newValue) {
				if (newValue && scope.task.id == newValue.id) scope.selected = true;
				else {
					console.log('watch function')
					scope.selected = false;
				}
				scope.$apply;
			})

			scope.select = function(task) {
				console.log('select function')
				if (!selectedTask.task || selectedTask.task.id != scope.task.id) {
					selectedTask.task = scope.task;
				} else selectedTask.task = null;
			}
		}
	};
});