var app = angular.module('finance', ["highcharts-ng"]);

app.controller('financeController', ['$scope', '$http', '$parse', 'REST_URL', function($scope, $http, $parse, REST_URL) {

    function loadFinanceMetricsForVerticalGraph(verticalName, scopeName, metricsName, plannedValue, ActualValue) {

       var modelValue = {
            options: {
                chart: {
                    type: 'column',
                    width: 450
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                credits: {
                           enabled: false
                          },
                title: {
                    text: verticalName + '- Q1',
                     style: {
                        color: '#2c3e50',
                        fontSize:'13px'
                    },
                    x: 30
                },
                subtitle: {
                    text: ''
                },
                tooltip: {
                     headerFormat: '<span style="font-size:12px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0;font-size:12px">{series.name}: </td>' +
                        '<td style="padding:0;font-size:12px"><b>{point.y}</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                exporting: { enabled: false }
            },
            xAxis: {
                categories: metricsName,
                crosshair: true
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            series: [{
                name: 'Planned',
                data: plannedValue

            }, {
                name: 'Actual',
                data: ActualValue

            }]
       }

        var model = $parse(scopeName);
        model.assign($scope, modelValue);
        console.log($scope.ManufacturingQ1);
    }

    $http.get(REST_URL + '/getFinanceDataForVerticalQuarter/Manufacturing & Services/Q2')
        .success(function(response) {            
            $scope.financeQuarterMetrics = [];
            $scope.financeQuarterMetricsName = [];
            $scope.financeQuarterMetricsPlannedValue = [];
            $scope.financeQuarterMetricsNameActualValue = [];            
            for(var obj in response.result[0].metrics) {
                $scope.quarterMetrics = {};
                $scope.financeQuarterMetricsName.push(obj);
                $scope.financeQuarterMetricsPlannedValue.push(parseInt(response.result[0].metrics[obj][0].Plan));
                $scope.financeQuarterMetricsNameActualValue.push(parseInt(response.result[0].metrics[obj][0].Actual));                

                $scope.quarterMetrics.metricsName = obj;
                $scope.quarterMetrics.Plan = response.result[0].metrics[obj][0].Plan;
                $scope.quarterMetrics.Actual = response.result[0].metrics[obj][0].Actual;

                $scope.financeQuarterMetrics.push($scope.quarterMetrics);
            }
            loadFinanceMetricsForVerticalGraph('Manufacturing & Services', 'ManufacturingQ1', $scope.financeQuarterMetricsName, $scope.financeQuarterMetricsPlannedValue, $scope.financeQuarterMetricsNameActualValue);
        });  
}]);