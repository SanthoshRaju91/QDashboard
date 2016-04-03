var app = angular.module('finance', ["highcharts-ng"]);

app.controller('financeController', ['$scope', '$http', 'REST_URL', function($scope, $http, REST_URL) {
    $http.get(REST_URL + '/getFinanceDataForVerticalQuarter/Manufacturing & Services/Q2')
        .success(function(response) {
            console.log(response.result[0]);
            $scope.financeQuarterMetrics = [];
            for(var obj in response.result[0].metrics) {
                $scope.quarterMetrics = {};
                $scope.quarterMetrics.metricsName = obj;
                $scope.quarterMetrics.plannedValue = response.result[0].metrics[obj][0].Plan;
                $scope.quarterMetrics.actualValue = response.result[0].metrics[obj][0].Actual;
                $scope.financeQuarterMetrics.push($scope.quarterMetrics);
            }
        console.log($scope.financeQuarterMetrics);
        });  
}]);