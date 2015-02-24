app.controller('ListController', function($scope, gapiFactory) {
	var calId;

	gapiFactory.gapiCal.getCalendarId('calenDoList').then(function(id) {
		calId = id;
	});
});