var xlsxj = require("xlsx-to-json");
var mongoose = require('mongoose');
var _ = require('underscore');
var config = require('../config.js');
var fs = require('fs');

//connecting to mongodb
/*
mongoose.connect(config.dbConnectionURL, function(err){
    if(err) console.error("Error in connecting to mongo DB" + err); 
    else console.info("Connected to MongoDB");
}); 
*/

var OverBillability = require('../models/overallBillability.js');
var OverBillabilityBasedOnLocation = require('../models/overallBillabilityBasedOnLocationModel.js');
var OverBillabilityBasedOnVertical = require('../models/overallBillabilityBasedOnVerticalModel.js');
var OverBillabilityBasedOnVerticalAndLocation = require('../models/overallBillabilityBasedOnVertAndLocModel.js');

var LevelBillability = require('../models/levelBillability.js');
var LevelBillabilityBasedOnLoc = require('../models/levelBillabilityBasedOnLoc.js');
var LevelBillabilityBasedOnVertical = require('../models/levelBillabilityBasedOnVertical.js');
var LevelBillabilityBasedOnLocationAndVertical = require('../models/levelBillabilityBasedOnLocAndVer.js');

//Parsing the given excel file
exports.parseBillabilityData =  function (filename) {
    xlsxj({
        input: config.excelPath + filename, 
        output: "output.json"
      }, function(err, result) {
        if(err) {
          console.error(err);
        }else {
            loadData(JSON.stringify(result));
            loadDataForLocation(JSON.stringify(result));
            loadDataForVertical(JSON.stringify(result));
            loadDataForVerticalAndLocation(JSON.stringify(result));
            processLevelData(JSON.stringify(result));
            processLevelAndLocationData(JSON.stringify(result));
            processLevelAndVerticalData(JSON.stringify(result));  
            processLevelBasedOnLocationAndVerticalData(JSON.stringify(result));
        }
      });   
}

//Loading data for overall billable and non-billable
function loadData (result) {    
    var grouped = _.groupBy(JSON.parse(result), 'Week');
    var groupedData = _.map(grouped, function(current) {
       return {        
            week: current[0].Week,
            values: current
       }; 
    });
    var computedResult = _.map(groupedData, function(current) {
        var counted = _.countBy(current.values, function(object) {
            return object['BILLABLE'] == 'Billable'? 'Billable': 'NonBillable'  
        }); 
        return {
            week: current.week,
            values: counted
        };        
    });
    loadDataToMongo(computedResult);
}

//Loading data for billable and non-billable based on location
function loadDataForLocation (result) {    
        var grouped = _.groupBy(JSON.parse(result), 'Week');
        var groupedData = _.map(grouped, function(current) {
            return {        
                week: current[0].Week,
                values: current
            }; 
          });
    
        var locationMap = [];
        var location = _.map(groupedData, function(current) {
            var locationGrouped = _.groupBy(current.values, 'BASE_LOCATION');    
            
            _.each(locationGrouped, function(object){
                locationMap.push({
                    week: object[0].Week,
                    location: object[0].BASE_LOCATION,
                    values: _.countBy(object, function(temp) {               
                                return temp['BILLABLE'] == 'Billable'? 'Billable': 'NonBillable'  
                            })
                });
                               
            });            
        });                             
      loadLocationDataToMongo(locationMap);
}

//Loading data for billable and non-billable based on vertical
function loadDataForVertical (result) {    
    var grouped = _.groupBy(JSON.parse(result), 'Week');
    var groupedData = _.map(grouped, function(current) {
        return {        
            week: current[0].Week,
            values: current
        }; 
    });
    
    
    var verticalMap = [];
    var vertical = _.map(groupedData, function(current) {
        var verticalGrouped = _.groupBy(current.values, 'PROJECT_BG');    
        _.each(verticalGrouped, function(object) {
            verticalMap.push({
                week: object[0].Week,
                vertical: object[0].PROJECT_BG,
                values: _.countBy(object, function(object) {
                            return object['BILLABLE'] == 'Billable'? 'Billable': 'NonBillable'  
                        })
            });
        });  
      });     
    loadVerticalDataToMongo(verticalMap);
}

