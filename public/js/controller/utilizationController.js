var app = angular.module('utilization', ["highcharts-ng", "angularjs-dropdown-multiselect"]);

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
        
        function loadLevelBillableLocGraph (levelMap, billableMap, nonBillableMap) {
            $scope.levelBillabilityLocTrend = {
                options: {
                    chart: {
                        type: 'column',
                        height: 300
                    },
                    credits: {
                               enabled: false
                              },
                    title: {
                        text: 'Level Billability based on location',
                        style: {
                            color: '#2c3e50',
                            fontSize:'13px'
                        },
                        x: -20
                    },
                    subtitle: {
                        text: '',
                        x: -20
                    },
                    tooltip: {
                        valueSuffix: ''
                    },
                    exporting: { enabled: false }
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
            
    function loadLevelBillableVerGraph (levelMap, billableMap, nonBillableMap) {
        $scope.levelBillabilityVerTrend = {
            options: {
                chart: {
                    type: 'column',
                    height: 300
                },
                credits: {
                           enabled: false
                          },
                title: {
                    text: 'Level billability based on vertical',
                    style: {
                        color: '#2c3e50',
                        fontSize:'13px'
                    },
                    x: -20
                },
                subtitle: {
                    text: '',
                    x: -20
                },
                tooltip: {
                    valueSuffix: ''
                },
                exporting: { enabled: false }
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

    function loadPracticeTrendGraph(practice, billable, nonBillable) {
        $scope.practiceBillabilityTrend = {
            options: {
                chart: {
                    type: 'column',
                    height: 300
                },
                credits: {
                           enabled: false
                          },
                title: {
                    text: 'Practice billability',
                    style: {
                        color: '#2c3e50',
                        fontSize:'13px'
                    },
                    x: -20
                },
                subtitle: {
                    text: '',
                    x: -20
                },
                tooltip: {
                    valueSuffix: ''
                },
                exporting: { enabled: false }
            },
            xAxis: {
                categories: practice
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
                data: billable
            }, {
                name: 'Non-Billable',
                data: nonBillable
            }]
        }
    };
    
    function loadPracticeLocationTrendGraph(practice, billable, nonBillable) {
        $scope.practiceBillabilityLocationTrend = {
            options: {
                chart: {
                    type: 'column',
                    height: 300
                },
                credits: {
                           enabled: false
                          },
                title: {
                    text: 'Practice billability Based on Location',
                    style: {
                        color: '#2c3e50',
                        fontSize:'13px'
                    },
                    x: -20
                },
                subtitle: {
                    text: '',
                    x: -20
                },
                tooltip: {
                    valueSuffix: ''
                },
                exporting: { enabled: false }
            },
            xAxis: {
                categories: practice
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
                data: billable
            }, {
                name: 'Non-Billable',
                data: nonBillable
            }]
        }
    };
    
    
    function loadPracticeVerticalTrendGraph(practice, billable, nonBillable) {
        $scope.practiceBillabilityVerticalTrend = {
            options: {
                chart: {
                    type: 'column',
                    height: 300
                },
                credits: {
                           enabled: false
                          },
                title: {
                    text: 'Practice billability Based On Vertical',
                    style: {
                        color: '#2c3e50',
                        fontSize:'13px'
                    },
                    x: -20
                },
                subtitle: {
                    text: '',
                    x: -20
                },
                tooltip: {
                    valueSuffix: ''
                },
                exporting: { enabled: false }
            },
            xAxis: {
                categories: practice
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
                data: billable
            }, {
                name: 'Non-Billable',
                data: nonBillable
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
     
     $scope.selectDate= function(selectedDate) {
        $scope.locationBillablity = [];
        $scope.verticalBillablity = [];
        $http.get(REST_URL+'/getlevelBillability/' + selectedDate)
            .success(function(response) {
                if(response.success) {                              
                    if(response.result.length > 0) {                        
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
            });
         
            if($scope.selectedVertical) {
                $http.get(REST_URL + '/getlevelBillabilityVertical/' + $scope.selectedDate + '/' + $scope.selectedVertical)
                    .success(function (response) {
                         if(response.success){
                            if(response.result.length > 0){
                                 var billabilty = response.result[response.result.length - 1];
                            var obj = {
                                "level": billabilty.level,
                                "billable": billabilty.values[0].Billable,
                                "nonBillable": billabilty.values[0].NonBillable
                            }
                            var levelArray = []; levelArray.push(obj.level);
                            var billableArray = []; billableArray.push(obj.billable);
                            var nonBillableArray = []; nonBillableArray.push(obj.nonBillable);
                            loadLevelBillableVerGraph(levelArray, billableArray, nonBillableArray);

                            }
                        }
                    });
                }
         
            if($scope.selectedLocation) {
                $http.get(REST_URL + '/getlevelBillabilityLocation/' + $scope.selectedDate + '/' + $scope.selectedLocation)
                    .success(function (response) {
                        if (response.success) {
                            if (response.result.length > 0) {                        
                                var billabilty = response.result[response.result.length - 1];
                                var obj = {
                                    "level": billabilty.level,
                                    "billable": billabilty.values[0].Billable,
                                    "nonBillable": billabilty.values[0].NonBillable
                                }
                                var levelArray = []; levelArray.push(obj.level);
                                var billableArray = []; billableArray.push(obj.billable);
                                var nonBillableArray = []; nonBillableArray.push(obj.nonBillable);
                                loadLevelBillableLocGraph(levelArray, billableArray, nonBillableArray);
                            }
                        }
                    });
            }
    }
     
     $scope.selectVertical=function(selectedVertical){
        if($scope.selectedDate){
                $http.get(REST_URL + '/getlevelBillabilityVertical/' + $scope.selectedDate + '/' +selectedVertical)
                .success(function (response) {
//                    console.log(response.result);
                     if(response.success){
                        if(response.result.length > 0){
                             var billabilty = response.result[response.result.length - 1];
                        var obj = {
                            "level": billabilty.level,
                            "billable": billabilty.values[0].Billable,
                            "nonBillable": billabilty.values[0].NonBillable
                        }
                        var levelArray = []; levelArray.push(obj.level);
                        var billableArray = []; billableArray.push(obj.billable);
                        var nonBillableArray = []; nonBillableArray.push(obj.nonBillable);
                        loadLevelBillableVerGraph(levelArray, billableArray, nonBillableArray);

                        }
                    }
                });               
        }else {
            alert("Please select date as well");
        }
    }
    
    $scope.selectLocation = function(selectedLocation){
        if($scope.selectedDate) {
            $http.get(REST_URL + '/getlevelBillabilityLocation/' + $scope.selectedDate + '/' + selectedLocation)
                .success(function (response) {
                    if (response.success) {
                    if (response.result.length > 0) {                        
                        var billabilty = response.result[response.result.length - 1];
                        var obj = {
                            "level": billabilty.level,
                            "billable": billabilty.values[0].Billable,
                            "nonBillable": billabilty.values[0].NonBillable
                        }
                        var levelArray = []; levelArray.push(obj.level);
                        var billableArray = []; billableArray.push(obj.billable);
                        var nonBillableArray = []; nonBillableArray.push(obj.nonBillable);
                        loadLevelBillableLocGraph(levelArray, billableArray, nonBillableArray);
                        }
                    }
                });
        } 
     else {
            alert("Please select date as well");
        }             
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
            console.log("level Billability---->"+JSON.stringify(response));
                if(response.success) {
                    if(response.result.length > 0) {                        
                        var billabilty = response.result[response.result.length - 1];
                        var obj = {
                            "level": billabilty.level,
                            "billable": billabilty.values[0].Billable,
                            "nonBillable": billabilty.values[0].NonBillable
                        }
                        $scope.selectedDate = response.result[0].week;
                        var levelArray = []; levelArray.push(obj.level);
                        var billableArray = []; billableArray.push(obj.billable);
                        var nonBillableArray = []; nonBillableArray.push(obj.nonBillable);
                        loadLevelBillableTrendGraph(levelArray, billableArray, nonBillableArray);
                    }
                }
            });
        $http.get(REST_URL + '/getlevelBillabilityLocation/'+'Bengaluru')
            .success(function(response) {
            console.log("location------>"+JSON.stringify(response));
                if(response.success) {
                    if(response.result.length > 0) {
                        var billabilty = response.result[0];
                        var obj = {
                            "level": billabilty.level,
                            "billable": billabilty.values[0].Billable,
                            "nonBillable": billabilty.values[0].NonBillable
                        }
                        $scope.selectedLocation = billabilty.location;
                        var levelArray = []; levelArray.push(obj.level);
                        var billableArray = []; billableArray.push(obj.billable);
                        var nonBillableArray = []; nonBillableArray.push(obj.nonBillable);
//                        console.log(levelArray + " " + billableArray + " " + nonBillableArray);
                        loadLevelBillableLocGraph(levelArray, billableArray, nonBillableArray);
                    }
                }
            });
        $http.get(REST_URL + '/getlevelBillabilityVertical/Retail & Distribution')
            .success(function(response) {
            console.log("Vertical---->"+JSON.stringify(response));
                if(response.success) {
                    if(response.result.length > 0) {
                        var billabilty = response.result[0];
                        var obj = {
                            "level": billabilty.level,
                            "billable": billabilty.values[0].Billable,
                            "nonBillable": billabilty.values[0].NonBillable
                        }
                        $scope.selectedVertical = billabilty.vertical;
                        var levelArray = []; levelArray.push(obj.level);
                        var billableArray = []; billableArray.push(obj.billable);
                        var nonBillableArray = []; nonBillableArray.push(obj.nonBillable);
                        loadLevelBillableVerGraph(levelArray, billableArray, nonBillableArray);
                    }
                }
            });

    
            $scope.practiceSelectDate = function (selectedDate) {
                $http.get(REST_URL + '/getPracticeBillability/' + selectedDate)
                       .success(function(response) {                
                        if(response.success) {
                            if(response.result.length > 0) {
                                $scope.practiceList = [];
                                var practiceArray = [];
                                var billableArray = [];
                                var nonBillableArray = [];
                                $scope.practiceListArray = []; 
                                $scope.selectedList = [];
                                $scope.practiceSelectedDate = response.result[0].week;                        
                                for(var i=0; i<response.result.length; i++) {
                                    $scope.practiceList.push({
                                        id: response.result[i].practice,
                                        label: response.result[i].practice
                                    });
                                    $scope.practiceListArray.push({
                                        practice: response.result[i].practice || 0,
                                        billable: response.result[i].values[0].Billable || 0,
                                        nonBillable: response.result[i].values[0].NonBillable || 0
                                    });
                                    practiceArray.push(response.result[i].practice || 0);
                                    billableArray.push(response.result[i].values[0].Billable || 0);
                                    nonBillableArray.push(response.result[i].values[0].NonBillable || 0);
                                }
                                loadPracticeTrendGraph(practiceArray, billableArray, nonBillableArray);
                            }
                        }
                    });
                
                        if($scope.practiceSelectedLocation){ 
                        $http.get(REST_URL + '/getLocationPracticeBillability/' + $scope.practiceSelectedDate + '/' + $scope.practiceSelectedLocation)
                               .success(function(response) {   
//                            console.log("Practice Selected Date"+response);
                                if(response.success) {
                                    if(response.result.length > 0) {
                                        $scope.practiceList = [];
                                        var practiceArray = [];
                                        var billableArray = [];
                                        var nonBillableArray = [];
                                        $scope.practiceListArray = []; 
                                        $scope.selectedList = [];
                                        $scope.practiceSelectedDate = response.result[0].week;                        
                                        for(var i=0; i<response.result.length; i++) {
                                            $scope.practiceList.push({
                                                id: response.result[i].practice,
                                                label: response.result[i].practice
                                            });
                                            $scope.practiceListArray.push({
                                                practice: response.result[i].practice || 0,
                                                billable: response.result[i].values[0].Billable || 0,
                                                nonBillable: response.result[i].values[0].NonBillable || 0
                                            });
                                            practiceArray.push(response.result[i].practice || 0);
                                            billableArray.push(response.result[i].values[0].Billable || 0);
                                            nonBillableArray.push(response.result[i].values[0].NonBillable || 0);
                                        }
                                        loadPracticeLocationTrendGraph(practiceArray, billableArray, nonBillableArray);
                                    }
                                }
                            });
                      }
                
                    if($scope.practiceSelectedVertical){ 
                        $http.get(REST_URL + '/getVerticalPracticeBillability/' + $scope.practiceSelectedDate + '/' + $scope.practiceSelectedVertical)
                               .success(function(response) {   
                            console.log("Practice Selected Date"+response);
                                if(response.success) {
                                    if(response.result.length > 0) {
                                        $scope.practiceList = [];
                                        var practiceArray = [];
                                        var billableArray = [];
                                        var nonBillableArray = [];
                                        $scope.practiceListArray = []; 
                                        $scope.selectedList = [];
                                        $scope.practiceSelectedDate = response.result[0].week;                        
                                        for(var i=0; i<response.result.length; i++) {
                                            $scope.practiceList.push({
                                                id: response.result[i].practice,
                                                label: response.result[i].practice
                                            });
                                            $scope.practiceListArray.push({
                                                practice: response.result[i].practice || 0,
                                                billable: response.result[i].values[0].Billable || 0,
                                                nonBillable: response.result[i].values[0].NonBillable || 0
                                            });
                                            practiceArray.push(response.result[i].practice || 0);
                                            billableArray.push(response.result[i].values[0].Billable || 0);
                                            nonBillableArray.push(response.result[i].values[0].NonBillable || 0);
                                        }
                                        loadPracticeVerticalTrendGraph(practiceArray, billableArray, nonBillableArray);
                                    }
                                }
                            });
                      }
            
            }  
            
            
            $scope.practiceSelectedLocations = function(prcticeSelectedLocation){
                if($scope.practiceSelectedDate){
                    $http.get(REST_URL + '/getLocationPracticeBillability/' + $scope.practiceSelectedDate + '/' + $scope.practiceSelectedLocation)
                               .success(function(response) {   
//                            console.log("Practice Selected Date"+response);
                                if(response.success) {
                                    if(response.result.length > 0) {
                                        $scope.practiceList = [];
                                        var practiceArray = [];
                                        var billableArray = [];
                                        var nonBillableArray = [];
                                        $scope.practiceListArrayOnLocation = []; 
                                        $scope.selectedList = [];
                                        $scope.practiceSelectedDate = response.result[0].week;                        
                                        for(var i=0; i<response.result.length; i++) {
                                            $scope.practiceList.push({
                                                id: response.result[i].practice,
                                                label: response.result[i].practice
                                            });
                                            $scope.practiceListArrayOnLocation.push({
                                                practice: response.result[i].practice || 0,
                                                billable: response.result[i].values[0].Billable || 0,
                                                nonBillable: response.result[i].values[0].NonBillable || 0
                                            });
                                            practiceArray.push(response.result[i].practice || 0);
                                            billableArray.push(response.result[i].values[0].Billable || 0);
                                            nonBillableArray.push(response.result[i].values[0].NonBillable || 0);
                                        }
                                        loadPracticeLocationTrendGraph(practiceArray, billableArray, nonBillableArray);
                                    }
                                }
                            });
                    
                }else{
                    alert("Select Date");
                }
            }
            
            
            $scope.practiceSelectedVerticals = function(practiceSelectedVertical){
                if($scope.practiceSelectedDate){
                    $http.get(REST_URL + '/getVerticalPracticeBillability/' + $scope.practiceSelectedDate + '/' + $scope.practiceSelectedVertical)
                               .success(function(response) {   
//                            console.log("Practice Selected Date"+response);
                                if(response.success) {
                                    if(response.result.length > 0) {
                                        $scope.practiceList = [];
                                        var practiceArray = [];
                                        var billableArray = [];
                                        var nonBillableArray = [];
                                        $scope.praticeListArrayOnVertical = []; 
                                        $scope.selectedList = [];
                                        $scope.practiceSelectedDate = response.result[0].week;                        
                                        for(var i=0; i<response.result.length; i++) {
                                            $scope.practiceList.push({
                                                id: response.result[i].practice,
                                                label: response.result[i].practice
                                            });
                                            $scope.praticeListArrayOnVertical.push({
                                                practice: response.result[i].practice || 0,
                                                billable: response.result[i].values[0].Billable || 0,
                                                nonBillable: response.result[i].values[0].NonBillable || 0
                                            });
                                            practiceArray.push(response.result[i].practice || 0);
                                            billableArray.push(response.result[i].values[0].Billable || 0);
                                            nonBillableArray.push(response.result[i].values[0].NonBillable || 0);
                                        }
                                        loadPracticeVerticalTrendGraph(practiceArray, billableArray, nonBillableArray);
                                    }
                                }
                            });
                    
                }else{
                    alert("Select Date");
                }
            }
    
         
                    
                //Practice Billability data   
                $http.get(REST_URL + '/getPracticeBillability')
                    .success(function(response) {
                        if(response.success) {
                            if(response.result.length > 0) {
                                $scope.practiceList = [];
                                var practiceArray = [];
                                var billableArray = [];
                                var nonBillableArray = [];
                                $scope.practiceListArray = []; 
                                $scope.practiceSelectedDate = response.result[0].week;                        
                                for(var i=0; i<response.result.length; i++) {
                                    $scope.practiceList.push({
                                        id: response.result[i].practice,
                                        label: response.result[i].practice
                                    });
                                    $scope.practiceListArray.push({
                                        practice: response.result[i].practice || 0,
                                        billable: response.result[i].values[0].Billable || 0,
                                        nonBillable: response.result[i].values[0].NonBillable || 0
                                    });
                                    practiceArray.push(response.result[i].practice || 0);
                                    billableArray.push(response.result[i].values[0].Billable || 0);
                                    nonBillableArray.push(response.result[i].values[0].NonBillable || 0);
                                }
                                loadPracticeTrendGraph(practiceArray, billableArray, nonBillableArray);
                            }
                        }
                    });
          
    
               $http.get(REST_URL + '/getLocationPracticeBillability/Bengaluru')
                    .success(function(response){
                   if(response.success){
                       if(response.result.length > 0){
                           $scope.practiceList = [];
                            var practiceArray = [];
                            var billableArray = [];
                            var nonBillableArray = [];
                            $scope.practiceListArrayOnLocation = []; 
                            $scope.selectedDate = response.result[0].week;                        
                            for(var i=0; i<response.result.length; i++) {
                                $scope.practiceList.push({
                                    id: response.result[i].practice,
                                    label: response.result[i].practice
                                });
                                $scope.practiceListArrayOnLocation.push({
                                    practice: response.result[i].practice || 0,
                                    billable: response.result[i].values[0].Billable || 0,
                                    nonBillable: response.result[i].values[0].NonBillable || 0
                                });
                                practiceArray.push(response.result[i].practice || 0);
                                billableArray.push(response.result[i].values[0].Billable || 0);
                                nonBillableArray.push(response.result[i].values[0].NonBillable || 0);
                            }
                            $scope.practiceSelectedLocation=response.result[0].location;
                            loadPracticeLocationTrendGraph(practiceArray, billableArray, nonBillableArray);
                       }
                   }
               });
    
    
             $http.get(REST_URL + '/getVerticalPracticeBillability/'+'Retail & Distribution')
                    .success(function(response){
                   if(response.success){
                       if(response.result.length > 0){
                           $scope.practiceList = [];
                            var practiceArray = [];
                            var billableArray = [];
                            var nonBillableArray = [];
                            $scope.praticeListArrayOnVertical = []; 
                            $scope.selectedDate = response.result[0].week;                        
                            for(var i=0; i<response.result.length; i++) {
                                $scope.practiceList.push({
                                    id: response.result[i].practice,
                                    label: response.result[i].practice
                                });
                                $scope.praticeListArrayOnVertical.push({
                                    practice: response.result[i].practice || 0,
                                    billable: response.result[i].values[0].Billable || 0,
                                    nonBillable: response.result[i].values[0].NonBillable || 0
                                });
                                practiceArray.push(response.result[i].practice || 0);
                                billableArray.push(response.result[i].values[0].Billable || 0);
                                nonBillableArray.push(response.result[i].values[0].NonBillable || 0);
                            }
                            console.log(response.result[0].vertical);                            
                            $scope.practiceSelectedVertical=response.result[0].vertical;
                            console.log($scope.practiceListArray.length + " " + practiceArray.length + " " + $scope.practiceList.length);
                            loadPracticeVerticalTrendGraph(practiceArray, billableArray, nonBillableArray);
                       }
                   }
               });  
    
    

    $scope.multiSelectSettings = {
        showCheckAll: false,
        showUncheckAll: true,
        scrollableHeight: '200px',
        scrollable: true        
    }
    
    // for dropdown
    $scope.selectedList = [];
    $scope.selectedListForLocation = [];
    $scope.selectedListForVertical = [];
    
    
    // $watch for whole pratice.
    $scope.$watch('selectedList',function(newVal, oldVal) {        
        var filtered = [];
                
        if(newVal == '') {            
            filtered = $scope.practiceListArray;
        } else {
            for(var i = 0; i < $scope.selectedList.length; i++) {
                var filter = _.filter($scope.practiceListArray, function(item) {
                    return item.practice.indexOf($scope.selectedList[i].id) != -1;                
                });
                filtered.push(filter[0]);
            }    
        }
                   
        var practiceArray = [];
        var billableArray = [];
        var nonBillableArray = [];
        for(var i =0; i < filtered.length; i++) {
            practiceArray.push(filtered[i].practice);
            billableArray.push(filtered[i].billable);
            nonBillableArray.push(filtered[i].nonBillable);               
        }
        if(filtered.length > 0) {
            loadPracticeTrendGraph(practiceArray, billableArray, nonBillableArray);           
        }       
    }, true); 
    
    
    //$watch only vertical practice.
    $scope.$watch('selectedListForVertical', function(newVal, oldVal) {
        var filtered = [];
        
        if(newVal == '') {            
            filtered = $scope.praticeListArrayOnVertical;
        } else {
            for(var i = 0; i < $scope.selectedListForVertical.length; i++) {
                var filter = _.filter($scope.praticeListArrayOnVertical, function(item) {
                    return item.practice.indexOf($scope.selectedListForVertical[i].id) != -1;                
                });
                filtered.push(filter[0]);
            }    
        }                   
        var practiceArray = [];
        var billableArray = [];
        var nonBillableArray = [];
        for(var i =0; i < filtered.length; i++) {
            practiceArray.push(filtered[i].practice);
            billableArray.push(filtered[i].billable);
            nonBillableArray.push(filtered[i].nonBillable);               
        }
        if(filtered.length > 0) {                        
            loadPracticeVerticalTrendGraph(practiceArray, billableArray, nonBillableArray);
        } 
    }, true);
    
    //$watch only location practice
    $scope.$watch('selectedListForLocation', function(newVal, oldVal) {
         var filtered = [];
        
        if(newVal == '') {            
            filtered = $scope.practiceListArrayOnLocation;
        } else {
            for(var i = 0; i < $scope.selectedListForLocation.length; i++) {
                var filter = _.filter($scope.practiceListArrayOnLocation, function(item) {
                    return item.practice.indexOf($scope.selectedListForLocation[i].id) != -1;                
                });
                filtered.push(filter[0]);
            }    
        }                   
        var practiceArray = [];
        var billableArray = [];
        var nonBillableArray = [];
        for(var i =0; i < filtered.length; i++) {
            practiceArray.push(filtered[i].practice);
            billableArray.push(filtered[i].billable);
            nonBillableArray.push(filtered[i].nonBillable);               
        }
        if(filtered.length > 0) {                        
            loadPracticeLocationTrendGraph(practiceArray, billableArray, nonBillableArray);
        } 
    }, true);
    
}]);