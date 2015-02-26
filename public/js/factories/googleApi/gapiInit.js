app.factory('gapiInit', function($q) {
	var factory = {};

	var config = {
		client_id: '566341296092-b48qde36febcash1es1ie2tdoke5hnd6.apps.googleusercontent.com',
		scope: 'https://www.googleapis.com/auth/calendar',
		// immediate: true
	};

	var calendarLoad = new $q(function(resolve, reject) {
		var interval = setInterval(function() {
			if (window.gapi) {
				resolve(gapi.client.load('calendar','v3'));
				clearInterval(interval);
			}
		}, 200);
	});

	factory.getAuth = function() {
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
		return calendarLoad.then(function() {
			return $q.when(gapi.auth.getToken());
		});
	};

	factory.logout = function() {
		return $q.when(gapi.auth.signOut());
	}


	return factory;
});

app.run(function(gapiFactory, globalFactory) {
	gapiFactory.gapiInit.getAuth()
	.then(function() {
		globalFactory.isAuthorized = true;
		findCalId();
	});

	function findCalId() {
		gapiFactory.gapiCal.getCalendarId(globalFactory.calName)
		.then(function(id) {
			console.log('Calendar found, Cal ID is: ', id);
			globalFactory.calId = id;
			globalFactory.calFound = true;
		}, function(err) {
			console.log(err.body);
		});
	}
});