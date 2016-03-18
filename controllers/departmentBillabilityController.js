var DepartmentBillability = require('../models/departmentBillability.js');
var DepartmentBillabilityBasedOnLocation = require('../models/departmentBillabilityBasedOnLocation.js');
var DepartmentBillabilityBasedOnVertical = require('../models/departmentBillabilityBasedOnVertical.js');
var logger = require('../utils/loggerUtil.js').logger;


exports.getDepartmentBillability = function(req, res) {    
    var previous10days = new Date('2016, 2, 21');
    previous10days = new Date(previous10days.setDate(previous10days.getDate() - 10));
    DepartmentBillability.find({"date": {"$gte": previous10days, "$lt": new Date('2016, 2, 21')}}, function(err, resultSet) {
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


exports.getDepartmentBillabilityDate = function(req, res) {        
    DepartmentBillability.find({"week":req.params.date}, function(err, resultSet) {
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




exports.getDepartmentBillabilityBasedOnLocation = function (req, res) {
    DepartmentBillabilityBasedOnLocation.find({"week": req.params.date, "location": req.params.location}, function (err, resultSet) {
        if (err) {
            logger.error("Error in fetching" + err);
            res.json({
                status: 500,
                message: 'Error'
            });
        } else {
            console.log("result fetched");
            res.json({
                status: 200,
                success: true,
                result: resultSet
            });
        }
    });
}

exports.getDepartmentBillabilityBasedOnVertical = function (req, res) {
    DepartmentBillabilityBasedOnVertical.find({"week": req.params.date, "vertical": req.params.vertical}, function (err, resultSet) {
        if (err) {
            logger.error("Error in fetching" + err);
            res.json({
                status: 500,
                message: 'Error'
            });
        } else {
            console.log("result fetched");
            res.json({
                status: 200,
                success: true,
                result: resultSet
            });
        }
    });
}


exports.getDepartmentBillabilityBasedOnLocationLatest = function(req, res) {
    var previous10days = new Date('2016, 2, 21');
    previous10days = new Date(previous10days.setDate(previous10days.getDate() - 10));
    DepartmentBillabilityBasedOnLocation.find({"date": {"$gte": previous10days, "$lte": new Date('2016, 2, 21')}, "location": req.params.location}, function(err, resultSet) {
        if (err) {
            logger.error("Error in fetching" + err);
            res.json({
                status: 500,
                message: 'Error'
            });
        } else {
            console.log("result fetched");
            res.json({
                status: 200,
                success: true,
                result: resultSet
            });
        }
    });
}

exports.getDepartmentBillabilityBaseOnVerticalLatest = function(req, res) {
    var previous10days = new Date('2016, 2, 21');
    previous10days = new Date(previous10days.setDate(previous10days.getDate() - 10));
    DepartmentBillabilityBasedOnVertical.find({"date": {"$gte": previous10days, "$lte": new Date('2016, 2, 21')}, "vertical": req.params.vertical}, function(err, resultSet) {
        if (err) {
            logger.error("Error in fetching" + err);
            res.json({
                status: 500,
                message: 'Error'
            });
        } else {
            console.log("result fetched");
            res.json({
                status: 200,
                success: true,
                result: resultSet
            });
        }
    });       
}