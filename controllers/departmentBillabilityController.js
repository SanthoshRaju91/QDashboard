var DepartmentBillability = require('../models/departmentBillability.js');
var DepartmentBillabilityBasedOnLocation = require('../models/departmentBillabilityBasedOnLocation.js');
var DepartmentBillabilityBasedOnVertical = require('../models/departmentBillabilityBasedOnVertical.js');
var logger = require('../utils/loggerUtil.js').logger;


exports.getDepartmentBillability = function (req, res) {
    DepartmentBillability.find({"week": req.params.date}, function (err, resultSet) {
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