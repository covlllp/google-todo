app.directive('welcomeBanner', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/directives/welcomeBanner/welcomeBanner.html',
		controller: 'BannerController'
	};
});