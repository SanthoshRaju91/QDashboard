var xlsxj = require("xlsx-to-json");
var mongoose = require('mongoose');
var _ = require('underscore');
var config = require('../config.js');
var fs = require('fs');

//connecting to mongodb
mongoose.connect(config.dbConnectionURL, function(err){
    if(err) console.error("Error in connecting to mongo DB" + err); 
    else console.info("Connected to MongoDB");
}); 


var OverBillability = require('../models/overallBillability.js');
var OverBillabilityBasedOnLocation = require('../models/overallBillabilityBasedOnLocationModel.js');
var OverBillabilityBasedOnVertical = require('../models/overallBillabilityBasedOnVerticalModel.js');
var OverBillabilityBasedOnVerticalAndLocation = require('../models/overallBillabilityBasedOnVertAndLocModel.js');

var LevelBillability = require('../models/levelBillability.js');
var LevelBillabilityBasedOnLoc = require('../models/levelBillabilityBasedOnLoc.js');
var LevelBillabilityBasedOnVertical = require('../models/levelBillabilityBasedOnVertical.js');
var LevelBillabilityBasedOnLocationAndVertical = require('../models/levelBillabilityBasedOnLocAndVer.js');

var DepartmentBillability = require('../models/departmentBillability.js');
var DepartmentBillabilityBasedOnLocation = require('../models/departmentBillabilityBasedOnLocation.js');
var DepartmentBillabilityBasedOnVertical = require('../models/departmentBillabilityBasedOnVertical.js')
var OverallBillabilityTrendOnVertical = require('../models/overallBillabilityTrendOnVertical.js');

var PracticeBillability = require('../models/practiceBillability.js');
var PracticeBillabilityBasedOnLocation = require('../models/practiceBillabilityBasedOnLocation.js');
var PracticeBillabilityBasedOnVertical = require('../models/practiceBillabilityBasedOnVertical.js');

//Parsing the given excel file
exports.parseBillabilityData = function (filename) {
    xlsxj({
        input: config.excelPath + filename,
        output: "output.json"
    }, function (err, result) {
        if (err) {
            console.error(err);
        } else {
            loadData(JSON.stringify(result));
            loadDataForLocation(JSON.stringify(result));
            loadDataForVertical(JSON.stringify(result));
            loadDataForVerticalAndLocation(JSON.stringify(result));
            processLevelData(JSON.stringify(result));
            processLevelAndLocationData(JSON.stringify(result));
            processLevelAndVerticalData(JSON.stringify(result));
            processLevelBasedOnLocationAndVerticalData(JSON.stringify(result));
            processDepartment(JSON.stringify(resulet));
            processDepartmentBasedOnLocation(JSON.stringify(result));
            processDepartmentBasedOnVertical(JSON.stringify(result));
            processBillabilityTrendOnVertical(JSON.stringify(result));
            processPracticeData(JSON.stringify(result));
            processPracticeBasedOnLocation(JSON.stringify(result));
            processPracticeBasedOnVertical(JSON.stringify(result));
        }
    });
}


//Loading data for overall billable and non-billable
function loadData(result) {
    var grouped = _.groupBy(JSON.parse(result), 'Week');
    var groupedData = _.map(grouped, function (current) {
        return {
            week: current[0].Week,
            values: current
        };
    });
    var computedResult = _.map(groupedData, function (current) {
        var counted = _.countBy(current.values, function (object) {
            return object['BILLABLE'] == 'Billable' ? 'Billable' : 'NonBillable'
        });
        return {
            date: new Date(Date.parse(current.week)),
            week: current.week,
            values: counted
        };
    });    
    loadDataToMongo(computedResult);
}

