var app = angular.module('dashBoard', ["highcharts-ng"]);

app.constant('REST_URL', document.location.origin + '/api');

app.controller('dashboardController', ['$scope', '$http', 'REST_URL', function($scope, $http, REST_URL) {
    
    function loadBillableData( billable, nonBillable ) {        
        $scope.reportConfig = {
                options: {
                  chart: {
                      type: 'pie',                      
                      height: 300   
                  },
                  tooltip: {
                      style: {
                          padding: 10,
                          fontWeight: 'bold'
                      }
                  }
              },
            credits: {
                enabled: false
            },
             title: {
               text: ''  
             },
             xAxis: {
                categories:'month'   
             },
             yAxis: {
                 title: {
                     text:'demo'
                 }
             },
            series: [{
                name: 'Billable v/s Non-Billable',
                colorByPoint: true,
                data: [{
                    name: 'Billable',
                    y: billable
                }, {
                    name: 'Non-Billable',
                    y: nonBillable
                }]
            }]
        } 
         
    };
       $http.get(REST_URL+'/getBillability')
        .success(function(response) {
            if(response.status == 200) {                                
                var billabilty = response.result[0].value[0];
                loadBillableData(billabilty.Billable, billabilty.NonBillable);
            }
        });    
}]);