//Loading data for billable and non-billable based on vertical and location
function loadDataForVerticalAndLocation(result) {    
        var grouped = _.groupBy(JSON.parse(result), 'Week');
        var groupedData = _.map(grouped, function(current) {
        return {        
            week: current[0].Week,
            values: current
        }; 
      });
        
        var verticalMap = [];
        var vertical = _.map(groupedData, function(current) {
        var verticalGrouped = _.groupBy(current.values, 'PROJECT_BG');    
            _.each(verticalGrouped, function(object) {
               verticalMap.push({
                   week: object[0].Week,
                   vertical: object[0].PROJECT_BG,
                   values: object
               }); 
            });       
        });
           
        var locationVerticalMap = [];
        var location = _.map(verticalMap, function(current) {            
            var locationGrouped = _.groupBy(current.values, 'BASE_LOCATION');                
            _.each(locationGrouped, function(object) {
               locationVerticalMap.push({
                   week: object[0].Week,
                   vertical: object[0].PROJECT_BG,
                   base_location: object[0].BASE_LOCATION,
                   values: _.countBy(object, function(object) {
                       return object['BILLABLE'] == 'Billable' ? 'Billable': 'NonBillable'
                   })
               }) 
            });    
        });                      
       loadVerticalAndLocationDataToMongo(locationVerticalMap);
}

function processLevelData(result) {
    var grouped = _.groupBy(JSON.parse(result), 'Week');
    var groupedData = _.map(grouped, function(current) {
        return {
            week: current[0].Week,
            values: current
        } 
    });
    
    var levelMap = [];
    var level = _.map(groupedData, function(current) {
       var levelGrouped = _.groupBy(current.values, 'LVL');
        _.each(levelGrouped, function(object) {
           levelMap.push({
               week: object[0].Week,
               level: object[0].LVL,
               values: _.countBy(object, function(object) {
                  return object['BILLABLE'] == 'Billable' ? 'Billable': 'NonBillable' 
               })
           }) 
        });
    });
    loadLevelDataToMongo(levelMap);
}

function processLevelAndLocationData(result) {
    var grouped = _.groupBy(JSON.parse(result), 'Week');
    var groupedData = _.map(grouped, function(current) {
        return {
            week: current[0].Week,
            values: current
        } 
    });
    
    var levelMap = [];
    _.map(groupedData, function(current) {
        var levelGrouped = _.groupBy(current.values, 'LVL');
        _.each(levelGrouped, function(object) {
            levelMap.push({
                week: object[0].Week,
                level: object[0].LVL,
                values: object
            }); 
        });
    });
    
    var locationLevelMap = [];
    _.map(groupedData, function(current) {
        var locationGrouped = _.groupBy(current.values, 'BASE_LOCATION');
        _.each(locationGrouped, function(object) {
            locationLevelMap.push({
                week: object[0].Week,
                level: object[0].LVL,
                location: object[0].BASE_LOCATION,
                values: _.countBy(object, function(object) {
                    return object['BILLABLE'] == 'Billable' ? 'Billable' : 'NonBillable'
                })
            }); 
        });
    })
    
    loadLevelLocationDataToMongo(locationLevelMap);
}