//Loading data for billable and non-billable based on location
function loadDataForLocation(result) {
    var grouped = _.groupBy(JSON.parse(result), 'Week');
    var groupedData = _.map(grouped, function (current) {
        return {
            week: current[0].Week,
            values: current
        };
    });

    var locationMap = [];
    var location = _.map(groupedData, function (current) {
        var locationGrouped = _.groupBy(current.values, 'BASE_LOCATION');

        _.each(locationGrouped, function (object) {
            locationMap.push({
                week: object[0].Week,
                location: object[0].BASE_LOCATION,
                values: _.countBy(object, function (temp) {
                    return temp['BILLABLE'] == 'Billable' ? 'Billable' : 'NonBillable'
                })
            });

        });
    });
    loadLocationDataToMongo(locationMap);
}

//Loading data for billable and non-billable based on vertical
function loadDataForVertical(result) {
    var grouped = _.groupBy(JSON.parse(result), 'Week');
    var groupedData = _.map(grouped, function (current) {
        return {
            week: current[0].Week,
            values: current
        };
    });


    var verticalMap = [];
    var vertical = _.map(groupedData, function (current) {
        var verticalGrouped = _.groupBy(current.values, 'PROJECT_BG');
        _.each(verticalGrouped, function (object) {
            verticalMap.push({
                week: object[0].Week,
                vertical: object[0].PROJECT_BG,
                values: _.countBy(object, function (object) {
                    return object['BILLABLE'] == 'Billable' ? 'Billable' : 'NonBillable'
                })
            });
        });
    });
    loadVerticalDataToMongo(verticalMap);
}

//Loading data for billable and non-billable based on vertical and location
function loadDataForVerticalAndLocation(result) {
    var grouped = _.groupBy(JSON.parse(result), 'Week');
    var groupedData = _.map(grouped, function (current) {
        return {
            week: current[0].Week,
            values: current
        };
    });

    var verticalMap = [];
    var vertical = _.map(groupedData, function (current) {
        var verticalGrouped = _.groupBy(current.values, 'PROJECT_BG');
        _.each(verticalGrouped, function (object) {
            verticalMap.push({
                week: object[0].Week,
                vertical: object[0].PROJECT_BG,
                values: object
            });
        });
    });

    var locationVerticalMap = [];
    var location = _.map(verticalMap, function (current) {
        var locationGrouped = _.groupBy(current.values, 'BASE_LOCATION');
        _.each(locationGrouped, function (object) {
            locationVerticalMap.push({
                week: object[0].Week,
                vertical: object[0].PROJECT_BG,
                base_location: object[0].BASE_LOCATION,
                values: _.countBy(object, function (object) {
                    return object['BILLABLE'] == 'Billable' ? 'Billable' : 'NonBillable'
                })
            })
        });
    });
    loadVerticalAndLocationDataToMongo(locationVerticalMap);
}

function processLevelData(result) {
    var grouped = _.groupBy(JSON.parse(result), 'Week');
    var groupedData = _.map(grouped, function (current) {
        return {
            week: current[0].Week,
            values: current
        }
    });

    var levelMap = [];
    var level = _.map(groupedData, function (current) {
        var levelGrouped = _.groupBy(current.values, 'LVL');
        _.each(levelGrouped, function (object) {
            levelMap.push({
                date: new Date(Date.parse(object[0].Week)),
                week: object[0].Week,
                level: object[0].LVL,
                values: _.countBy(object, function (object) {
                    return object['BILLABLE'] == 'Billable' ? 'Billable' : 'NonBillable'
                })
            })
        });
    });
    loadLevelDataToMongo(levelMap);
}

function processLevelAndLocationData(result) {
    var grouped = _.groupBy(JSON.parse(result), 'Week');
    var groupedData = _.map(grouped, function (current) {
        return {
            week: current[0].Week,
            values: current
        }
    });

    var levelMap = [];
    _.map(groupedData, function (current) {
        var levelGrouped = _.groupBy(current.values, 'LVL');
        _.each(levelGrouped, function (object) {
            levelMap.push({
                week: object[0].Week,
                level: object[0].LVL,
                values: object
            });
        });
    });

    var locationLevelMap = [];
    _.map(groupedData, function (current) {
        var locationGrouped = _.groupBy(current.values, 'BASE_LOCATION');
        _.each(locationGrouped, function (object) {
            locationLevelMap.push({
                date: new Date(Date.parse(object[0].Week)),
                week: object[0].Week,
                level: object[0].LVL,
                location: object[0].BASE_LOCATION,
                values: _.countBy(object, function (object) {
                    return object['BILLABLE'] == 'Billable' ? 'Billable' : 'NonBillable'
                })
            });
        });
    })

    loadLevelLocationDataToMongo(locationLevelMap);
}


