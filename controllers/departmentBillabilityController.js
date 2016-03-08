var DepartmentBillability = require('../models/departmentBillability.js');
var DepartmentBillabilityBasedOnLocation = require('../models/departmentBillabilityBasedOnLoc.js');
var DepartmentBillabilityBasedOnVertical = require('../models/departmentBillabilityBasedOnVertical.js');
var logger = require('../utils/loggerUtil.js').logger;


exports.getDepartmentBillability = function(req, res) {
    DepartmentBillability.find({}, function(err, resultSet) {
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

exports.getDepartmentBillabilityBasedOnLocation = function(req, res) {
    DepartmentBillabilityBasedOnLocation.find({}, function(err, resultSet) {
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

exports.getDepartmentBillabilityBasedOnVertical = function(req, res) {
    DepartmentBillabilityBasedOnVertical.find({}, function(err, resultSet) {
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