function processLevelAndVerticalData(result) {
    var grouped = _.groupBy(JSON.parse(result), 'Week');
    var groupedData = _.map(grouped, function(current) {
        return {
            week: current[0].Week,
            values: current
        } 
    });
    
    var levelMap = [];
    _.map(groupedData, function(current) {
        var levelGrouped = _.groupBy(current.values, 'LVL');
        _.each(levelGrouped, function(object) {
            levelMap.push({
                week: object[0].Week,
                level: object[0].LVL,
                values: object
            }); 
        });
    });
    
    var verticalLevelMap = [];
    _.map(groupedData, function(current) {
        var verticalGrouped = _.groupBy(current.values, 'PROJECT_BG');
        _.each(verticalGrouped, function(object) {
            verticalLevelMap.push({
                week: object[0].Week,
                level: object[0].LVL,
                vertical: object[0].PROJECT_BG,
                values: _.countBy(object, function(object) {
                    return object['BILLABLE'] == 'Billable' ? 'Billable' : 'NonBillable'
                })
            }); 
        });
    });
    
    loadLevelVerticalDataToMongo(verticalLevelMap);
}


function processLevelBasedOnLocationAndVerticalData(result) {
    var grouped = _.groupBy(JSON.parse(result), 'Week');
    var groupedData = _.map(grouped, function(current) {
        return {
            week: current[0].Week,
            values: current
        } 
    });
        
    var levelMap = [];
    _.map(groupedData, function(current) {
        var levelGrouped = _.groupBy(current.values, 'LVL');
        _.each(levelGrouped, function(object) {
            levelMap.push({
                week: object[0].Week,
                level: object[0].LVL,
                values: object
            }); 
        });
    });
    
    var levelLocationMap = [];
    _.map(levelMap, function(current) {
        var locationMap = _.groupBy(current.values, 'BASE_LOCATION');
        _.each(locationMap, function(object) {
            levelLocationMap.push({
                week: object[0].Week,
                level: object[0].LVL,
                location: object[0].BASE_LOCATION,
                values: object
            });
        });
    });
    
    var levelLocationVerticalMap = [];
    _.map(levelLocationMap, function(current) {
        var verticalMap = _.groupBy(current.values, 'PROJECT_BG');
        _.each(verticalMap, function(object) {
             levelLocationVerticalMap.push({
                week: object[0].Week,
                level: object[0].LVL,
                location: object[0].BASE_LOCATION,
                vertical: object[0].PROJECT_BG,
                values: _.countBy(object, function(object) {
                    return object['BILLABLE'] == 'Billable' ? 'Billable' : 'NonBillable'
                 })
             });
        });
    });
    
    loadLevelOnLocationAndVerticalToMongo(levelLocationVerticalMap);
}

//loading overall billing and non billing json to mongodb
function loadDataToMongo(inputResultToStore) { 
    OverBillability.remove({}, function(err) {
        if(err) {
            console.error("Error in removing data " + err);
        } else{
        for(var i=0;i<inputResultToStore.length;i++){
             var overBillability = new OverBillability({week: inputResultToStore[i].week, value: inputResultToStore[i].values});

             overBillability.save(function(err) {
                if(err) {
                    console.error("Error in inserting " + err);
                }
                else {                
                    console.info("Inserted successfully");
                }
            });
          }
        }
        
        });    
    }


//loading location json to mongoDb
function loadLocationDataToMongo(inputResultToStore) {     
    OverBillabilityBasedOnLocation.remove({}, function(err) {
        if(err) {
            console.error("Error in removing data " + err);
        } else {
            for(var i=0;i<inputResultToStore.length;i++){
                 var overBillabilityBasedOnLocation = new OverBillabilityBasedOnLocation({week: inputResultToStore[i].week, base_location: inputResultToStore[i].location, value: inputResultToStore[i].values});
                
                 overBillabilityBasedOnLocation.save(function(err) {
                    if(err) {
                        console.error("Error in inserting " + err);
                    }
                    else {                
                        console.info("Inserted successfully");
                    }
                });
            }
        }
    });   
}

//loading vertical json to mongoDb
function loadVerticalDataToMongo(inputResultToStore) {  
     OverBillabilityBasedOnVertical.remove({}, function(err) {
        if(err) {
            console.error("Error in removing data " + err);
        } else{
        for(var i=0;i<inputResultToStore.length;i++){
             var overBillabilityBasedOnVertical = new OverBillabilityBasedOnVertical({week: inputResultToStore[i].week, vertical: inputResultToStore[i].vertical, value: inputResultToStore[i].values});
            
             overBillabilityBasedOnVertical.save(function(err) {
                if(err) {
                    console.error("Error in inserting " + err);
                }
                else {                
                    console.info("Inserted successfully");
                }
            });
          } 
        }
     });
}
    

