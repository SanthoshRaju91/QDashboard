var app = angular.module('finance', ["highcharts-ng"]);

app.controller('financeController', ['$scope', '$http', '$parse', 'REST_URL', function($scope, $http, $parse, REST_URL) {


    $http.get(REST_URL + '/getFinanceDates')
        .success(function(response) {
            if(response.success) {
                $scope.FinanceDates = response.result;
                $scope.lastMonth = $scope.FinanceDates[$scope.FinanceDates.length - 1];
                $scope.selectedMonth = $scope.lastMonth;                
            }
        });



    function loadFinanceMetricsForVerticalGraph(verticalName, scopeName, metricsName, plannedValue, ActualValue) {

       var modelValue = {
            options: {
                chart: {
                    type: 'column',
                    width: 450,
                    height: 280
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
                    text: verticalName,
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
                        '<td style="padding:0;font-size:10px"><b>${point.y}</b></td></tr>',
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
    }

    function loadFinanceMetricsForVerticalYTDGraph(verticalName, scopeName, metricsName, plannedValue, ActualValue) {

       var modelValue = {
            options: {
                chart: {
                    type: 'column',
                    width: 320,
                    height: 280
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
                    text: verticalName,
                     style: {
                        color: '#2c3e50',
                        fontSize:'13px'
                    },
                    x: 20
                },
                subtitle: {
                    text: ''
                },
                tooltip: {
                     headerFormat: '<span style="font-size:12px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0;font-size:12px">{series.name}: </td>' +
                        '<td style="padding:0;font-size:10px"><b>${point.y}</b></td></tr>',
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
    }

    $http.get(REST_URL + '/getFinanceDataForVerticalQuarter/Financial & Services/Q1')
        .success(function(response) {            
            $scope.financeQuarter1Metrics = [];
            var financeQuarterMetricsName = [];
            var financeQuarterMetricsPlannedValue = [];
            var financeQuarterMetricsNameActualValue = [];            
            for(var obj in response.result[0].metrics) {
                $scope.quarterMetrics = {};
                financeQuarterMetricsName.push(obj);
                financeQuarterMetricsPlannedValue.push(parseInt(response.result[0].metrics[obj][0].Plan));
                financeQuarterMetricsNameActualValue.push(parseInt(response.result[0].metrics[obj][0].Actual));                

                $scope.quarterMetrics.metricsName = obj;
                $scope.quarterMetrics.Plan = response.result[0].metrics[obj][0].Plan;
                $scope.quarterMetrics.Actual = response.result[0].metrics[obj][0].Actual;

                $scope.financeQuarter1Metrics.push($scope.quarterMetrics);
            }
            loadFinanceMetricsForVerticalGraph('Financial & Services - Q1', 'FinancialServiceQ1', financeQuarterMetricsName, financeQuarterMetricsPlannedValue, financeQuarterMetricsNameActualValue);
        });  

    $http.get(REST_URL + '/getFinanceDataForVerticalQuarter/Financial & Services/Q2')
        .success(function(response) {            
            $scope.financeQuarter2Metrics = [];
            var financeQuarterMetricsName = [];
            var financeQuarterMetricsPlannedValue = [];
            var financeQuarterMetricsNameActualValue = [];            
            for(var obj in response.result[0].metrics) {
                $scope.quarterMetrics = {};
                financeQuarterMetricsName.push(obj);
                financeQuarterMetricsPlannedValue.push(parseInt(response.result[0].metrics[obj][0].Plan));
                financeQuarterMetricsNameActualValue.push(parseInt(response.result[0].metrics[obj][0].Actual));                

                $scope.quarterMetrics.metricsName = obj;
                $scope.quarterMetrics.Plan = response.result[0].metrics[obj][0].Plan;
                $scope.quarterMetrics.Actual = response.result[0].metrics[obj][0].Actual;

                $scope.financeQuarter2Metrics.push($scope.quarterMetrics);
            }
            loadFinanceMetricsForVerticalGraph('Financial & Services - Q2', 'FinancialServiceQ2', financeQuarterMetricsName, financeQuarterMetricsPlannedValue, financeQuarterMetricsNameActualValue);
        });

    $http.get(REST_URL + '/getFinanceDataForVerticalQuarter/Financial & Services/Q3')
        .success(function(response) {            
            $scope.financeQuarter3Metrics = [];
            var financeQuarterMetricsName = [];
            var financeQuarterMetricsPlannedValue = [];
            var financeQuarterMetricsNameActualValue = [];            
            for(var obj in response.result[0].metrics) {
                $scope.quarterMetrics = {};
                financeQuarterMetricsName.push(obj);
                financeQuarterMetricsPlannedValue.push(parseInt(response.result[0].metrics[obj][0].Plan));
                financeQuarterMetricsNameActualValue.push(parseInt(response.result[0].metrics[obj][0].Actual));                

                $scope.quarterMetrics.metricsName = obj;
                $scope.quarterMetrics.Plan = response.result[0].metrics[obj][0].Plan;
                $scope.quarterMetrics.Actual = response.result[0].metrics[obj][0].Actual;

                $scope.financeQuarter3Metrics.push($scope.quarterMetrics);
            }
            loadFinanceMetricsForVerticalGraph('Financial & Services - Q3', 'FinancialServiceQ3', financeQuarterMetricsName, financeQuarterMetricsPlannedValue, financeQuarterMetricsNameActualValue);
        });

    $http.get(REST_URL + '/getFinanceDataForVerticalQuarter/Financial & Services/Q4')
            .success(function(response) {            
                $scope.financeQuarter4Metrics = [];
                var financeQuarterMetricsName = [];
                var financeQuarterMetricsPlannedValue = [];
                var financeQuarterMetricsNameActualValue = [];            
                for(var obj in response.result[0].metrics) {
                    $scope.quarterMetrics = {};
                    financeQuarterMetricsName.push(obj);
                    financeQuarterMetricsPlannedValue.push(parseInt(response.result[0].metrics[obj][0].Plan));
                    financeQuarterMetricsNameActualValue.push(parseInt(response.result[0].metrics[obj][0].Actual));                

                    $scope.quarterMetrics.metricsName = obj;
                    $scope.quarterMetrics.Plan = response.result[0].metrics[obj][0].Plan;
                    $scope.quarterMetrics.Actual = response.result[0].metrics[obj][0].Actual;

                    $scope.financeQuarter4Metrics.push($scope.quarterMetrics);
                }
                loadFinanceMetricsForVerticalGraph('Financial & Services - Q4', 'FinancialServiceQ4', financeQuarterMetricsName, financeQuarterMetricsPlannedValue, financeQuarterMetricsNameActualValue);
            });

    $http.get(REST_URL + '/getFinanceDataForVerticalQuarter/Manufacturing & Services/Q1')
            .success(function(response) {            
                $scope.financeManuQuarter1Metrics = [];
                var financeQuarterMetricsName = [];
                var financeQuarterMetricsPlannedValue = [];
                var financeQuarterMetricsNameActualValue = [];            
                for(var obj in response.result[0].metrics) {
                    $scope.quarterMetrics = {};
                    financeQuarterMetricsName.push(obj);
                    financeQuarterMetricsPlannedValue.push(parseInt(response.result[0].metrics[obj][0].Plan));
                    financeQuarterMetricsNameActualValue.push(parseInt(response.result[0].metrics[obj][0].Actual));                

                    $scope.quarterMetrics.metricsName = obj;
                    $scope.quarterMetrics.Plan = response.result[0].metrics[obj][0].Plan;
                    $scope.quarterMetrics.Actual = response.result[0].metrics[obj][0].Actual;

                    $scope.financeManuQuarter1Metrics.push($scope.quarterMetrics);
                }
                loadFinanceMetricsForVerticalGraph('Manufacturing & Services - Q1', 'ManufacturingServiceQ1', financeQuarterMetricsName, financeQuarterMetricsPlannedValue, financeQuarterMetricsNameActualValue);
            });

    $http.get(REST_URL + '/getFinanceDataForVerticalQuarter/Manufacturing & Services/Q2')
            .success(function(response) {            
                $scope.financeManuQuarter2Metrics = [];
                var financeQuarterMetricsName = [];
                var financeQuarterMetricsPlannedValue = [];
                var financeQuarterMetricsNameActualValue = [];            
                for(var obj in response.result[0].metrics) {
                    $scope.quarterMetrics = {};
                    financeQuarterMetricsName.push(obj);
                    financeQuarterMetricsPlannedValue.push(parseInt(response.result[0].metrics[obj][0].Plan));
                    financeQuarterMetricsNameActualValue.push(parseInt(response.result[0].metrics[obj][0].Actual));                

                    $scope.quarterMetrics.metricsName = obj;
                    $scope.quarterMetrics.Plan = response.result[0].metrics[obj][0].Plan;
                    $scope.quarterMetrics.Actual = response.result[0].metrics[obj][0].Actual;

                    $scope.financeManuQuarter2Metrics.push($scope.quarterMetrics);
                }
                loadFinanceMetricsForVerticalGraph('Manufacturing & Services - Q2', 'ManufacturingServiceQ2', financeQuarterMetricsName, financeQuarterMetricsPlannedValue, financeQuarterMetricsNameActualValue);
            });

    $http.get(REST_URL + '/getFinanceDataForVerticalQuarter/Manufacturing & Services/Q3')
            .success(function(response) {            
                $scope.financeManuQuarter3Metrics = [];
                var financeQuarterMetricsName = [];
                var financeQuarterMetricsPlannedValue = [];
                var financeQuarterMetricsNameActualValue = [];            
                for(var obj in response.result[0].metrics) {
                    $scope.quarterMetrics = {};
                    financeQuarterMetricsName.push(obj);
                    financeQuarterMetricsPlannedValue.push(parseInt(response.result[0].metrics[obj][0].Plan));
                    financeQuarterMetricsNameActualValue.push(parseInt(response.result[0].metrics[obj][0].Actual));                

                    $scope.quarterMetrics.metricsName = obj;
                    $scope.quarterMetrics.Plan = response.result[0].metrics[obj][0].Plan;
                    $scope.quarterMetrics.Actual = response.result[0].metrics[obj][0].Actual;

                    $scope.financeManuQuarter3Metrics.push($scope.quarterMetrics);
                }
                loadFinanceMetricsForVerticalGraph('Manufacturing & Services - Q3', 'ManufacturingServiceQ3', financeQuarterMetricsName, financeQuarterMetricsPlannedValue, financeQuarterMetricsNameActualValue);
            });    

    $http.get(REST_URL + '/getFinanceDataForVerticalQuarter/Manufacturing & Services/Q4')
            .success(function(response) {            
                $scope.financeManuQuarter4Metrics = [];
                var financeQuarterMetricsName = [];
                var financeQuarterMetricsPlannedValue = [];
                var financeQuarterMetricsNameActualValue = [];            
                for(var obj in response.result[0].metrics) {
                    $scope.quarterMetrics = {};
                    financeQuarterMetricsName.push(obj);
                    financeQuarterMetricsPlannedValue.push(parseInt(response.result[0].metrics[obj][0].Plan));
                    financeQuarterMetricsNameActualValue.push(parseInt(response.result[0].metrics[obj][0].Actual));                

                    $scope.quarterMetrics.metricsName = obj;
                    $scope.quarterMetrics.Plan = response.result[0].metrics[obj][0].Plan;
                    $scope.quarterMetrics.Actual = response.result[0].metrics[obj][0].Actual;

                    $scope.financeManuQuarter4Metrics.push($scope.quarterMetrics);
                }
                loadFinanceMetricsForVerticalGraph('Manufacturing & Services - Q4', 'ManufacturingServiceQ4', financeQuarterMetricsName, financeQuarterMetricsPlannedValue, financeQuarterMetricsNameActualValue);
            });

    $http.get(REST_URL + '/getFinanceDataForVerticalQuarter/Retail & Distribution/Q1')
            .success(function(response) {            
                $scope.financeRetQuarter1Metrics = [];
                var financeQuarterMetricsName = [];
                var financeQuarterMetricsPlannedValue = [];
                var financeQuarterMetricsNameActualValue = [];            
                for(var obj in response.result[0].metrics) {
                    $scope.quarterMetrics = {};
                    financeQuarterMetricsName.push(obj);
                    financeQuarterMetricsPlannedValue.push(parseInt(response.result[0].metrics[obj][0].Plan));
                    financeQuarterMetricsNameActualValue.push(parseInt(response.result[0].metrics[obj][0].Actual));                

                    $scope.quarterMetrics.metricsName = obj;
                    $scope.quarterMetrics.Plan = response.result[0].metrics[obj][0].Plan;
                    $scope.quarterMetrics.Actual = response.result[0].metrics[obj][0].Actual;

                    $scope.financeRetQuarter1Metrics.push($scope.quarterMetrics);
                }
                loadFinanceMetricsForVerticalGraph('Retail & Distribution - Q1', 'retailDistributionQ1', financeQuarterMetricsName, financeQuarterMetricsPlannedValue, financeQuarterMetricsNameActualValue);
            });


    $http.get(REST_URL + '/getFinanceDataForVerticalQuarter/Retail & Distribution/Q2')
            .success(function(response) {            
                $scope.financeRetQuarter2Metrics = [];
                var financeQuarterMetricsName = [];
                var financeQuarterMetricsPlannedValue = [];
                var financeQuarterMetricsNameActualValue = [];            
                for(var obj in response.result[0].metrics) {
                    $scope.quarterMetrics = {};
                    financeQuarterMetricsName.push(obj);
                    financeQuarterMetricsPlannedValue.push(parseInt(response.result[0].metrics[obj][0].Plan));
                    financeQuarterMetricsNameActualValue.push(parseInt(response.result[0].metrics[obj][0].Actual));                

                    $scope.quarterMetrics.metricsName = obj;
                    $scope.quarterMetrics.Plan = response.result[0].metrics[obj][0].Plan;
                    $scope.quarterMetrics.Actual = response.result[0].metrics[obj][0].Actual;

                    $scope.financeRetQuarter2Metrics.push($scope.quarterMetrics);
                }
                loadFinanceMetricsForVerticalGraph('Retail & Distribution - Q2', 'retailDistributionQ2', financeQuarterMetricsName, financeQuarterMetricsPlannedValue, financeQuarterMetricsNameActualValue);
            });

    $http.get(REST_URL + '/getFinanceDataForVerticalQuarter/Retail & Distribution/Q3')
            .success(function(response) {            
                $scope.financeRetQuarter3Metrics = [];
                var financeQuarterMetricsName = [];
                var financeQuarterMetricsPlannedValue = [];
                var financeQuarterMetricsNameActualValue = [];            
                for(var obj in response.result[0].metrics) {
                    $scope.quarterMetrics = {};
                    financeQuarterMetricsName.push(obj);
                    financeQuarterMetricsPlannedValue.push(parseInt(response.result[0].metrics[obj][0].Plan));
                    financeQuarterMetricsNameActualValue.push(parseInt(response.result[0].metrics[obj][0].Actual));                

                    $scope.quarterMetrics.metricsName = obj;
                    $scope.quarterMetrics.Plan = response.result[0].metrics[obj][0].Plan;
                    $scope.quarterMetrics.Actual = response.result[0].metrics[obj][0].Actual;

                    $scope.financeRetQuarter3Metrics.push($scope.quarterMetrics);
                }
                loadFinanceMetricsForVerticalGraph('Retail & Distribution - Q3', 'retailDistributionQ3', financeQuarterMetricsName, financeQuarterMetricsPlannedValue, financeQuarterMetricsNameActualValue);
            });

    $http.get(REST_URL + '/getFinanceDataForVerticalQuarter/Retail & Distribution/Q4')
            .success(function(response) {            
                $scope.financeRetQuarter4Metrics = [];
                var financeQuarterMetricsName = [];
                var financeQuarterMetricsPlannedValue = [];
                var financeQuarterMetricsNameActualValue = [];            
                for(var obj in response.result[0].metrics) {
                    $scope.quarterMetrics = {};
                    financeQuarterMetricsName.push(obj);
                    financeQuarterMetricsPlannedValue.push(parseInt(response.result[0].metrics[obj][0].Plan));
                    financeQuarterMetricsNameActualValue.push(parseInt(response.result[0].metrics[obj][0].Actual));                

                    $scope.quarterMetrics.metricsName = obj;
                    $scope.quarterMetrics.Plan = response.result[0].metrics[obj][0].Plan;
                    $scope.quarterMetrics.Actual = response.result[0].metrics[obj][0].Actual;

                    $scope.financeRetQuarter4Metrics.push($scope.quarterMetrics);
                }
                loadFinanceMetricsForVerticalGraph('Retail & Distribution - Q4', 'retailDistributionQ4', financeQuarterMetricsName, financeQuarterMetricsPlannedValue, financeQuarterMetricsNameActualValue);
            });

    $http.get(REST_URL + '/getFinanceDataForVerticalQuarter/Financial & Services/YTD')
        .success(function(response) {
                var financeQuarterMetricsName = [];
                var financeQuarterMetricsPlannedValue = [];
                var financeQuarterMetricsNameActualValue = [];            
                for(var obj in response.result[0].metrics) {
                    $scope.quarterMetrics = {};
                    financeQuarterMetricsName.push(obj);
                    financeQuarterMetricsPlannedValue.push(parseInt(response.result[0].metrics[obj][0].Plan));
                    financeQuarterMetricsNameActualValue.push(parseInt(response.result[0].metrics[obj][0].Actual));                

                    /*$scope.quarterMetrics.metricsName = obj;
                    $scope.quarterMetrics.Plan = response.result[0].metrics[obj][0].Plan;
                    $scope.quarterMetrics.Actual = response.result[0].metrics[obj][0].Actual;

                    $scope.financeRetQuarter4Metrics.push($scope.quarterMetrics);*/
                }
                loadFinanceMetricsForVerticalYTDGraph('Financial & Service - YTD', 'financialServiceYTD', financeQuarterMetricsName, financeQuarterMetricsPlannedValue, financeQuarterMetricsNameActualValue);        
        });

    $http.get(REST_URL + '/getFinanceDataForVerticalQuarter/Retail & Distribution/YTD')
        .success(function(response) {             
            var financeQuarterMetricsName = [];
            var financeQuarterMetricsPlannedValue = [];
            var financeQuarterMetricsNameActualValue = [];            
            for(var obj in response.result[0].metrics) {
                $scope.quarterMetrics = {};
                financeQuarterMetricsName.push(obj);
                financeQuarterMetricsPlannedValue.push(parseInt(response.result[0].metrics[obj][0].Plan));
                financeQuarterMetricsNameActualValue.push(parseInt(response.result[0].metrics[obj][0].Actual));                
            }
            loadFinanceMetricsForVerticalYTDGraph('Retail & Distribution - YTD', 'retailDistributionYTD', financeQuarterMetricsName, financeQuarterMetricsPlannedValue, financeQuarterMetricsNameActualValue);        
        });

    $http.get(REST_URL + '/getFinanceDataForVerticalQuarter/Manufacturing & Services/YTD')
        .success(function(response) {             
            var financeQuarterMetricsName = [];
            var financeQuarterMetricsPlannedValue = [];
            var financeQuarterMetricsNameActualValue = [];            
            for(var obj in response.result[0].metrics) {
                $scope.quarterMetrics = {};
                financeQuarterMetricsName.push(obj);
                financeQuarterMetricsPlannedValue.push(parseInt(response.result[0].metrics[obj][0].Plan));
                financeQuarterMetricsNameActualValue.push(parseInt(response.result[0].metrics[obj][0].Actual));                
            }
            loadFinanceMetricsForVerticalYTDGraph('Manufacturing & Services - YTD', 'manufacturingServicesYTD', financeQuarterMetricsName, financeQuarterMetricsPlannedValue, financeQuarterMetricsNameActualValue);        
        });



    setTimeout(function() {
        if($scope.lastMonth) {
            $http.get(REST_URL + '/getFinanceDataForVerticalQuarter/Manufacturing & Services/' + $scope.lastMonth)
                .success(function(response) {
                    if(response.success && response.result.length > 0) {
                        $scope.financeManufacturingQuarterMetrics = [];
                        var financeQuarterMetricsName = [];
                        var financeQuarterMetricsPlannedValue = [];
                        var financeQuarterMetricsNameActualValue = [];            
                        for(var obj in response.result[0].metrics) {
                            $scope.quarterMetrics = {};
                            financeQuarterMetricsName.push(obj);
                            financeQuarterMetricsPlannedValue.push(parseInt(response.result[0].metrics[obj][0].Plan));
                            financeQuarterMetricsNameActualValue.push(parseInt(response.result[0].metrics[obj][0].Actual));                

                            $scope.quarterMetrics.metricsName = obj;
                            $scope.quarterMetrics.Plan = response.result[0].metrics[obj][0].Plan;
                            $scope.quarterMetrics.Actual = response.result[0].metrics[obj][0].Actual;

                            $scope.financeManufacturingQuarterMetrics.push($scope.quarterMetrics);
                        }
                        loadFinanceMetricsForVerticalYTDGraph('Manufacturing & Services - ' + $scope.lastMonth, 'manufacturingServicesMetrics', financeQuarterMetricsName, financeQuarterMetricsPlannedValue, financeQuarterMetricsNameActualValue);            
                    }
                });

            $http.get(REST_URL + '/getFinanceDataForVerticalQuarter/Retail & Distribution/' + $scope.lastMonth)
                .success(function(response) {
                    if(response.success && response.result.length > 0) {
                        $scope.financeRetailQuarterMetrics = [];
                        var financeQuarterMetricsName = [];
                        var financeQuarterMetricsPlannedValue = [];
                        var financeQuarterMetricsNameActualValue = [];            
                        for(var obj in response.result[0].metrics) {
                            $scope.quarterMetrics = {};
                            financeQuarterMetricsName.push(obj);
                            financeQuarterMetricsPlannedValue.push(parseInt(response.result[0].metrics[obj][0].Plan));
                            financeQuarterMetricsNameActualValue.push(parseInt(response.result[0].metrics[obj][0].Actual));                

                            $scope.quarterMetrics.metricsName = obj;
                            $scope.quarterMetrics.Plan = response.result[0].metrics[obj][0].Plan;
                            $scope.quarterMetrics.Actual = response.result[0].metrics[obj][0].Actual;

                            $scope.financeRetailQuarterMetrics.push($scope.quarterMetrics);
                        }
                        loadFinanceMetricsForVerticalYTDGraph('Retail & Distribution - ' + $scope.lastMonth, 'retailDistributionMetrics', financeQuarterMetricsName, financeQuarterMetricsPlannedValue, financeQuarterMetricsNameActualValue);            
                    }
                });   

             $http.get(REST_URL + '/getFinanceDataForVerticalQuarter/Financial & Services/' + $scope.lastMonth)
                .success(function(response) {
                    if(response.success && response.result.length > 0) {
                        $scope.financeServiceQuarterMetrics = [];
                        var financeQuarterMetricsName = [];
                        var financeQuarterMetricsPlannedValue = [];
                        var financeQuarterMetricsNameActualValue = [];            
                        for(var obj in response.result[0].metrics) {
                            $scope.quarterMetrics = {};
                            financeQuarterMetricsName.push(obj);
                            financeQuarterMetricsPlannedValue.push(parseInt(response.result[0].metrics[obj][0].Plan));
                            financeQuarterMetricsNameActualValue.push(parseInt(response.result[0].metrics[obj][0].Actual));                

                            $scope.quarterMetrics.metricsName = obj;
                            $scope.quarterMetrics.Plan = response.result[0].metrics[obj][0].Plan;
                            $scope.quarterMetrics.Actual = response.result[0].metrics[obj][0].Actual;

                            $scope.financeServiceQuarterMetrics.push($scope.quarterMetrics);
                        }
                        loadFinanceMetricsForVerticalYTDGraph('Financial & Services - ' + $scope.lastMonth, 'financialServicesMetrics', financeQuarterMetricsName, financeQuarterMetricsPlannedValue, financeQuarterMetricsNameActualValue);            
                    }
                });
        }
    }, 1000);

    $scope.selectMonth = function(selectedMonth) {
        $http.get(REST_URL + '/getFinanceDataForVerticalQuarter/Manufacturing & Services/' + selectedMonth)
                .success(function(response) {
                    if(response.success && response.result.length > 0) {
                        $scope.financeManufacturingQuarterMetrics = [];
                        var financeQuarterMetricsName = [];
                        var financeQuarterMetricsPlannedValue = [];
                        var financeQuarterMetricsNameActualValue = [];            
                        for(var obj in response.result[0].metrics) {
                            $scope.quarterMetrics = {};
                            financeQuarterMetricsName.push(obj);
                            financeQuarterMetricsPlannedValue.push(parseInt(response.result[0].metrics[obj][0].Plan));
                            financeQuarterMetricsNameActualValue.push(parseInt(response.result[0].metrics[obj][0].Actual));                

                            $scope.quarterMetrics.metricsName = obj;
                            $scope.quarterMetrics.Plan = response.result[0].metrics[obj][0].Plan;
                            $scope.quarterMetrics.Actual = response.result[0].metrics[obj][0].Actual;

                            $scope.financeManufacturingQuarterMetrics.push($scope.quarterMetrics);
                        }
                        loadFinanceMetricsForVerticalYTDGraph('Manufacturing & Services - ' + selectedMonth, 'manufacturingServicesMetrics', financeQuarterMetricsName, financeQuarterMetricsPlannedValue, financeQuarterMetricsNameActualValue);            
                    }
                });

            $http.get(REST_URL + '/getFinanceDataForVerticalQuarter/Retail & Distribution/' + selectedMonth)
                .success(function(response) {
                    if(response.success && response.result.length > 0) {
                        $scope.financeRetailQuarterMetrics = [];
                        var financeQuarterMetricsName = [];
                        var financeQuarterMetricsPlannedValue = [];
                        var financeQuarterMetricsNameActualValue = [];            
                        for(var obj in response.result[0].metrics) {
                            $scope.quarterMetrics = {};
                            financeQuarterMetricsName.push(obj);
                            financeQuarterMetricsPlannedValue.push(parseInt(response.result[0].metrics[obj][0].Plan));
                            financeQuarterMetricsNameActualValue.push(parseInt(response.result[0].metrics[obj][0].Actual));                

                            $scope.quarterMetrics.metricsName = obj;
                            $scope.quarterMetrics.Plan = response.result[0].metrics[obj][0].Plan;
                            $scope.quarterMetrics.Actual = response.result[0].metrics[obj][0].Actual;

                            $scope.financeRetailQuarterMetrics.push($scope.quarterMetrics);
                        }
                        loadFinanceMetricsForVerticalYTDGraph('Retail & Distribution - ' + selectedMonth, 'retailDistributionMetrics', financeQuarterMetricsName, financeQuarterMetricsPlannedValue, financeQuarterMetricsNameActualValue);            
                    }
                });   

             $http.get(REST_URL + '/getFinanceDataForVerticalQuarter/Financial & Services/' + selectedMonth)
                .success(function(response) {
                    if(response.success && response.result.length > 0) {
                        $scope.financeServiceQuarterMetrics = [];
                        var financeQuarterMetricsName = [];
                        var financeQuarterMetricsPlannedValue = [];
                        var financeQuarterMetricsNameActualValue = [];            
                        for(var obj in response.result[0].metrics) {
                            $scope.quarterMetrics = {};
                            financeQuarterMetricsName.push(obj);
                            financeQuarterMetricsPlannedValue.push(parseInt(response.result[0].metrics[obj][0].Plan));
                            financeQuarterMetricsNameActualValue.push(parseInt(response.result[0].metrics[obj][0].Actual));                

                            $scope.quarterMetrics.metricsName = obj;
                            $scope.quarterMetrics.Plan = response.result[0].metrics[obj][0].Plan;
                            $scope.quarterMetrics.Actual = response.result[0].metrics[obj][0].Actual;

                            $scope.financeServiceQuarterMetrics.push($scope.quarterMetrics);
                        }
                        loadFinanceMetricsForVerticalYTDGraph('Financial & Services - ' + selectedMonth, 'financialServicesMetrics', financeQuarterMetricsName, financeQuarterMetricsPlannedValue, financeQuarterMetricsNameActualValue);            
                    }
                });    
    }; 
}]);