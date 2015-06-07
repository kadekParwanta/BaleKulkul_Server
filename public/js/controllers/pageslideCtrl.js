var app = angular.module("pageslideController", ["pageslide-directive"]);
            app.controller('pageslideCtrl',['$scope',function($scope){
                $scope.checked = false; // This will be binded using the ps-open attribute
                $scope.toggle = function(){
                    $scope.checked = !$scope.checked
                }
            }]);
            angular.element(document).ready(function(){
                c = angular.element(document.querySelector('#controller-demo')).scope();
            });