angular.module('calendarService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Calendar', ['$http',function($http) {
		return {
			getAllProperties : function(date) {
				return $http.post('/api/date_property', date);
			}
		}
	}]);