var PracticeBillability = require('../models/practiceBillability.js');
var PracticeBillabilityBasedOnLocation = require('../models/practiceBillabilityBasedOnLocation.js');
var PracticeBillabilityBasedOnVertical = require('../models/practiceBillabilityBasedOnVertical.js');
var logger = require('../utils/loggerUtil.js').logger;

exports.getPracticeBillability = function(req, res) {
	var previous10days = new Date('2016, 2, 21');
	previous10days = new Date(previous10days.setDate(previous10days.getDate() - 10));
	PracticeBillability.find({"date": {"$gte": previous10days, "$lte": new Date('2016, 2, 21')}}, function(err, resultSet) {
		if(err) {
			logger.error("PracticeBillability: error in fetching details " + err);
			res.json({status: 500, success: false, message: 'Error in fetchin details'});
		} else {
			logger.info("PracticeBillability: fetched details");
			res.json({status: 200, success: true, result: resultSet});
		}
	});
}

exports.getLocationPracticeBillability = function(req, res) {
	var previous10days = new Date('2016, 2, 21');
	previous10days = new Date(previous10days.setDate(previous10days.getDate() - 10));
	PracticeBillabilityBasedOnLocation.find({"date": {"$gte": previous10days, "$lte": new Date('2016, 2, 21')}, "location": req.params.location}, function(err, resultSet) {
		if(err) {
			logger.error("PracticeBillabilityBasedOnLocation: Error in fetching details " + err);
			res.json({status: 500, success: false, message: 'Error in fetching details'});
		} else {
			logger.info("PracticeBillabilityBasedOnLocation: fetched details");
			res.json({status: 200, success: true, result: resultSet});
		}
	});
}

exports.getVerticalPracticeBillability = function(req, res) {
	var previous10days = new Date('2016, 2, 21');
	previous10days = new Date(previous10days.setDate(previous10days.getDate() - 10));
	PracticeBillabilityBasedOnVertical.find({"date": {"$gte": previous10days, "$lte": new Date('2016, 2, 21')}, "vertical": req.params.vertical}, function(err, resultSet) {
		if(err) {
			logger.error("PracticeBillabilityBasedOnVertical: Error in fetching details" + err);
			res.json({status: 500, success: false, message: 'Error in fetching details'});
		} else {
			logger.info("PracticeBillabilityBasedOnVertical: fetched details");
			res.json({status: 200, success: true, result: resultSet});
		}
	});
}

exports.getPracticeBillabilityOnDate = function(req, res) {
	PracticeBillability.find({"week": req.params.week}, function(err, resultSet) {
		if(err) {
			logger.error("PracticeBillability on date : Error in fetching data " + err);
			res.json({status: 500, success: false, message: 'Error in fetching data'});
		} else {
			logger.info("PracticeBillability on date : fetched details");
			res.json({status: 200, success: true, result: resultSet});
		}
	})
}

exports.getLocationPracticeBillabilityOnDate = function(req, res) {
	PracticeBillabilityBasedOnLocation.find({"week": req.params.week, "location": req.params.location}, function(err, resultSet) {
		if(err) {
			logger.error("PracticeBillabilityBasedOnLocation on date : Error in fetching data " + err);
			res.json({status: 500, success: false, message: 'Error in fetching data'});
		} else {
			logger.info("PracticeBillabilityBasedOnLocation on date : fetched details");
			res.json({status: 200, success: true, result: resultSet});
		}
	});	
}

exports.getVerticalPracticeBillabilityOnDate = function(req, res) {
	PracticeBillabilityBasedOnVertical.find({"week": req.params.week, "vertical": req.params.vertical}, function(err, resultSet) {
		if(err) {
			logger.error("PracticeBillabilityBasedOnVertical on date : Error in fetching data " + err);
			res.json({status: 500, success: false, message: 'Error in fetching data'});
		} else {
			logger.info("PracticeBillabilityBasedOnVertical on date : fetched data");
			res.json({status: 200, success: true, result: resultSet});
		}
	});
}