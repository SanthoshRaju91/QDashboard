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
            //loadDataForVerticalAndLocation(JSON.stringify(result));
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
        
        var vertical = _.map(groupedData, function(current) {
        var verticalGrouped = _.groupBy(current.values, 'PROJECT_BG');    
            return _.map(verticalGrouped, function(object) {
               return {
                   week: current.week,
                   vertical: object[0].PROJECT_BG,
                   values: object
               } 
            });   
      });
            
        var location = _.map(vertical[0], function(current) {            
            var locationGrouped = _.groupBy(current.values, 'BASE_LOCATION');                
            return _.map(locationGrouped, function(object) {
               return {
                   week: current.week,
                   vertical: current.vertical,
                   location: object[0].BASE_LOCATION,
                   values: object
               } 
            });
    });
      
        
        var computedResult = _.map(location[0], function(current) {
        var counted = _.countBy(current.values, function(object) {
            return object['BILLABLE'] == 'Billable'? 'Billable': 'NonBillable'  
        }); 
        return {
            week: current.week,
            location: current.location,
            vertical: current.vertical,
            values: counted
        };        
    });
       //console.info(computedResult);
       //loadVerticalAndLocationDataToMongo(computedResult);
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
            console.error("Error in removing data " + err);
        } else{
        for(var i=0;i<inputResultToStore.length;i++){
             var overBillabilityBasedOnVerticalAndLocation = new OverBillabilityBasedOnVerticalAndLocation({week: inputResultToStore[i].week, vertical: inputResultToStore[i].vertical, location:inputResultToStore[i].location , value: inputResultToStore[i].values});    
            
             overBillabilityBasedOnVerticalAndLocation.save(function(err) {
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


