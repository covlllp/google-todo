app.factory('gapiCal', function() {
	var factory = {};

	factory.getCalendarList = function() {
		return gapi.client.calendar
			.calendarList.list()
			.then(function(response) {
				return response.result.items;
			});
	};

	factory.getCalendarId = function(calendarName) {
		return factory.getCalendarList()
			.then(function(list) {
				var id = null;
				list.forEach(function(calendar) {
					if (calendar.summary == calendarName)
						id = calendar.id;
				});
				return id;
			});
	};


	return factory;
});