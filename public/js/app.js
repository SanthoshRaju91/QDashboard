var app = angular.module('App', ['ui.router', 'authService', 'login', 'dashBoard','utilization','main', 'upload', 'assignment', 'finance']);

app.config(function($stateProvider, $urlRouterProvider) {
   
    $urlRouterProvider.otherwise('/login');
    
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller: 'LoginController',
            authenticate: false
        })
        .state('landing', {
            url: '/landing',
            templateUrl: 'landing.html',        
            authenticate: true
        })
        .state('landing.dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard.html',
            controller: 'dashboardController',
            authenticate: true
        })
        .state('landing.utilization', {
            url: '/utilization',
            templateUrl: 'views/utilization.html',
            controller: 'utilizationController',
            authenticate: true
        })
        .state('landing.finance', {
            url: '/excel',
            templateUrl: 'views/finance.html',
            controller: 'financeController',
            authenticate: true
        })
        .state('landing.assignment', {
            url: '/assignment',
            templateUrl: 'views/assignment.html',
            controller: 'assignmentController',
            authenticate: true
        })
        .state('landing.upload', {
            url: '/upload',
            templateUrl: 'views/upload.html',
            controller: 'uploadController',
            authenticate: true
            });
});


app.config(function($httpProvider) {
   $httpProvider.interceptors.push('AuthInterceptor'); 
});


app.run(['$rootScope', '$state', 'AuthService', function($rootScope, $state, AuthService) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {        
        if(toState.authenticate && !AuthService.isAuthenticated()) {            
            $state.transitionTo('login');
            event.preventDefault();
       } 
    });
}]);