function processLevelAndVerticalData(result) {
    var grouped = _.groupBy(JSON.parse(result), 'Week');
    var groupedData = _.map(grouped, function (current) {
        return {
            week: current[0].Week,
            values: current
        }
    });

    var levelMap = [];
    _.map(groupedData, function (current) {
        var levelGrouped = _.groupBy(current.values, 'LVL');
        _.each(levelGrouped, function (object) {
            levelMap.push({
                week: object[0].Week,
                level: object[0].LVL,
                values: object
            });
        });
    });

    var verticalLevelMap = [];
    _.map(groupedData, function (current) {
        var verticalGrouped = _.groupBy(current.values, 'PROJECT_BG');
        _.each(verticalGrouped, function (object) {
            verticalLevelMap.push({
                date: new Date(Date.parse(object[0].Week)),
                week: object[0].Week,
                level: object[0].LVL,
                vertical: object[0].PROJECT_BG,
                values: _.countBy(object, function (object) {
                    return object['BILLABLE'] == 'Billable' ? 'Billable' : 'NonBillable'
                })
            });
        });
    });

    loadLevelVerticalDataToMongo(verticalLevelMap);
}


function processLevelBasedOnLocationAndVerticalData(result) {
    var grouped = _.groupBy(JSON.parse(result), 'Week');
    var groupedData = _.map(grouped, function (current) {
        return {
            week: current[0].Week,
            values: current
        }
    });

    var levelMap = [];
    _.map(groupedData, function (current) {
        var levelGrouped = _.groupBy(current.values, 'LVL');
        _.each(levelGrouped, function (object) {
            levelMap.push({
                week: object[0].Week,
                level: object[0].LVL,
                values: object
            });
        });
    });

    var levelLocationMap = [];
    _.map(levelMap, function (current) {
        var locationMap = _.groupBy(current.values, 'BASE_LOCATION');
        _.each(locationMap, function (object) {
            levelLocationMap.push({
                week: object[0].Week,
                level: object[0].LVL,
                location: object[0].BASE_LOCATION,
                values: object
            });
        });
    });

    var levelLocationVerticalMap = [];
    _.map(levelLocationMap, function (current) {
        var verticalMap = _.groupBy(current.values, 'PROJECT_BG');
        _.each(verticalMap, function (object) {
            levelLocationVerticalMap.push({
                date: new Date(Date.parse(object[0].Week)),
                week: object[0].Week,
                level: object[0].LVL,
                location: object[0].BASE_LOCATION,
                vertical: object[0].PROJECT_BG,
                values: _.countBy(object, function (object) {
                    return object['BILLABLE'] == 'Billable' ? 'Billable' : 'NonBillable'
                })
            });
        });
    });

    loadLevelOnLocationAndVerticalToMongo(levelLocationVerticalMap);
}

function processDepartment(result) {
    var grouped = _.groupBy(JSON.parse(result), 'Week');
    var groupedData = _.map(grouped, function (current) {
        return {
            week: current[0].Week,
            values: current
        }
    });

    var departmentMap = [];
    _.map(groupedData, function (current) {
        var departmentGrouped = _.groupBy(current.values, 'DEPARTMENT');
        _.each(departmentGrouped, function (object) {
            departmentMap.push({
                date: new Date(Date.parse(current.week)),
                week: object[0].Week,
                department: object[0].DEPARTMENT,
                values: _.countBy(object, function (object) {
                    return object['BILLABLE'] == 'Billable' ? 'Billable' : 'NonBillable'
                })
            });
        });
    });

    loadDepartmentOnDateToMongo(departmentMap);
}

