app.factory('gapiFactory', function(gapiInit, gapiCal, gapiEvt) {
	var factory = {};

	factory.gapiInit = gapiInit;
	factory.gapiCal = gapiCal;
	factory.gapiEvt = gapiEvt;

	return factory;
});