var app = angular.module('dashBoard', ["highcharts-ng"]);

app.constant('REST_URL', document.location.origin + '/api');

app.controller('dashboardController', ['$scope', '$http', 'REST_URL', function ($scope, $http, REST_URL) {
    //Overall Billability

    $scope.locationBillablity = [];
    $scope.verticalBillablity = [];

    function loadBillableData(billable, nonBillable) {
        console.log("Loaded with billable data");
        $scope.reportConfig = {
            options: {
                chart: {
                    type: 'pie',
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
                            formatter: function () {
                                return Math.round(this.percentage * 100) / 100 + ' %';
                            },
                            distance: -20,
                            color: 'Black'
                        }
                    },
                    pie: {
                        allowPointSelect: true,
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
                categories: 'month'
            },
            yAxis: {
                title: {
                    text: 'demo'
                }
            },
            series: [{
                name: 'Billable v/s Non-Billable',
                colorByPoint: false,
                data: [{
                    name: 'Billable',
                    y: billable,
                    color: '#3A539B'
                }, {
                    name: 'Non-Billable',
                    y: nonBillable,
                    color: '#EF4836'
                }]
            }]
        }

    };
    //Recent Billability in Bangalore
    function loadBillableDataBasedOnBangaloreLoc(base_location, billable, nonbillable) {
        console.log("Here " + base_location);
        $scope.bangConfig = {
            options: {
                chart: {
                    type: 'pie',
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
                            formatter: function () {
                                return Math.round(this.percentage * 100) / 100 + ' %';
                            },
                            distance: -20,
                            color: 'Black'
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
                categories: 'month'
            },
            yAxis: {
                title: {
                    text: 'demo'
                }
            },
            series: [{
                name: base_location,
                colorByPoint: true,
                data: [{
                    name: 'Billable',
                    y: billable,
                    color: '#03C9A9'
                }, {
                    name: 'Non-Billable',
                    y: nonbillable,
                    color: '#FDE3A7'
                }]
            }]
        }

    };
    //Recent Billability in Pune
    function loadBillableDataBasedOnPuneLoc(base_location, billable, nonbillable) {
        $scope.puneConfig = {
            options: {
                chart: {
                    type: 'pie',
                    //                      width: 400,
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
                            formatter: function () {
                                return Math.round(this.percentage * 100) / 100 + ' %';
                            },
                            distance: -20,
                            color: 'Black'
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
                categories: 'month'
            },
            yAxis: {
                title: {
                    text: 'demo'
                }
            },
            series: [{
                name: base_location,
                colorByPoint: true,
                data: [{
                    name: 'Billable',
                    y: billable,
                    color: '#03C9A9'
                }, {
                    name: 'Non-Billable',
                    y: nonbillable,
                    color: '#FDE3A7'
                }]
            }]
        }

    };
    //Recent Billability in London
    function loadBillableDataBasedOnLondonLoc(base_location, billable) {
        $scope.londonConfig = {
            options: {
                chart: {
                    type: 'pie',
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
                            formatter: function () {
                                return Math.round(this.percentage * 100) / 100 + ' %';
                            },
                            distance: -20,
                            color: 'Black'
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
                categories: 'month'
            },
            yAxis: {
                title: {
                    text: 'demo'
                }
            },
            series: [{
                name: base_location,
                colorByPoint: true,
                data: [{
                    name: 'Billable',
                    y: billable,
                    color: '#03C9A9'
                }]
            }]
        }

    };
    //Recent Billability in "Naperville"
    function loadBillableDataBasedOnNapervilleLoc(base_location, billable, nonbillable) {
        $scope.napervilleConfig = {
            options: {
                chart: {
                    type: 'pie',
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
                            formatter: function () {
                                return Math.round(this.percentage * 100) / 100 + ' %';
                            },
                            distance: -20,
                            color: 'Black'
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
                categories: 'month'
            },
            yAxis: {
                title: {
                    text: 'demo'
                }
            },
            series: [{
                name: base_location,
                colorByPoint: true,
                data: [{
                    name: 'Billable',
                    y: billable,
                    color: '#03C9A9'
                }, {
                    name: 'Non-Billable',
                    y: nonbillable,
                    color: '#FDE3A7'
                }]
            }]
        }

    };
    //Recent Billability in Mumbai
    function loadBillableDataBasedOnMumbaiLoc(base_location, billable, nonbillable) {
        $scope.mumbaiConfig = {
            options: {
                chart: {
                    type: 'pie',
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
                            formatter: function () {
                                return Math.round(this.percentage * 100) / 100 + ' %';
                            },
                            distance: -20,
                            color: 'Black'
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
                categories: 'month'
            },
            yAxis: {
                title: {
                    text: 'demo'
                }
            },
            series: [{
                name: base_location,
                colorByPoint: true,
                data: [{
                    name: 'Billable',
                    y: billable,
                    color: '#03C9A9'
                }, {
                    name: 'Non-Billable',
                    y: nonbillable,
                    color: '#FDE3A7'
                }]
            }]
        }

    };
    //Recent Billability in Hyderabad
    function loadBillableDataBasedOnHyderabadLoc(base_location, billable, nonbillable) {
        $scope.hyderabadConfig = {
            options: {
                chart: {
                    type: 'pie',
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
                            formatter: function () {
                                return Math.round(this.percentage * 100) / 100 + ' %';
                            },
                            distance: -20,
                            color: 'Black'
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
                categories: 'month'
            },
            yAxis: {
                title: {
                    text: 'demo'
                }
            },
            series: [{
                name: base_location,
                colorByPoint: true,
                data: [{
                    name: 'Billable',
                    y: billable,
                    color: '#03C9A9'
                }, {
                    name: 'Non-Billable',
                    y: nonbillable,
                    color: '#FDE3A7'
                }]
            }]
        }

    };
    //Vertical Retail and Distribution
    function loadBillableDataBasedOnRDVer(base_location, billable, nonbillable) {
        $scope.rdConfig = {
            options: {
                chart: {
                    type: 'pie',
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
                            formatter: function () {
                                return Math.round(this.percentage * 100) / 100 + ' %';
                            },
                            distance: -20,
                            color: 'Black'
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
                categories: 'month'
            },
            yAxis: {
                title: {
                    text: 'demo'
                }
            },
            series: [{
                name: base_location,
                colorByPoint: true,
                data: [{
                    name: 'Billable',
                    y: billable,
                    color: '#59ABE3'
                }, {
                    name: 'Non-Billable',
                    y: nonbillable,
                    color: '#6C7A89'
                }]
            }]
        }

    };

    function loadBillableDataBasedOnMSVer(base_location, billable, nonbillable) {
        $scope.msConfig = {
            options: {
                chart: {
                    type: 'pie',
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
                            formatter: function () {
                                return Math.round(this.percentage * 100) / 100 + ' %';
                            },
                            distance: -20,
                            color: 'Black'
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
                categories: 'month'
            },
            yAxis: {
                title: {
                    text: 'demo'
                }
            },
            series: [{
                name: base_location,
                colorByPoint: true,
                data: [{
                    name: 'Billable',
                    y: billable,
                    color: '#59ABE3'
                }, {
                    name: 'Non-Billable',
                    y: nonbillable,
                    color: '#6C7A89'
                }]
            }]
        }

    };

    function loadBillableDataBasedOnFSVer(base_location, billable, nonbillable) {
        $scope.fsConfig = {
            options: {
                chart: {
                    type: 'pie',
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
                            formatter: function () {
                                return Math.round(this.percentage * 100) / 100 + ' %';
                            },
                            distance: -20,
                            color: 'Black'
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
                categories: 'month'
            },
            yAxis: {
                title: {
                    text: 'demo'
                }
            },
            series: [{
                name: base_location,
                colorByPoint: true,
                data: [{
                    name: 'Billable',
                    y: billable,
                    color: '#59ABE3'
                }, {
                    name: 'Non-Billable',
                    y: nonbillable,
                    color: '#6C7A89'
                }]
            }]
        }

    };
    //OverAll Billability 

    $http.get(REST_URL + '/getDates')
        .success(function (response) {
            if (response.success) {
                $scope.dates = response.result;
                console.log($scope.dates);
            } else {
                console.log("Error in getting the dates");
            }
        })

    $scope.selectDate = function (selectedDate) {
        $scope.locationBillablity = [];
        $scope.verticalBillablity = [];
        $http.get(REST_URL + '/getBillability/' + selectedDate)
            .success(function (response) {
                if (response.success) {                    
                    if (response.result.length > 0) {                        
                        var billabilty = response.result[0].value[0];
                        loadBillableData(billabilty.Billable, billabilty.NonBillable);
                    }
                }
            });
        $http.get(REST_URL + '/getOverallBillabilityBasedOnLoc/Bengaluru/' + selectedDate)
            .success(function (response) {
                console.log(response.result[0]);
                if (response.success) {
                    if (response.result.length > 0) {
                        var billabilty = response.result[0].value[0];
                        var obj = {
                            "Location": response.result[0].base_location,
                            "Billable": billabilty.Billable || 0,
                            "NonBillable": billabilty.NonBillable || 0
                        };
                        $scope.locationBillablity.push(obj);
                        loadBillableDataBasedOnBangaloreLoc(response.result[0].base_location, billabilty.Billable, billabilty.NonBillable);
                    }
                }
            });
        $http.get(REST_URL + '/getOverallBillabilityBasedOnLoc/Pune/' + selectedDate)
            .success(function (response) {
                if (response.success) {
                    if (response.result.length > 0) {
                        var billabilty = response.result[0].value[0];
                        var obj = {
                            "Location": response.result[0].base_location,
                            "Billable": billabilty.Billable || 0,
                            "NonBillable": billabilty.NonBillable || 0
                        };
                        $scope.locationBillablity.push(obj);
                        loadBillableDataBasedOnPuneLoc(response.result[0].base_location, billabilty.Billable, billabilty.NonBillable);
                    }
                }
            });
        $http.get(REST_URL + '/getOverallBillabilityBasedOnLoc/London/' + selectedDate)
            .success(function (response) {
                if (response.success) {
                    if (response.result.length > 0) {
                        var billabilty = response.result[0].value[0];
                        var obj = {
                            "Location": response.result[0].base_location,
                            "Billable": billabilty.Billable || 0,
                            "NonBillable": billabilty.NonBillable || 0
                        };
                        $scope.locationBillablity.push(obj);
                        loadBillableDataBasedOnLondonLoc(response.result[0].base_location, billabilty.Billable, billabilty.NonBillable);
                    }
                }
            });
        $http.get(REST_URL + '/getOverallBillabilityBasedOnLoc/Naperville/' + selectedDate)
            .success(function (response) {
                if (response.success) {
                    if (response.result.length > 0) {
                        var billabilty = response.result[0].value[0];
                        var obj = {
                            "Location": response.result[0].base_location,
                            "Billable": billabilty.Billable || 0,
                            "NonBillable": billabilty.NonBillable || 0
                        };
                        $scope.locationBillablity.push(obj);
                        loadBillableDataBasedOnNapervilleLoc(response.result[0].base_location, billabilty.Billable, billabilty.NonBillable);
                    }
                }
            });
        $http.get(REST_URL + '/getOverallBillabilityBasedOnLoc/Mumbai/' + selectedDate)
            .success(function (response) {
                if (response.success) {
                    if (response.result.length > 0) {
                        var billabilty = response.result[0].value[0];
                        var obj = {
                            "Location": response.result[0].base_location,
                            "Billable": billabilty.Billable || 0,
                            "NonBillable": billabilty.NonBillable || 0
                        };
                        $scope.locationBillablity.push(obj);
                        loadBillableDataBasedOnMumbaiLoc(response.result[0].base_location, billabilty.Billable, billabilty.NonBillable);
                    }
                }
            });
        $http.get(REST_URL + '/getOverallBillabilityBasedOnLoc/Hyderabad/' + selectedDate)
            .success(function (response) {
                if (response.success) {
                    if (response.result.length > 0) {
                        var billabilty = response.result[0].value[0];
                        var obj = {
                            "Location": response.result[0].base_location,
                            "Billable": billabilty.Billable || 0,
                            "NonBillable": billabilty.NonBillable || 0
                        };
                        $scope.locationBillablity.push(obj);
                        loadBillableDataBasedOnHyderabadLoc(response.result[0].base_location, billabilty.Billable, billabilty.NonBillable);
                    }
                }
            });
        $http.get(REST_URL + '/getOverallBillabilityBasedOnVertical/Retail & Distribution/' + selectedDate)
            .success(function (response) {
                var billabilty = response.result[0].value[0];
                var obj = {
                    "Vertical": response.result[0].vertical,
                    "Billable": billabilty.Billable,
                    "NonBillable": billabilty.NonBillable
                }
                $scope.verticalBillablity.push(obj);
                loadBillableDataBasedOnRDVer(response.result[0].vertical, billabilty.Billable, billabilty.NonBillable);
            });

        $http.get(REST_URL + '/getOverallBillabilityBasedOnVertical/Financial Services/' + selectedDate)
            .success(function (response) {
                var billabilty = response.result[0].value[0];
                var obj = {
                    "Vertical": response.result[0].vertical,
                    "Billable": billabilty.Billable,
                    "NonBillable": billabilty.NonBillable
                }
                $scope.verticalBillablity.push(obj);
                loadBillableDataBasedOnFSVer(response.result[0].vertical, billabilty.Billable, billabilty.NonBillable);
            });

        $http.get(REST_URL + '/getOverallBillabilityBasedOnVertical/Manufacturing & Services/' + selectedDate)
            .success(function (response) {
                var billabilty = response.result[0].value[0];
                var obj = {
                    "Vertical": response.result[0].vertical,
                    "Billable": billabilty.Billable,
                    "NonBillable": billabilty.NonBillable
                }
                $scope.verticalBillablity.push(obj);
                loadBillableDataBasedOnMSVer(response.result[0].vertical, billabilty.Billable, billabilty.NonBillable);
            });

    }


    //Overall Billability
    $http.get(REST_URL + '/getBillability/')
        .success(function (response) {
            if (response.status == 200) {
                var billabilty = response.result[0].value[0];
                loadBillableData(billabilty.Billable, billabilty.NonBillable);
            }
        });

    //Recent Billability in Bangalore
    $http.get(REST_URL + '/getOverallBillabilityBasedOnLoc/Bengaluru')
        .success(function (response) {
            /*console.log("Not Here " + response.result[response.result.lenght -1]);*/
            var billabilty = response.result[response.result.length - 1];
            var obj = {
                "Location": billabilty.base_location,
                "Billable": billabilty.value[0].Billable || 0,
                "NonBillable": billabilty.value[0].NonBillable || 0
            };
            $scope.locationBillablity.push(obj);

            loadBillableDataBasedOnBangaloreLoc(billabilty.base_location, billabilty.value[0].Billable, billabilty.value[0].NonBillable);
        });
    //Recent Billability in Pune
    $http.get(REST_URL + '/getOverallBillabilityBasedOnLoc/Pune')
        .success(function (response) {
            var billabilty = response.result[response.result.length - 1];
            var obj = {
                "Location": billabilty.base_location,
                "Billable": billabilty.value[0].Billable || 0,
                "NonBillable": billabilty.value[0].NonBillable || 0
            };
            $scope.locationBillablity.push(obj);

            loadBillableDataBasedOnPuneLoc(billabilty.base_location, billabilty.value[0].Billable, billabilty.value[0].NonBillable);
        });
    //Recent Billability in London
    $http.get(REST_URL + '/getOverallBillabilityBasedOnLoc/London')
        .success(function (response) {
            var billabilty = response.result[response.result.length - 1];
            var obj = {
                "Location": billabilty.base_location,
                "Billable": billabilty.value[0].Billable || 0,
                "NonBillable": billabilty.value[0].NonBillable || 0
            };
            $scope.locationBillablity.push(obj);

            loadBillableDataBasedOnLondonLoc(billabilty.base_location, billabilty.value[0].Billable, billabilty.value[0].NonBillable);
        });
    //Recent Billability in Naperville
    $http.get(REST_URL + '/getOverallBillabilityBasedOnLoc/Naperville')
        .success(function (response) {
            var billabilty = response.result[response.result.length - 1];
            var obj = {
                "Location": billabilty.base_location,
                "Billable": billabilty.value[0].Billable || 0,
                "NonBillable": billabilty.value[0].NonBillable || 0
            };
            $scope.locationBillablity.push(obj);

            loadBillableDataBasedOnNapervilleLoc(billabilty.base_location, billabilty.value[0].Billable, billabilty.value[0].NonBillable);
        });
    //Recent Billability in Mumbai
    $http.get(REST_URL + '/getOverallBillabilityBasedOnLoc/Mumbai')
        .success(function (response) {
            var billabilty = response.result[response.result.length - 1];
            var obj = {
                "Location": billabilty.base_location,
                "Billable": billabilty.value[0].Billable || 0,
                "NonBillable": billabilty.value[0].NonBillable || 0
            };
            $scope.locationBillablity.push(obj);

            loadBillableDataBasedOnMumbaiLoc(billabilty.base_location, billabilty.value[0].Billable, billabilty.value[0].NonBillable);
        });
    //Recent Billability in Hyderabad
    $http.get(REST_URL + '/getOverallBillabilityBasedOnLoc/Hyderabad')
        .success(function (response) {
            var billabilty = response.result[response.result.length - 1];
            var obj = {
                "Location": billabilty.base_location,
                "Billable": billabilty.value[0].Billable || 0,
                "NonBillable": billabilty.value[0].NonBillable || 0
            };
            $scope.locationBillablity.push(obj);

            loadBillableDataBasedOnHyderabadLoc(billabilty.base_location, billabilty.value[0].Billable, billabilty.value[0].NonBillable);
        });

    //Recent Billability Based on Vertical Retail & Distribution
    $http.get(REST_URL + '/getOverallBillabilityBasedOnVertical/Retail & Distribution')
        .success(function (response) {
            var billabilty = response.result[response.result.length - 1];
            var obj = {
                "Vertical": billabilty.vertical,
                "Billable": billabilty.value[0].Billable,
                "NonBillable": billabilty.value[0].NonBillable
            }
            $scope.verticalBillablity.push(obj);
            loadBillableDataBasedOnRDVer(billabilty.vertical, billabilty.value[0].Billable, billabilty.value[0].NonBillable);
        });

    $http.get(REST_URL + '/getOverallBillabilityBasedOnVertical/Financial Services')
        .success(function (response) {
            var billabilty = response.result[response.result.length - 1];
            var obj = {
                "Vertical": billabilty.vertical,
                "Billable": billabilty.value[0].Billable,
                "NonBillable": billabilty.value[0].NonBillable
            }
            $scope.verticalBillablity.push(obj);
            loadBillableDataBasedOnFSVer(billabilty.vertical, billabilty.value[0].Billable, billabilty.value[0].NonBillable);
        });

    $http.get(REST_URL + '/getOverallBillabilityBasedOnVertical/Manufacturing & Services')
        .success(function (response) {
            var billabilty = response.result[response.result.length - 1];
            var obj = {
                "Vertical": billabilty.vertical,
                "Billable": billabilty.value[0].Billable,
                "NonBillable": billabilty.value[0].NonBillable
            }
            $scope.verticalBillablity.push(obj);
            loadBillableDataBasedOnMSVer(billabilty.vertical, billabilty.value[0].Billable, billabilty.value[0].NonBillable);
        });

}]);