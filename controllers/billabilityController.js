var OverallBillabilityBasedOnLoc = require('../models/overallBillabilityBasedOnLocationModel.js');
var OverallBillabilityBasedOnVertical = require('../models/overallBillabilityBasedOnVerticalModel.js');
var OverallBillabilityBasedOnVerticalAndLocation = require('../models/overallBillabilityBasedOnVertAndLocModel.js');
var OverallBillability = require('../models/overallBillability.js');
var logger = require('../utils/loggerUtil.js').logger;

exports.getDates = function(req, res) {
    //week drop down
    var query = OverallBillability.find({}).select('week').sort('-week');
    console.log(query);
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
            logger.info("Results fetched location"+result);
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
            console.log("result fetched");
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

exports.getOverallBillabilityBasedOnLocdate = function(req, res) {   
    OverallBillabilityBasedOnLoc.find({"base_location": req.params.location,"week":req.params.date}, function(err, resultSet) {
        if(err) {
            logger.error("Error in fetching" + err);
            res.json({status: 500, message: 'Error'});  
        } 
        else {
            console.log("result fetched" + resultSet);            
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
            console.log("result fetched");
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
            console.log("result fetched");
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
            console.log("result fetched");
            res.json({status: 200,success: true, result: resultSet});
        }
   });
}



exports.billabilityTrend = function(req, res) {
    OverallBillabilityBasedOnVertical.find({}, function(err, result) {
       if(err) {
           logger.error("billabilityTrend: Error in fetching " + err);
           res.json({status: 500, success: false, message: 'Error'});
       } else {
           result = result.slice(Math.max(result.length - 5, 1));
           logger.info("billabilityTrend: results fetched");
           res.json({status: 200, success: true, result: result});
       }
    });
    
}