function processDepartmentBasedOnLocation(result) {
    var grouped = _.groupBy(JSON.parse(result), 'Week');
    var groupedData = _.map(grouped, function (current) {
        return {
            week: current[0].Week,
            values: current
        }
    });

    var departmentMap = [];
    _.map(groupedData, function (current) {
        var departmentGrouped = _.groupBy(current.values, 'DEPARTMENT');
        _.each(departmentGrouped, function (object) {
            departmentMap.push({
                week: object[0].Week,
                department: object[0].DEPARTMENT,
                values: object
            });
        });
    });

    var departmentLocationMap = [];
    _.map(departmentMap, function (current) {
        var departmentLocationGrouped = _.groupBy(current.values, 'BASE_LOCATION');
        _.each(departmentLocationGrouped, function (object) {
            departmentLocationMap.push({
                date: new Date(Date.parse(object[0].Week)),
                week: object[0].Week,
                department: object[0].DEPARTMENT,
                location: object[0].BASE_LOCATION,
                values: _.countBy(object, function (object) {
                    return object['BILLABLE'] == 'Billable' ? 'Billable' : 'NonBillable'
                })
            });
        });
    });

    loadDepartmentOnDateLocationToMongo(departmentLocationMap);
}

function processBillabilityTrendOnVertical(result) {
    var grouped = _.groupBy(JSON.parse(result), 'Week');
    var groupedData = _.map(grouped, function(current) {
        return { 
            week: current[0].Week,
            values: current
        }  
    });
    
    var verticalTrendMap = [];
    _.each(groupedData, function(current) {
        var vertical = {};
        vertical.week = current.week;

        var verticalGrouped = _.groupBy(current.values, 'PROJECT_BG');
        var verticalMap = _.map(verticalGrouped, function(object) {
            return {
                vertical: object[0].PROJECT_BG,
                values: _.countBy(object, function(objectMap) {
                        return objectMap['BILLABLE'] == 'Billable' ? 'Billable' : 'NonBillable';
                    })
            }
        });
        vertical.data = verticalMap;
        verticalTrendMap.push(vertical);
    });
    loadVerticalBillabilityTrendToMongo(verticalTrendMap);
}

//Department based on vertiacl
function processDepartmentBasedOnVertical(result) {
    var grouped = _.groupBy(JSON.parse(result), 'Week'); //the week data is stored in array format
    var groupedData = _.map(grouped, function (current) {
        return {
            week: current[0].Week,
            values: current
        }
    });
    var departmentMap = [];
    _.map(groupedData, function (current) {
        var departmentGrouped = _.groupBy(current.values, 'DEPARTMENT');
        _.each(departmentGrouped, function (object) {
            departmentMap.push({
                week: object[0].Week,
                department: object[0].DEPARTMENT,
                values: object
            });
        });
    });
    var departmentVerticalMap = [];
    _.map(departmentMap, function (current) {
        var departmentVerticalGrouped = _.groupBy(current.values, 'PROJECT_BG');
        _.each(departmentVerticalGrouped, function (object) {
            departmentVerticalMap.push({
                date: new Date(Date.parse(object[0].Week)),
                week: object[0].Week,
                department: object[0].DEPARTMENT,
                vertical: object[0].PROJECT_BG,
                values: _.countBy(object, function (object) {
                    return object['BILLABLE'] == 'Billable' ? 'Billable' : 'NonBillable'
                })
            });
        });
    });
    loadDepartmentOnDateVerticalToMongo(departmentVerticalMap);
}

// processing practice billability date
function processPracticeData(result) {
    var grouped = _.groupBy(JSON.parse(result), 'Week');
    var groupedData = _.map(grouped, function(current) {
        return {
            week: current[0].Week,
            values: current
        }
    });

    var practiceMap = [];
    _.map(groupedData, function (current) {
        var practiceGrouped = _.groupBy(current.values, 'PRACTICE');
        _.each(practiceGrouped, function (object) {
            practiceMap.push({
                date: new Date(Date.parse(object[0].Week)),
                week: object[0].Week,
                practice: object[0].PRACTICE,
                values: _.countBy(object, function(currObject) {
                    return currObject['BILLABLE'] == 'Billable' ? 'Billable' : 'NonBillable'
                })
            });
        });
    });

    loadPracticeToMongo(practiceMap);
}

