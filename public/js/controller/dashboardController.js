var app = angular.module('dashBoard', ["highcharts-ng"]);

app.constant('REST_URL', document.location.origin + '/api');

app.controller('dashboardController', ['$scope', '$http', 'REST_URL', function($scope, $http, REST_URL) {
    
    function loadBillableData( billable, nonBillable ) {        
        $scope.reportConfig = {
                options: {
                  chart: {
                      type: 'pie',  
                      width: 400,
                      height: 250   
                  },
                  tooltip: {
                      style: {
                          padding: 10,
                          fontWeight: 'bold'
                      }
                  }, 
                plotOptions: {
                        series: {
                            dataLabels: {
                                enabled: true,
                                formatter: function() {
                                    return Math.round(this.percentage*100)/100 + ' %';
                                },
                                distance: -30,
                                color:'white'
                            }
                        },
                        pie: {
                            allowPointSelect: false,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: false
                            },
                            showInLegend: true
                        }
                    },
                    
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
                name: 'Feb-16',
                colorByPoint: true,
                data: [{
                    name: 'Billable',
                    y: billable,
                    color: 'rgba(0, 177, 106, 0.70)'
                }, {
                    name: 'Non-Billable',
                    y: nonBillable,
                    color: 'rgba(246, 71, 71, 0.75)'
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

