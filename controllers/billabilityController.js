var OverallBillabilityBasedOnLoc = require('../models/overallBillabilityBasedOnLocationModel.js');
var OverallBillabilityBasedOnVertical = require('../models/overallBillabilityBasedOnVerticalModel.js');
var OverallBillabilityBasedOnVerticalAndLocation = require('../models/overallBillabilityBasedOnVertAndLocModel.js');
var OverallBillability = require('../models/overallBillability.js');
var logger = require('../utils/loggerUtil.js').logger;

exports.getOverallBillabilityBasedOnLoc = function(req, res) {    
    OverallBillabilityBasedOnLoc.find({}, function(err, resultSet) {
        if(err) {
            logger.error("Error in fetching" + err);
            res.json({status: 500, message: 'Error'});  
        } 
        else {
            console.log("result fetched");
            res.json({status: 200,success: true, result: resultSet});
        }
   });
}


exports.getOverallBillabilityBasedOnVertical = function(req, res) {    
    OverallBillabilityBasedOnVertical.find({}, function(err, resultSet) {
        if(err) {
            logger.error("Error in fetching" + err);
            res.json({status: 500, message: 'Error'});  
        } 
        else {
            console.log("result fetched");
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
            console.log("result fetched");
            res.json({status: 200,success: true, result: resultSet});
        }
   });
}

exports.getOverallBillability = function(req, res) {    
    OverallBillability.find({}, function(err, resultSet) {
        if(err) {
            logger.error("Error in fetching" + err);
            res.json({status: 500, message: 'Error'});  
        } 
        else {
            console.log("result fetched");
            res.json({status: 200,success: true, result: resultSet});
        }
   });
}