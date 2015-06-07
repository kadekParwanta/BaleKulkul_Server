angular.module('BaleKulkul', ['userModule','calendarModule','userService','calendarService','ngRoute','pageslideController'])
.config(['$routeProvider',function($routeProvider){
	$routeProvider
		.when("/user", {
			templateUrl: "templates/users.html"
            })
		.when("/home", {
			templateUrl: "templates/menu.html"
            })
		.when("/calendar", {
			templateUrl: "templates/calendar.html"
            })
         .otherwise({
                redirectTo: "/home"
            });
}]);
