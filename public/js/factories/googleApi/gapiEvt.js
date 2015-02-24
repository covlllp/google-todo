app.factory('gapiEvt', function() {
	var factory = {};

	factory.getEventList = function(calId) {
		return gapi.client.calendar
			.events.list({
				calendarId: calId,
				orderBy: 'startTime',
				singleEvents: true,
				maxResults: 5,
				timeMin: new Date().toISOString()
			}).then(function(response) {
				return response.result.items;
			});
	};

	


	return factory;
});