app.factory('gapiEvt', function($q) {
	var factory = {};

	factory.getEventList = function(calId) {
		return $q.when(gapi.client.calendar
			.events.list({
				calendarId: calId,
				orderBy: 'startTime',
				singleEvents: true
				// timeMin: new Date().toISOString()
			})).then(function(response) {
				return response.result.items;
			});
	};

	


	return factory;
});