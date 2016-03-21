var LevelBillability = require('../models/levelBillability.js');
var LevelBillabilityBasedOnLoc = require('../models/levelBillabilityBasedOnLoc.js');
var LevelBillabilityBasedOnVertical = require('../models/levelBillabilityBasedOnVertical.js');
var LevelBillabilityBasedOnLocAndVer = require('../models/levelBillabilityBasedOnLocAndVer.js');
var logger = require('../utils/loggerUtil.js').logger;


//Level billability routes
exports.getlevelBillability = function(req, res) {
    var previous10days = new Date('2016, 2, 21');
    previous10days = new Date(previous10days.setDate(previous10days.getDate() - 10));
    LevelBillability.find({"date": {"$gte": previous10days, "$lte": new Date('2016, 2, 21') }}, function(err, resultSet) {
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
    LevelBillabilityBasedOnVertical.find({"week":req.params.date, "vertical":req.params.vertical}, function(err, resultSet) {
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


exports.getLevelBillabilityVerticalLatest = function(req, res) {
    var previous10days = new Date('2016, 2, 21');
    previous10days = new Date(previous10days.setDate(previous10days.getDate() - 10));
    LevelBillabilityBasedOnVertical.find({"date": {"$gte": previous10days, "$lte": new Date('2016, 2, 21')}, "vertical": req.params.vertical}, function(err, resultSet) {
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

exports.getLevelBillabilityLocationLatest = function(req, res) {
    var previous10days = new Date('2016, 2, 21');
    previous10days = new Date(previous10days.setDate(previous10days.getDate() - 10));
    LevelBillabilityBasedOnLoc.find({"date": {"$gte": previous10days, "$lte": new Date('2016, 2, 21')}, "location": req.params.location}, function(err, resultSet) {
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