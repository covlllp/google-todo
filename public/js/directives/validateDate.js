app.directive('validateDate', function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, elem, attr, ctrl) {
			ctrl.$parsers.unshift(function(val) {
				var dateArr = val.split('-');
				var date = new Date([dateArr[1], dateArr[2], dateArr[0]].join(' '));
				ctrl.$setValidity('dateValidater', date != 'Invalid Date');
				return val;
			});
		}
	}	
})