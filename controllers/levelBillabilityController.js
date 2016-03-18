var LevelBillability = require('../models/levelBillability.js');
var LevelBillabilityBasedOnLoc = require('../models/levelBillabilityBasedOnLoc.js');
var LevelBillabilityBasedOnVertical = require('../models/levelBillabilityBasedOnVertical.js');
var LevelBillabilityBasedOnLocAndVer = require('../models/levelBillabilityBasedOnLocAndVer.js');
var logger = require('../utils/loggerUtil.js').logger;


//Level billability routes
exports.getlevelBillability = function(req, res) {
    LevelBillability.find({}, function(err, resultSet) {
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

exports.getlevelBillabilityDate = function(req, res) {    
    LevelBillability.find({"week":req.params.date}, function(err, resultSet) {
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


exports.getlevelBillabilityLocation = function(req, res) {  
    LevelBillabilityBasedOnLoc.find({"week":req.params.date, "location":req.params.location}, function(err, resultSet) {
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

exports.getlevelBillabilityVerticalandLocation = function(req, res) {    
    LevelBillabilityBasedOnLocAndVer.find({"week":req.params.date ,"location":req.params.location, "vertical":req.params.vertical}, function(err, resultSet) {
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

exports.getlevelBillabilityVertical = function(req, res) {   
    console.log(req.params.vertical + " " + req.params.date + " " + req.params.level);
    
    LevelBillabilityBasedOnLocAndVer.find({"week":req.params.date, "vertical":req.params.vertical}, function(err, resultSet) {
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