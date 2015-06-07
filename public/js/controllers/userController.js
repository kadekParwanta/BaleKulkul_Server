angular.module('userModule', [])

	// inject the User service factory into our controller
	.controller('mainController', ['$scope','$http','User', function($scope, $http, User) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all users and show them
		// use the service to get all the users
		User.getAll()
			.success(function(data) {
				$scope.users = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createUser = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.user_name != undefined) {
				$scope.loading = true;

				
				User.create($scope.formData)
					
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {};
						$scope.users = data;
					});
			}
		};

		// DELETE ==================================================================
		$scope.deleteUser = function(id) {
			$scope.loading = true;

			User.delete(id)
				.success(function(data) {
					$scope.loading = false;
					$scope.users = data;
				});
		};
	}]);