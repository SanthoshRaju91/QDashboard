var app = angular.module('assignment', []);

app.constant('REST_URL', document.location.origin + '/api');

app.controller('assignmentController', ['$scope', '$http', 'REST_URL', function ($scope, $http, REST_URL) {
    $scope.departmentBillability = [];
    $http.get(REST_URL + '/getDates')
        .success(function (response) {
            if (response.success) {
                $scope.dates = response.result;
            } else {
                console.log("Error in getting the dates");
            }
        });

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

    
    function loadDepartmentBillabiltyGrap(departmentGroup, billableGroup, nonBillableGroup, max) {
        $scope.departmentConfig = {
            options: {
                chart: {
                    type: 'column',
                    width: 550
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
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y}</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                }
            },
            xAxis: {
                categories: departmentGroup,
                crosshair: true
            },
            yAxis: {
                min: 0,
                max: max,
                title: {
                    text: ''
                }
            },
            series: [{
                name: 'Billable',
                data: billableGroup

            }, {
                name: 'Non Billable',
                data: nonBillableGroup

            }]
        }
        
    }
    function loadDepartmentBillabiltyBasedOnLocation(departmentGroup, location, billableGroup, nonBillableGroup, max) {
        $scope.departmentLocationConfig = {
            options: {
                chart: {
                    type: 'column',
                    width: 550
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
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y}</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                }
            },
            xAxis: {
                categories: departmentGroup,
                crosshair: true
            },
            yAxis: {
                min: 0,
                max: max,
                title: {
                    text: ''
                }
            },
            series: [{
                name: 'Billable - ' + location,
                data: billableGroup

            }, {
                name: 'Non Billable - ' + location,
                data: nonBillableGroup

            }]
        }
        
    }
       function loadDepartmentBillabiltyBasedOnVertical(departmentGroup, vertical, billableGroup, nonBillableGroup, max) {
        $scope.departmentVerticalConfig = {
            options: {
                chart: {
                    type: 'column',
                    width: 550
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
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y}</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                }
            },
            xAxis: {
                categories: departmentGroup,
                crosshair: true
            },
            yAxis: {
                min: 0,
                max: max,
                title: {
                    text: ''
                }
            },
            series: [{
                name: 'Billable - ' + vertical,
                data: billableGroup

            }, {
                name: 'Non Billable - ' + vertical,
                data: nonBillableGroup

            }]
        }
        
    }
    
    
    $scope.selectDate = function (selectedDate) {
        var departmentBillability = [];      
        $http.get(REST_URL + '/getDepartmentBillability/' + selectedDate)
            .success(function (response) {
                if (response.success) {
                    if (response.result.length > 0) {
                           
                        for(var prop in response.result) {
                            var obj = {
                                department: response.result[prop].department,
                                Billable: response.result[prop].values[0].Billable || 0,
                                NonBillable: response.result[prop].values[0].NonBillable || 0
                            };
                            departmentBillability.push(obj);
                        }
                        $scope.departmentBillable = departmentBillability;
                        var departmentGroup = [];
                        var billableGroup = [];
                        var nonBillableGroup = [];
                        for(var obj in departmentBillability) {
                            departmentGroup.push(departmentBillability[obj].department);
                            billableGroup.push(departmentBillability[obj].Billable);
                            nonBillableGroup.push(departmentBillability[obj].NonBillable);
                            
                        }                    
                        loadDepartmentBillabiltyGrap(departmentGroup, billableGroup, nonBillableGroup, Math.max(...billableGroup));
                    }
                }
            });
        
        if($scope.selectedLocation) {
            $http.get(REST_URL + '/getDepartmentBillabilityBasedOnLocation/' + $scope.selectedDate + '/' + $scope.selectedLocation)
                .success(function (response) {
                    if (response.success) {
                    if (response.result.length > 0) {                    
                            var departmentBillabilityLocation = [];
                            for(var prop in response.result) {
                                var obj = {
                                    location: response.result[prop].location,
                                    department:response.result[prop].department,
                                    Billable: response.result[prop].values[0].Billable || 0,
                                    NonBillable: response.result[prop].values[0].NonBillable || 0
                                };
                                departmentBillabilityLocation.push(obj);
                            }                            
                            var departmentGroup = [];
                            var locationGroup=[];
                            var billableGroup = [];
                            var nonBillableGroup = [];
                            for(var obj in departmentBillabilityLocation) {
                                departmentGroup.push(departmentBillabilityLocation[obj].department);
                                locationGroup.push(departmentBillabilityLocation[obj].location);
                                billableGroup.push(departmentBillabilityLocation[obj].Billable);
                                nonBillableGroup.push(departmentBillabilityLocation[obj].NonBillable); 
                            }                                        
                            loadDepartmentBillabiltyBasedOnLocation(departmentGroup, $scope.selectedLocation, billableGroup, nonBillableGroup, Math.max(...billableGroup));
                        }
                    }
                });
            }
        if($scope.selectedVertical) {
            $http.get(REST_URL + '/getDepartmentBillabilityBasedOnVertical/' + $scope.selectedDate + '/' + $scope.selectedVertical)
                .success(function (response) {
                     if(response.success){
                        if(response.result.length > 0){
                            var departmentBillabilityVertical = [];
                            for(var prop in response.result){
                                var obj={
                                    vertical:response.result[prop].vertical,
                                    department:response.result[prop].department,
                                    Billable:response.result[prop].values[0].Billable || 0,
                                    NonBillable: response.result[prop].values[0].NonBillable || 0
                                };
                                departmentBillabilityVertical.push(obj);
                                var departmentGroup = [];
                                var verticalGroup = [];
                                var billableGroup =[];
                                var nonbillableGroup =[];
                                for(var obj in departmentBillabilityVertical){
                                    departmentGroup.push(departmentBillabilityVertical[obj].department);
                                    verticalGroup.push(departmentBillabilityVertical[obj].vertical);
                                    billableGroup.push(departmentBillabilityVertical[obj].Billable);
                                    nonbillableGroup.push(departmentBillabilityVertical[obj].NonBillable); 

                                }
                                 loadDepartmentBillabiltyBasedOnVertical(departmentGroup, $scope.selectedVertical, billableGroup, nonbillableGroup, Math.max(...billableGroup));
                            }
                        }
                    }
                }); 
        }
    }
    $scope.selectedLocations = function(selectedLocation){
        if($scope.selectedDate) {
            $http.get(REST_URL + '/getDepartmentBillabilityBasedOnLocation/' + $scope.selectedDate + '/' + selectedLocation)
                .success(function (response) {
                    if (response.success) {
                    if (response.result.length > 0) {                    
                            var departmentBillabilityLocation = [];
                            for(var prop in response.result) {
                                var obj = {
                                    location: response.result[prop].location,
                                    department:response.result[prop].department,
                                    Billable: response.result[prop].values[0].Billable || 0,
                                    NonBillable: response.result[prop].values[0].NonBillable || 0
                                };
                                departmentBillabilityLocation.push(obj);
                            }                            
                            var departmentGroup = [];
                            var locationGroup=[];
                            var billableGroup = [];
                            var nonBillableGroup = [];
                            for(var obj in departmentBillabilityLocation) {
                                departmentGroup.push(departmentBillabilityLocation[obj].department);
                                locationGroup.push(departmentBillabilityLocation[obj].location);
                                billableGroup.push(departmentBillabilityLocation[obj].Billable);
                                nonBillableGroup.push(departmentBillabilityLocation[obj].NonBillable); 
                            }                                        
                            loadDepartmentBillabiltyBasedOnLocation(departmentGroup, selectedLocation, billableGroup, nonBillableGroup, Math.max(...billableGroup));
                        }
                    }
                });
        } else {
            alert("Please select date as well");
        }             
    }
    $scope.selectedVerticals=function(selectedVertical){
        if($scope.selectedDate){
                $http.get(REST_URL + '/getDepartmentBillabilityBasedOnVertical/' + $scope.selectedDate + '/' +selectedVertical)
                .success(function (response) {
                     if(response.success){
                        if(response.result.length > 0){
                            var departmentBillabilityVertical = [];
                            for(var prop in response.result){
                                var obj={
                                    vertical:response.result[prop].vertical,
                                    department:response.result[prop].department,
                                    Billable:response.result[prop].values[0].Billable || 0,
                                    NonBillable: response.result[prop].values[0].NonBillable || 0
                                };
                                departmentBillabilityVertical.push(obj);
                                var departmentGroup = [];
                                var verticalGroup = [];
                                var billableGroup =[];
                                var nonbillableGroup =[];
                                for(var obj in departmentBillabilityVertical){
                                    departmentGroup.push(departmentBillabilityVertical[obj].department);
                                    verticalGroup.push(departmentBillabilityVertical[obj].vertical);
                                    billableGroup.push(departmentBillabilityVertical[obj].Billable);
                                    nonbillableGroup.push(departmentBillabilityVertical[obj].NonBillable); 

                                }
                                 loadDepartmentBillabiltyBasedOnVertical(departmentGroup, selectedVertical, billableGroup, nonbillableGroup, Math.max(...billableGroup));
                            }
                        }
                    }
                });               
        }else {
            alert("Please select date as well");
        }
    }
}]);