function processPracticeBasedOnLocation(result) {
    var grouped = _.groupBy(JSON.parse(result), 'Week');
    var groupedData = _.map(grouped, function(current) {
        return {
            week: current[0].Week,
            values: current
        }
    });

    var practiceMap = [];
    _.map(groupedData, function (current) {
        var practiceGrouped = _.groupBy(current.values, 'PRACTICE');
        _.each(practiceGrouped, function(object) {
            practiceMap.push({
                week: object[0].Week,
                practice: object[0].PRACTICE,
                values: object
            });
        });
    });

    var practiceLocationMap = [];
    _.map(practiceMap, function (current) {
        var practiceLocationGrouped = _.groupBy(current.values, 'BASE_LOCATION');
        _.each(practiceLocationGrouped, function (object) {
            practiceLocationMap.push({
                date: new Date(Date.parse(object[0].Week)),
                week: object[0].Week,
                practice: object[0].PRACTICE,
                location: object[0].BASE_LOCATION,
                values: _.countBy(object, function (objectVal) {
                    return objectVal['BILLABLE'] == 'Billable' ? 'Billable' : 'NonBillable';
                })            
            });
        });
    });

    loadPracticeLocationToMongo(practiceLocationMap);
}

function processPracticeBasedOnVertical(result) {
    var grouped = _.groupBy(JSON.parse(result), 'Week');
    var groupedData = _.map(grouped, function (current) {
        return {
            week: current.Week,
            values: current
        }
    });

    var practiceMap = [];
    _.map(groupedData, function (current) {
        var practiceGrouped = _.groupBy(current.values, 'PRACTICE');
        _.each(practiceGrouped, function (object) {
            practiceMap.push({
                week: object[0].Week,
                practice: object[0].PRACTICE,
                values: object
            });
        });
    });

    var practiceVerticalMap = [];
    _.map(practiceMap, function (current) {
        var practiceVerticalGrouped = _.groupBy(current.values, 'PROJECT_BG');
        _.each(practiceVerticalGrouped, function (object) {
            practiceVerticalMap.push({
                date: new Date(Date.parse(object[0].Week)),
                week: object[0].Week,
                practice: object[0].PRACTICE,
                vertical: object[0].PROJECT_BG,
                values: _.countBy(object, function (objectVal) {
                    return objectVal['BILLABLE'] == 'Billable' ? 'Billable' : 'NonBillable';
                })
            })
        });
    });

    loadPracticeVerticalToMongo(practiceVerticalMap);
}

//loading overall billing and non billing json to mongodb
function loadDataToMongo(inputResultToStore) {
    OverBillability.remove({}, function (err) {
        if (err) {
            console.error("Error in removing data " + err);
        } else {
            for (var i = 0; i < inputResultToStore.length; i++) {
                var overBillability = new OverBillability({
                    date: inputResultToStore[i].date,
                    week: inputResultToStore[i].week,
                    value: inputResultToStore[i].values
                });

                overBillability.save(function (err) {
                    if (err) {
                        console.error("Error in inserting " + err);
                    } else {
                        console.info("Inserted successfully");
                    }
                });
            }
        }

    });
}


//loading location json to mongoDb
function loadLocationDataToMongo(inputResultToStore) {
    OverBillabilityBasedOnLocation.remove({}, function (err) {
        if (err) {
            console.error("Error in removing data " + err);
        } else {
            for (var i = 0; i < inputResultToStore.length; i++) {
                var overBillabilityBasedOnLocation = new OverBillabilityBasedOnLocation({
                    week: inputResultToStore[i].week,
                    base_location: inputResultToStore[i].location,
                    value: inputResultToStore[i].values
                });

                overBillabilityBasedOnLocation.save(function (err) {
                    if (err) {
                        console.error("Error in inserting " + err);
                    } else {
                        console.info("Inserted successfully");
                    }
                });
            }
        }
    });
}

