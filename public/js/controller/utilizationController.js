var app = angular.module('utilization', ["highcharts-ng"]);

app.constant('REST_URL', document.location.origin + '/api');

app.controller('utilizationController', ['$scope', '$http','REST_URL', function($scope, $http,REST_URL) {
    

        $scope.locations = [
          {
              "value" : "Naperville",
              "text": "Naperville"
          },
          {
              "value" : "Mumbai",
              "text": "Mumbai"
          },
          {
              "value" : "Pune",
              "text": "Pune"
          },
          {
              "value" : "Bengaluru",
              "text": "Bengaluru"
          },
          {
              "value" : "Hyderabad",
              "text": "Hyderabad"
          },
          {
              "value" : "London",
              "text": "London"
          }
      ]
        $scope.verticals=[
            {
                "value" : "Retail & Distribution",
                "text":"Retail & Distribution"
            },
            {
                "value" : "Financial Services",
                "text":"Financial Services"
            },
            {
                "value":"Manufacturing & Services",
                "text":"Manufacturing & Services"        
            }
            
        ]

        function loadBillableVerticalTrendGraph (weeksMap, billableFinMap, billableManMap, billableRetMap) {
            $scope.billableVerticalTrend = {
                options: {
                    chart: {
                        type: 'line',
                        height: 300
                    },
                    credits: {
                               enabled: false
                              },
                    title: {
                        text: '',
                        x: -20
                    },
                    subtitle: {
                        text: '',
                        x: -20
                    },
                    tooltip: {
                        valueSuffix: ''
                    }
                },
                xAxis: {
                    categories: weeksMap
                },
                yAxis: {
                    title: {
                        text: 'Values'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                series: [{
                    name: 'Financial Services',
                    data: billableFinMap
                }, {
                    name: 'Manufacturing & Services',
                    data: billableManMap
                }, {
                    name: 'Retail & Distribution',
                    data: billableRetMap
                }]
            }
        };

        function loadNonBillableVerticalTrendGraph (weeksMap, nonBillableFinMap, nonBillableManMap, nonBillableRetMap) {
            $scope.nonBillableVerticalTrend = {
                options: {
                    chart: {
                        type: 'line',
                        height: 300
                    },
                    credits: {
                               enabled: false
                              },
                    title: {
                        text: '',
                        x: -20
                    },
                    subtitle: {
                        text: '',
                        x: -20
                    },
                    tooltip: {
                        valueSuffix: ''
                    }
                },
                xAxis: {
                    categories: weeksMap
                },
                yAxis: {
                    title: {
                        text: 'Values'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                series: [{
                    name: 'Financial Services',
                    data: nonBillableFinMap
                }, {
                    name: 'Manufacturing & Services',
                    data: nonBillableManMap
                }, {
                    name: 'Retail & Distribution',
                    data: nonBillableRetMap
                }]
            }
        };

        function loadLevelBillableTrendGraph (levelMap, billableMap, nonBillableMap) {
            $scope.levelBillabilityTrend = {
                options: {
                    chart: {
                        type: 'column',
                        height: 300
                    },
                    credits: {
                               enabled: false
                              },
                    title: {
                        text: '',
                        x: -20
                    },
                    subtitle: {
                        text: '',
                        x: -20
                    },
                    tooltip: {
                        valueSuffix: ''
                    }
                },
                xAxis: {
                    categories: levelMap
                },
                yAxis: {
                    title: {
                        text: 'Values'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                series: [{
                    name: 'Billable',
                    data: billableMap
                }, {
                    name: 'Non-Billable',
                    data: nonBillableMap
                }]
            }
        };

      $http.get(REST_URL + '/getDates')
        .success(function(response) {
            if(response.success) {
                $scope.dates = response.result;
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
     
     $http.get(REST_URL+'/getBillabilityTrend')
        .success(function(response) {
            if(response.success) { 
                if(response.result.length > 0) {                                              
                    var weeksMap = [];
                    var billableFinMap = [];
                    var nonBillableFinMap = [];
                    var billableManMap = [];
                    var nonBillableManMap = [];
                    var billableRetMap = [];
                    var nonBillableRetMap = [];
                    for(var i=0; i< response.result.length; i++) {
                        weeksMap.push(response.result[i].week);
                        for(var prop in response.result[i].data) {
                            if(response.result[i].data[prop][0].vertical == 'Financial Services') {
                                billableFinMap.push(response.result[i].data[prop][0].values[0].Billable || 0);
                                nonBillableFinMap.push(response.result[i].data[prop][0].values[0].NonBillable || 0);
                            } else if(response.result[i].data[prop][0].vertical == 'Manufacturing & Services') {
                                billableManMap.push(response.result[i].data[prop][0].values[0].Billable || 0);
                                nonBillableManMap.push(response.result[i].data[prop][0].values[0].NonBillable || 0);
                            } else if(response.result[i].data[prop][0].vertical == 'Retail & Distribution') {
                                billableRetMap.push(response.result[i].data[prop][0].values[0].Billable || 0);
                                nonBillableRetMap.push(response.result[i].data[prop][0].values[0].NonBillable || 0);
                            }
                        }
                    }
                    loadBillableVerticalTrendGraph(weeksMap, billableFinMap, billableManMap, billableRetMap);
                    loadNonBillableVerticalTrendGraph(weeksMap, nonBillableFinMap, nonBillableManMap, nonBillableRetMap);                    
                }                
            }
        });

        $http.get(REST_URL + '/getlevelBillability')
            .success(function(response) {
                if(response.success) {
                    if(response.result.length > 0) {
                        console.log("Response " + JSON.stringify(response.result));
                        var billabilty = response.result[response.result.length - 1];
                        var obj = {
                            "level": billabilty.level,
                            "billable": billabilty.values[0].Billable,
                            "nonBillable": billabilty.values[0].NonBillable
                        }
                        var levelArray = []; levelArray.push(obj.level);
                        var billableArray = []; billableArray.push(obj.billable);
                        var nonBillableArray = []; nonBillableArray.push(obj.nonBillable);
                        loadLevelBillableTrendGraph(levelArray, billableArray, nonBillableArray);
                    }
                }
            })
}]);