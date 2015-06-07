angular.module('userService', [])

	// super simple service
	// each function returns a promise object 
	.factory('User', ['$http',function($http) {
		return {
			getAll : function() {
				return $http.get('/api/getAllUser');
			},
			findUser : function(id) {
				return $http.get('/api/findUser', id);
			},
			create : function(userData) {
				return $http.post('/api/createUser', userData);
			},
			delete : function(id) {
				return $http.delete('/api/user/' + id);
			}
		}
	}]);