//loading vertical json to mongoDb
function loadVerticalDataToMongo(inputResultToStore) {
    OverBillabilityBasedOnVertical.remove({}, function (err) {
        if (err) {
            console.error("Error in removing data " + err);
        } else {
            for (var i = 0; i < inputResultToStore.length; i++) {
                var overBillabilityBasedOnVertical = new OverBillabilityBasedOnVertical({
                    week: inputResultToStore[i].week,
                    vertical: inputResultToStore[i].vertical,
                    value: inputResultToStore[i].values
                });

                overBillabilityBasedOnVertical.save(function (err) {
                    if (err) {
                        console.error("Error in inserting " + err);
                    } else {
                        console.info("Inserted successfully");
                    }
                });
            }
        }
    });
}


//loading vertical and location json to mongoDb
function loadVerticalAndLocationDataToMongo(inputResultToStore) {
    OverBillabilityBasedOnVerticalAndLocation.remove({}, function (err) {
        if (err) {
            console.error("OverBillabilityBasedOnVerticalAndLocation : Error in removing data " + err);
        } else {
            for (var i = 0; i < inputResultToStore.length; i++) {
                var overBillabilityBasedOnVerticalAndLocation = new OverBillabilityBasedOnVerticalAndLocation({
                    week: inputResultToStore[i].week,
                    vertical: inputResultToStore[i].vertical,
                    location: inputResultToStore[i].base_location,
                    value: inputResultToStore[i].values
                });

                overBillabilityBasedOnVerticalAndLocation.save(function (err) {
                    if (err) {
                        console.error("OverBillabilityBasedOnVerticalAndLocation : Error in inserting " + err);
                    } else {
                        console.info("OverBillabilityBasedOnVerticalAndLocation : inserted successfully");
                    }
                });
            }
        }
    });
}


function loadLevelDataToMongo(inputResultToStore) {
    LevelBillability.remove({}, function (err) {
        if (err) {
            console.log("LevelBillability : Error in removing data " + err);
        } else {
            for (var i = 0; i < inputResultToStore.length; i++) {
                var levelBillability = new LevelBillability({
                    date: inputResultToStore[i].date,
                    week: inputResultToStore[i].week,
                    level: inputResultToStore[i].level,
                    values: inputResultToStore[i].values
                });

                levelBillability.save(function (err) {
                    if (err) {
                        console.error("LevelBillability : Error in inserting " + err);
                    } else {
                        console.log("LevelBillability : inserted successfully");
                    }
                });
            }
        }
    });
}

function loadLevelLocationDataToMongo(inputResultToStore) {
    LevelBillabilityBasedOnLoc.remove({}, function (err) {
        if (err) {
            console.log("LevelBillabilityBasedOnLoc : Error in removing data " + err);
        } else {
            for (var i = 0; i < inputResultToStore.length; i++) {
                var levelBillabilityBasedOnLoc = new LevelBillabilityBasedOnLoc({
                    date: inputResultToStore[i].date,
                    week: inputResultToStore[i].week,
                    level: inputResultToStore[i].level,
                    location: inputResultToStore[i].location,
                    values: inputResultToStore[i].values
                });

                levelBillabilityBasedOnLoc.save(function (err) {
                    if (err) {
                        console.error("LevelBillabilityBasedOnLoc : Error in inserting " + err);
                    } else {
                        console.log("LevelBillabilityBasedOnLoc : inserted successfully");
                    }
                });
            }
        }
    });
}

