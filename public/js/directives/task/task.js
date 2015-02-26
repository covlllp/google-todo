app.directive('task', function(taskFactory) {
	return {
		restrict: 'E',
		templateUrl: 'js/directives/task/task.html',
		scope: {
			task: '='
		},
		link: function(scope, elem, attr) {
			scope.checked = false;
			scope.selected = false;
			scope.tasks = taskFactory;

			scope.check = function() {
				console.log('check func')
				scope.checked = !scope.checked;
				scope.tasks.selectedTask = null;
				// scope.selected = scope.selected;
			}

			scope.$watch('tasks.selectedTask', function(newValue) {
				if (newValue && scope.task.id == newValue.id) scope.selected = true;
				else {
					scope.selected = false;
				}
			});

			scope.select = function(task) {
				if (!scope.tasks.selectedTask
					|| scope.tasks.selectedTask.id != scope.task.id) {
					scope.tasks.selectedTask = scope.task;
				} else scope.tasks.selectedTask = null;
			}
		}
	};
});