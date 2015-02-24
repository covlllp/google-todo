app.factory('gapiFactory', function($q) {
	var factory = {};

	var calendarLoad = new $q(function(resolve, reject) {
		var interval = setInterval(function() {
			if (window.gapi) {
				resolve(gapi.client.load('calendar','v3'));
				clearInterval(interval);
			}
		}, 200);
	});

	var config = {
		client_id: '566341296092-b48qde36febcash1es1ie2tdoke5hnd6.apps.googleusercontent.com',
		scope: 'https://www.googleapis.com/auth/calendar',
		// immediate: true
	};

	factory.getAuth = function() {
		console.log('clicked!');

		return calendarLoad.then(function() {
			return new $q(function(resolve, reject) {
				gapi.auth.authorize(config, function(authResult) {
					if (authResult.error) reject(authResult.error);
					else resolve(authResult);
				});
			});
		});
	};

	factory.getToken = function() {
		return gapi.auth.getToken();
	}

	factory.getCalendarList = function() {
		return calendarLoad.then(function() {
			return gapi.client.calendar
			.calendarList
			.list();
		}).then(function(response) {
			return response.result.items;
		});
	}

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
	}

	factory.getCalendarById = function(calId) {
		return calendarLoad.then(function() {
			return gapi.client.calendar
			.events.list({
				calendarId: calId,
				orderBy: 'startTime',
				maxResults: 5,
				timeMin: new Date()
			});
		}).then(function(response) {
			return response;
		});
	}


	return factory;
});