function loadLevelVerticalDataToMongo(inputResultToStore) {
    LevelBillabilityBasedOnVertical.remove({}, function (err) {
        if (err) {
            console.log("LevelBillabilityBasedOnVertical: Error in removing data " + err);
        } else {
            for (var i = 0; i < inputResultToStore.length; i++) {
                var levelBillabilityBasedOnVertical = new LevelBillabilityBasedOnVertical({
                    date: inputResultToStore[i].date,
                    week: inputResultToStore[i].week,
                    level: inputResultToStore[i].level,
                    vertical: inputResultToStore[i].vertical,
                    values: inputResultToStore[i].values
                });

                levelBillabilityBasedOnVertical.save(function (err) {
                    if (err) {
                        console.error("LevelBillabilityBasedOnVertical : Error in inserting " + err);
                    } else {
                        console.log("LevelBillabilityBasedOnVertical: inserted successfully");
                    }
                });
            }
        }
    });
}

function loadLevelOnLocationAndVerticalToMongo(inputResultToStore) {
    LevelBillabilityBasedOnLocationAndVertical.remove({}, function (err) {
        if (err) {
            console.log("LevelBillabilityBasedOnLocationAndVertical : Error in removing data " + err);
        } else {
            for (var i = 0; i < inputResultToStore.length; i++) {
                var levelBillabilityBasedOnLocationAndVertical = new LevelBillabilityBasedOnLocationAndVertical({
                    date: inputResultToStore[i].date,
                    week: inputResultToStore[i].week,
                    level: inputResultToStore[i].level,
                    location: inputResultToStore[i].location,
                    vertical: inputResultToStore[i].vertical,
                    values: inputResultToStore[i].values
                });

                levelBillabilityBasedOnLocationAndVertical.save(function (err) {
                    if (err) {
                        console.error("LevelBillabilityBasedOnLocationAndVertical : Error in inserting data " + err);
                    } else {
                        console.log("LevelBillabilityBasedOnLocationAndVertical : Inserted successfully");
                    }
                });
            }
        }
    });
}

function loadDepartmentOnDateToMongo(inputResultToStore) {
    DepartmentBillability.remove({}, function (err) {
        if (err) {
            console.log("DepartmentBillability: Error in removing data " + err);
        } else {
            for (var i = 0; i < inputResultToStore.length; i++) {
                var departmentBillability = new DepartmentBillability({
                    date: inputResultToStore[i].date,
                    week: inputResultToStore[i].week,
                    department: inputResultToStore[i].department,
                    values: inputResultToStore[i].values
                });

                departmentBillability.save(function (err) {
                    if (err) {
                        console.log("DepartmentBillability: Error in inserting data " + err);
                    } else {
                        console.log("DepartmentBillability: inserted successfully");
                    }
                });
            }
        }
    });
}

function loadDepartmentOnDateLocationToMongo(inputResultToStore) {
    DepartmentBillabilityBasedOnLocation.remove({}, function (err) {
        if (err) {
            console.log("DepartmentBillabilityBasedOnLocation: Error in removing data " + err);
        } else {
            for (var i = 0; i < inputResultToStore.length; i++) {
                var departmentBillabilityBasedOnLocation = new DepartmentBillabilityBasedOnLocation({
                    date: inputResultToStore[i].date,
                    week: inputResultToStore[i].week,
                    location: inputResultToStore[i].location,
                    department: inputResultToStore[i].department,
                    values: inputResultToStore[i].values
                });

                departmentBillabilityBasedOnLocation.save(function (err) {
                    if (err) {
                        console.log("DepartmentBillabilityBasedOnLocation: Error in inserting data " + err);
                    } else {
                        console.log("DepartmentBillabilityBasedOnLocation: inserted successfully");
                    }
                });
            }
        }
    });
}

function loadDepartmentOnDateVerticalToMongo(inputResultToStore) {
    DepartmentBillabilityBasedOnVertical.remove({}, function (err) {
        if (err) {
            console.log("DepartmentBillabilityBasedOnVertical: Error in removing data " + err);
        } else {
            for (var i = 0; i < inputResultToStore.length; i++) {
                var departmentBillabilityBasedOnVertical = new DepartmentBillabilityBasedOnVertical({
                    date: inputResultToStore[i].date,
                    week: inputResultToStore[i].week,
                    vertical: inputResultToStore[i].vertical,
                    department: inputResultToStore[i].department,
                    values: inputResultToStore[i].values
                });

                departmentBillabilityBasedOnVertical.save(function (err) {
                    if (err) {
                        console.log("DepartmentBillabilityBasedOnVertical: Error in inserting data " + err);
                    } else {
                        console.log("DepartmentBillabilityBasedOnVertical: inserted successfully");
                    }
                });
            }
        }
    });
}


