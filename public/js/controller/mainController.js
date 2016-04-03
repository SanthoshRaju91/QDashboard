var app = angular.module('main', []);

app.controller('mainController', ['$scope', '$state', 'AuthService', function($scope, $state, AuthService) {
    $scope.logOut = function() {
        AuthService.logOut();
        $state.transitionTo('login');
    }    
    
    $scope.role = AuthService.getRole();
    $scope.fullName = AuthService.getUserFullName();
    
    socket.on('notify', function(msg) {
       $.notify({
           icon: 'glyphicon glyphicon-warning-sign',
           title: 'Data uploaded was done recently',
           message: msg
       }, {
           element: 'body',
           position: null,
           type: 'success',
           allow_dismiss: true,
           newest_on_top: false,
           showProgressBar: false,
           placement: {
               from: 'top',
               align: 'right'
           },
           offset: 70,
           spacing: 10,
           z_index: 1030,
           delay: 5000,
           timer: 1000,
           mouse_over: null,
           animate: {
               enter: 'animated fadeInDown',
               exit: 'animated fadeOutUp'
           },
           onShow: null,
           onShown: null,
           onClose: null,
           onClosed: null,
           icon_type: 'class',
           template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} custom-notify" role="alert">' +
                        '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                        '<span data-notify="title">{1}</span> ' +
                        '<span data-notify="message">{2}</span>' +                        
                    '</div>' 
       })
    });
}]);