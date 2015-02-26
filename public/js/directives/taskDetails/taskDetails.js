app.directive('taskDetails', function(gapiFactory, globalFactory) {
	return {
		restrict: 'E',
		templateUrl: 'js/directives/taskDetails/taskDetails.html',
		scope: {
			task: '='
		},
		link: function(scope, elem, attr) {
			scope.isLoading = false;
			scope.updateMessage = "";
			scope.showUpdate = false
			scope.origTask = {};

			function updateOrigTaskOn(newTask) {
				scope.origTask = {
					summary: newTask.summary,
					start: {
						date: newTask.start.date
					},
					location: newTask.location,
					description: newTask.description,
				}
			}

			scope.$watch('task', function(newValue, oldValue) {
				// work here, add saves on new selects!
				console.log(oldValue);
				console.log(scope.taskDetailForm.$dirty);

				if (newValue) {
					updateOrigTaskOn(scope.task);
				}
			});

			scope.undoChanges = function() {
				Object.keys(scope.origTask).forEach(function(key) {
					scope.task[key] = scope.origTask[key];
				});
				scope.taskDetailForm.$setPristine();
			}

			scope.updateTask = function(task) {
				scope.isLoading = true;
				gapiFactory.gapiEvt
				.updateEvent(task.organizer.email, task.id, task)
				.then(function() {
					scope.isLoading = false;
					scope.taskDetailForm.$setPristine();
					scope.showUpdate = true;
					scope.updateMessage = 'Task saved to Google Calendar'
					setTimeout(function() {
						scope.showUpdate = false;
						scope.$digest();
					}, 2000)
				});
				updateOrigTaskOn(task);
			}
		}
	}
})