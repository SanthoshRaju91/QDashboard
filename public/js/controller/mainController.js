var app = angular.module('main', []);

app.controller('mainController', ['$scope', '$state', 'AuthService', function($scope, $state, AuthService) {
    $scope.logOut = function() {
        AuthService.logOut();
        $state.transitionTo('login');
    }
    $scope.fullName = 'Santhosh' + ' Raju';
}]);