//loading vertical and location json to mongoDb
function loadVerticalAndLocationDataToMongo(inputResultToStore) { 
     OverBillabilityBasedOnVerticalAndLocation.remove({}, function(err) {
        if(err) {
            console.error("OverBillabilityBasedOnVerticalAndLocation : Error in removing data " + err);
        } else{
        for(var i=0;i<inputResultToStore.length;i++){
             var overBillabilityBasedOnVerticalAndLocation = new OverBillabilityBasedOnVerticalAndLocation({week: inputResultToStore[i].week, vertical: inputResultToStore[i].vertical, location:inputResultToStore[i].base_location , value: inputResultToStore[i].values});    
            
             overBillabilityBasedOnVerticalAndLocation.save(function(err) {
                if(err) {
                    console.error("OverBillabilityBasedOnVerticalAndLocation : Error in inserting " + err);
                }
                else {                
                    console.info("OverBillabilityBasedOnVerticalAndLocation : inserted successfully");
                }
            });
          }
        }
    });    
}


function loadLevelDataToMongo(inputResultToStore) {
    LevelBillability.remove({}, function(err) {
       if(err) {
            console.log("LevelBillability : Error in removing data " + err);
       } else {
           for(var i=0; i<inputResultToStore.length; i++) {
                var levelBillability = new LevelBillability({week: inputResultToStore[i].week, level: inputResultToStore[i].level, values: inputResultToStore[i].values});
               
                levelBillability.save(function(err) {
                   if(err) {
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
    LevelBillabilityBasedOnLoc.remove({}, function(err) {
        if(err) {
            console.log("LevelBillabilityBasedOnLoc : Error in removing data " + err);
        } else {
            for(var i=0; i<inputResultToStore.length; i++) {
                var levelBillabilityBasedOnLoc = new LevelBillabilityBasedOnLoc({week: inputResultToStore[i].week, level: inputResultToStore[i].level, location: inputResultToStore[i].location, values: inputResultToStore[i].values});
                
                levelBillabilityBasedOnLoc.save(function(err) {
                    if(err) {
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
    LevelBillabilityBasedOnVertical.remove({}, function(err) {
        if(err) {
            console.log("LevelBillabilityBasedOnVertical: Error in removing data " + err);
        } else {
            for(var i=0; i<inputResultToStore.length; i++) {
                var levelBillabilityBasedOnVertical = new LevelBillabilityBasedOnVertical({week: inputResultToStore[i].week, level: inputResultToStore[i].level, vertical: inputResultToStore[i].vertical, values: inputResultToStore[i].values});
                
                levelBillabilityBasedOnVertical.save(function(err) {
                    if(err) {
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
    LevelBillabilityBasedOnLocationAndVertical.remove({}, function(err) {
       if(err) {
           console.log("LevelBillabilityBasedOnLocationAndVertical : Error in removing data " + err);
       } else {
           for(var i=0; i<inputResultToStore.length; i++) {
               var levelBillabilityBasedOnLocationAndVertical = new LevelBillabilityBasedOnLocationAndVertical({week: inputResultToStore[i].week, level: inputResultToStore[i].level, location: inputResultToStore[i].location, vertical: inputResultToStore[i].vertical, values: inputResultToStore[i].values});
               
               levelBillabilityBasedOnLocationAndVertical.save(function(err) {
                  if(err) {
                      console.error("LevelBillabilityBasedOnLocationAndVertical : Error in inserting data " + err); 
                  } else {
                      console.log("LevelBillabilityBasedOnLocationAndVertical : Inserted successfully");
                  }
               });
           }
       }
    });
}