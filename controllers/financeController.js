var logger = require('../utils/loggerUtil.js').logger;
var Finance = require('../models/financeBasedOnVertical.js');

var financeDates = ["Apr 2015", "May 2015", "Jun 2015", "Jul 2015", "Aug 2015", "Sep 2015", "Oct 2015", "Nov 2015", "Dec 2015", "Jan 2016", "Feb 2016"];

exports.getFinancePeriods = function(req, res) {
    logger.info("getFinancePeriods: Data fetched");
    res.json({status: 200, success: true, result: financeDates});
};


exports.getFinanceDataForVerticalQuarter = function(req, res) {
    Finance.find({vertical: req.params.vertical, period: req.params.period}, function(err, resultSet) {
        if(err) {
            logger.error("getFinanceDataForVerticalQuarter: Error while fetching data " + err);
            res.json({status: 500, success: false, message: 'Error while fetching'});
        } else if(!resultSet) {
            logger.error('getFinanceDataForVerticalQuarter: No data found');
            res.json({status: 404, success: false, message: 'Not data found'});
        } else {
            logger.info('getFinanceDataForVerticalQuarter: data fetched');
            res.json({status: 200, success: true, result: resultSet});
        }
    });
}