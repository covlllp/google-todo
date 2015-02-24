app.factory('gapiCal', function($q) {
	var factory = {};

	factory.getCalendarList = function() {
		return gapi.client.calendar
			.calendarList.list()
			.then(function(response) {
				return response.result.items;
			});
	};

	factory.getCalendarId = function(calendarName) {
		return this.getCalendarList()
			.then(function(list) {
				var id = null;
				list.forEach(function(calendar) {
					if (calendar.summary == calendarName)
						id = calendar.id;
				});

				return new $q(function(resolve, reject) {
					if (id) resolve(id);
					else {
						var err = new Error(404);
						err.body = 'Calendar name "' + calendarName + '" not found in account';
						reject(err);
					}
				});
			});
	};

	factory.makeCalendar = function(calName, calDesc) {
		return gapi.client.calendar
			.calendars.insert({
				summary: calName,
				description: calDesc
			}).then(function(response) {
				console.log('new calendar was made');
				return response.result.id;
			});
	};

	factory.safeMakeCalendar = function(calName, calDesc) {
		var self = this;

		return this.getCalendarId(calName)
			.then(function(id) {
				return id;
			}, function(err) {
				console.log(err.body);
				return self.makeCalendar(calName, calDesc);
			});
	};


	return factory;
});