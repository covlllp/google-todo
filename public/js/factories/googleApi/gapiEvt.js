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

	factory.updateEvent = function(calId, evtId, evtObj) {
		return $q.when(gapi.client.calendar
			.events.update({
				calendarId: calId,
				eventId: evtId,
				summary: evtObj.summary,
				location: evtObj.location,
				description: evtObj.description,
				start: {
					date: evtObj.start.date
				},
				end: {
					date: evtObj.end.date
				}
			})).then(function(response) {
				console.log(response);
			});
	}
	


	return factory;
});