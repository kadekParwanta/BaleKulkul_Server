angular.module('calendarModule', [])

	// inject the User service factory into our controller
	.controller('calendarController', ['$scope','$http','Calendar', function($scope, $http, Calendar) {
		$scope.formData = {};
		$scope.loading = true;
		$scope.date_property = {};

		$scope.getDateProperty = function() {
			$scope.loading = true;

			Calendar.getAllProperties($scope.formData)
				.success(function(data) {
					$scope.loading = false;
					$scope.date_property = data;
					console.log('date_property = ' + JSON.stringify($scope.date_property));
				});
		};
	}]);