var app = angular.module('utilization', ["highcharts-ng"]);

app.constant('REST_URL', document.location.origin + '/api');

app.controller('utilizationController', ['$scope', '$http','REST_URL', function($scope, $http,REST_URL) {
    
      $http.get(REST_URL + '/getDates')
        .success(function(response) {
            if(response.success) {
                $scope.dates = response.result;
                console.log($scope.dates);
            } else {
                console.log("Error in getting the dates");
            }
        });
     
     $scope.selectDate= function(selectedDate,selectedLevel) {
        $scope.locationBillablity = [];
        $scope.verticalBillablity = [];
        $http.get(REST_URL+'/getlevelBillability/' + selectedDate+"/"+selectedLevel)
            .success(function(response) {
            if(response.success) { 
                if(response.result.length > 0) {                        
                    }
                }
            });
     }
     
     $http.get(REST_URL+'/getlevelBillability')
        .success(function(response) {
            if(response.success) { 
                if(response.result.length > 0) {                        
                    
                    var billabilty = response.result[response.result.length -1];
                     
                }
            }
        });
}]);