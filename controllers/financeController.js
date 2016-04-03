var logger = require('../utils/loggerUtil.js').logger;
var Finance = require('../models/financeBasedOnVertical.js');

/*exports.getVertical = function(req, res) {
  Finance.find({}, function(err, resultSet) {
      if(err) {
          logger.error("Error while fetching: " + err);
          res.json({status: 500, success: false, message: 'Error while fetching'});
      } else if(!resultSet) {
          logger.error("No data");
          res.json({status: 404, success: false, message: 'Not data'});
      } else {
          logger.info("Vertical Result fetched");
          res.json({status: 200, success: true, result: resultSet});
      }
  });  
};*/


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