function loadVerticalBillabilityTrendToMongo(inputResultToStore) {
    OverallBillabilityTrendOnVertical.remove({}, function(err) {
       if(err) {
           console.error("OverallBillabilityTrendOnVertical: Error in removing data " + err);
       } else {
            for(var i=0; i<inputResultToStore.length; i++) {
                for(var current in inputResultToStore[i].data) {
                    var overallBillabilityTrendOnVertical = new OverallBillabilityTrendOnVertical({week: inputResultToStore[i].week, data: [{vertical: inputResultToStore[i].data[current].vertical, values: inputResultToStore[i].data[current].values}]});
                    overallBillabilityTrendOnVertical.save(function(err) {
                        if(err) {
                            console.log("OverallBillabilityTrendOnVertical: Error in inserting data " + err);
                        } else {
                            console.log("OverallBillabilityTrendOnVertical: inserted successfully");
                        }
                    })
                }
            }
       }
    });
}

function loadPracticeToMongo(inputResultToStore) {
    PracticeBillability.remove({}, function(err) {
        if(err) {
            console.error("PracticeBillability: Error in removing data " + err);
        } else {
            for(var i=0; i<inputResultToStore.length; i++) {
                var practiceBillability = new PracticeBillability({
                    date: inputResultToStore[i].date, 
                    week: inputResultToStore[i].week,
                    practice: inputResultToStore[i].practice,
                    values: inputResultToStore[i].values
                });

                practiceBillability.save(function(err) {
                    if(err) {
                        console.log("PracticeBillability: Error in inserting data " + err);
                    } else {
                        console.log("PracticeBillability: inserted successfully");
                    }
                });
            }
        }
    });
}


function loadPracticeLocationToMongo(inputResultToStore) {
    PracticeBillabilityBasedOnLocation.remove({}, function(err) {
        if(err) {
            console.error("PracticeBillabilityBasedOnLocation: Error in removing data " + err);
        } else {
            for(var i=0; i<inputResultToStore.length; i++) {
                var practiceBillabilityBasedOnLocation = new PracticeBillabilityBasedOnLocation({
                    date: inputResultToStore[i].date,
                    week: inputResultToStore[i].week,
                    practice: inputResultToStore[i].practice,
                    location: inputResultToStore[i].location,
                    values: inputResultToStore[i].values
                });

                practiceBillabilityBasedOnLocation.save(function(err) {
                    if(err) {
                        console.log("PracticeBillabilityBasedOnLocation: Error in inserting date " + err);
                    } else {
                        console.log("PracticeBillabilityBasedOnLocation: inserted successfully");
                    }
                });
            }
        }
    });
}

function loadPracticeVerticalToMongo(inputResultToStore) {
    PracticeBillabilityBasedOnVertical.remove({}, function(err) {
        if(err) {
            console.error("PracticeBillabilityBasedOnVertical: Error in removing data " + err);
        } else {
            for(var i=0; i<inputResultToStore.length; i++) {
                var practiceBillabilityBasedOnVertical = new PracticeBillabilityBasedOnVertical({
                    date: inputResultToStore[i].date,
                    week: inputResultToStore[i].week,
                    practice: inputResultToStore[i].practice,
                    vertical: inputResultToStore[i].vertical,
                    values: inputResultToStore[i].values
                });

                practiceBillabilityBasedOnVertical.save(function(err) {
                    if(err) {
                        console.log("PracticeBillabilityBasedOnVertical: Error in inserting data " + err);                        
                    } else {
                        console.log("PracticeBillabilityBasedOnVertical: inserted successfully");
                    }
                })
            }
        }
    })
}