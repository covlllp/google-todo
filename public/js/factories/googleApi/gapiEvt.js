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
		function ensureStrLength(str, length) {
			while (str.length < length) {
				str = '0' + str;
			}
			return str;
		}

		var startDate = evtObj.start.date;
		console.log('startDate', startDate)
		var dateArr = startDate.split('-');
		
		console.log('dateArr', dateArr)
		var startDay = new Date([dateArr[1], dateArr[2], dateArr[0]].join(' '));
		var dayInMilliseconds = 24 * 60 * 60 * 1000;
		var endDay = new Date(startDay.getTime() + dayInMilliseconds);
		var endDate = endDay.getFullYear() + '-'
			+ ensureStrLength(endDay.getMonth() + 1, 2) + '-'
			+ ensureStrLength(endDay.getDate(), 2);

		return $q.when(gapi.client.calendar
			.events.update({
				calendarId: calId,
				eventId: evtId,
				summary: evtObj.summary,
				location: evtObj.location,
				description: evtObj.description,
				start: {
					date: startDate
				},
				end: {
					date: endDate
				}
			}));
	}
	


	return factory;
});