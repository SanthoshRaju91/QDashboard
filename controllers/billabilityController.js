var OverallBillabilityBasedOnLoc = require('../models/overallBillabilityBasedOnLocationModel.js');
var OverallBillabilityBasedOnVertical = require('../models/overallBillabilityBasedOnVerticalModel.js');
var OverallBillabilityBasedOnVerticalAndLocation = require('../models/overallBillabilityBasedOnVertAndLocModel.js');
var OverallBillability = require('../models/overallBillability.js');
var OverallBillabilityTrendOnVertical = require('../models/overallBillabilityTrendOnVertical.js');
var logger = require('../utils/loggerUtil.js').logger;
var async = require('async');
var Fiber = require('fibers');


function sleep(ms) {
    var fiber = Fiber.current;
    setTimeout(function() {
        fiber.run();
    }, ms);
    Fiber.yield();
}

exports.getDates = function(req, res) {    
    var query = OverallBillability.find({}).select('week').sort('-date');
    query.exec(function(err, result) {
        if(err) {
            logger.error("Error in fetching the dates " + err);
            res.json({status: 500, success: false, result: 'Error in fetching date'});
        } else {
            logger.info("Results fetched");
            res.json({status: 200, success: true, result: result});
                    
        }
    });
}

exports.getLocations = function(req, res) {
    var query = OverallBillabilityBasedOnLoc.find({}).distinct('base_location');
    query.exec(function(err, result) {
        if(err) {
            logger.error("Error in fetching the dates" + err);
            res.json({status: 500, success: false, result: 'Error in fetching date'});
        } else {
            logger.info("Results fetched location");
            res.json({status: 200, success: true, result: result});
        }
    });
}

exports.getLevels = function(req, res) {
    var query = LevelBillability.find({"week": req.params.date}).distinct('level');
    query.exec(function(err, result) {
        if(err) {
            logger.error("Error in fetching the dates " + err);
            res.json({status: 500, success: false, result: 'Error in fetching date'});
        } else {
            logger.info("Results fetched");
            res.json({status: 200, success: true, result: result});
        }
    });
}



exports.getOverallBillabilityBasedOnLoc = function(req, res) {    
    OverallBillabilityBasedOnLoc.find({"base_location": req.params.location}, function(err, resultSet) {
        if(err) {
            logger.error("Error in fetching" + err);
            res.json({status: 500, message: 'Error'});  
        } 
        else {
            logger.log("result fetched");
            res.json({status: 200,success: true, result: resultSet});
        }
   });
}


exports.getOverallBillabilityBasedOnVertical = function(req, res) {    
    OverallBillabilityBasedOnVertical.find({"vertical": req.params.vertical}, function(err, resultSet) {
        if(err) {
            logger.error("Error in fetching" + err);
            res.json({status: 500, message: 'Error'});  
        } 
        else {
            logger.log("result fetched");
            res.json({status: 200,success: true, result: resultSet});
        }
   });
}

exports.getOverallBillabilityBasedOnVerticalAndLocation = function(req, res) {    
    OverallBillabilityBasedOnVerticalAndLocation.find({}, function(err, resultSet) {
        if(err) {
            logger.error("Error in fetching" + err);
            res.json({status: 500, message: 'Error'});  
        } 
        else {
            logger.log("result fetched");
            res.json({status: 200,success: true, result: resultSet});
        }
   });
}

exports.getOverallBillability = function(req, res) {    
    var previous10days = new Date('2016, 2, 21');
    previous10days = new Date(previous10days.setDate(previous10days.getDate() - 10));
    OverallBillability.find({"date": {"$gte": previous10days, "$lt": new Date('2016, 2, 21')}}, function(err, resultSet) {
        if(err) {
            logger.error("Error in fetching" + err);
            res.json({status: 500, message: 'Error'});  
        } 
        else {
            logger.log("result fetched in OverallBillability" + resultSet);
            res.json({status: 200,success: true, result: resultSet});
        }
   });
}

exports.getOverallBillabilityBasedOnLocdate = function(req, res) {   
    OverallBillabilityBasedOnLoc.find({"base_location": req.params.location,"week":req.params.date}, function(err, resultSet) {
        if(err) {
            logger.error("Error in fetching" + err);
            res.json({status: 500, message: 'Error'});  
        } 
        else {
            logger.log("result fetched" + resultSet);            
            res.json({status: 200,success: true, result: resultSet});
        }
   });
}

//based on vert date

exports.getOverallBillabilityBasedOnVerticaldate = function(req, res) {    
    OverallBillabilityBasedOnVertical.find({"vertical": req.params.vertical, "week":req.params.date}, function(err, resultSet) {
        if(err) {
            logger.error("Error in fetching" + err);
            res.json({status: 500, message: 'Error'});  
        } 
        else {
            logger.log("result fetched");
            res.json({status: 200,success: true, result: resultSet});
        }
   });
}

//based on vert and loc date
exports.getOverallBillabilityBasedOnVerticalAndLocationdate = function(req, res) {    
    OverallBillabilityBasedOnVerticalAndLocation.find({"week":req.params.date}, function(err, resultSet) {
        if(err) {
            logger.error("Error in fetching" + err);
            res.json({status: 500, message: 'Error'});  
        } 
        else {
            logger.log("result fetched");
            res.json({status: 200,success: true, result: resultSet});
        }
   });
}

//based on billable date
exports.getOverallBillabilitydate = function(req, res) {        
    OverallBillability.find({"week":req.params.date}, function(err, resultSet) {
        if(err) {
            logger.error("Error in fetching" + err);
            res.json({status: 500, message: 'Error'});  
        } 
        else {            
            logger.log("result fetched");
            res.json({status: 200,success: true, result: resultSet});
        }
   });
}


exports.billabilityTrend = function(req, res) {
    var query = OverallBillabilityTrendOnVertical.find({}).distinct('week');
    query.exec(function(err, result) {
       if(err) {
           logger.error("billabilityTrend: Error in fetching " + err);
           res.json({status: 500, success: false, message: 'Error'});
       } else {           
            var verticalMap = [];
            dateRange = result.slice(Math.max(result.length - 10, 1));
            Fiber(function() {
                for(var i=0; i < dateRange.length; i++) {
                    var subQuery = OverallBillabilityTrendOnVertical.find({"week": dateRange[i]});
                    subQuery.exec(function(err, resultSet) {
                        if(err) {
                            console.log("Error in fetching the results" + err);
                        } else {                            
                            var verticalTrend = {};                            
                            var dataMap = [];
                            verticalTrend.week = resultSet[0].week;
                            for(var current in resultSet) {                                
                                dataMap.push(resultSet[current].data);
                            }
                            verticalTrend.data = dataMap;
                            verticalMap.push(verticalTrend);
                        }
                    });                                                                             
                } 
                sleep(2000);
                res.json({status: 200, success: true, result: verticalMap});
            }).run();                        
        }
    });
}

