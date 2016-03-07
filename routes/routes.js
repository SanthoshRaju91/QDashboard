var express = require('express');
var router = express.Router();
var multer = require('multer');

var OverallBillability = require('../controllers/billabilityController.js');
var LevelBillability = require('../controllers/billabilityController.js');
var parseBillabilityData = require('../automated_task/parseBillabilityData.js');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        var datetimestamp = Date.now();        
        cb(null, file.originalname.split(".")[0] + '_' + datetimestamp + '.' + file.originalname.split(".")[file.originalname.split(".").length - 1 ]);
    }
});

var upload = multer({
    storage: storage
}).single('file');


router.get('/getDates', OverallBillability.getDates);
router.get('/getLevel', LevelBillability.getLevel);
router.get('/getBillability', OverallBillability.getOverallBillability);
router.get('/getOverallBillabilityBasedOnLoc/:location',OverallBillability.getOverallBillabilityBasedOnLoc);
router.get('/getOverallBillabilityBasedOnVerticalAndLocation',OverallBillability.getOverallBillabilityBasedOnVerticalAndLocation);
router.get('/getOverallBillabilityBasedOnVertical/:vertical',OverallBillability.getOverallBillabilityBasedOnVertical);



router.get('/getOverallBillabilityBasedOnLoc/:location/:date', OverallBillability.getOverallBillabilityBasedOnLocdate);
router.get('/getOverallBillabilityBasedOnVertical/:vertical/:date',OverallBillability.getOverallBillabilityBasedOnVerticaldate);
router.get('/getOverallBillabilityBasedOnVerticalAndLocation/:date',OverallBillability.getOverallBillabilityBasedOnVerticalAndLocationdate);
router.get('/getBillability/:date', OverallBillability.getOverallBillabilitydate);



//router.get('/getBillability', OverallBillability.getOverallBillability);
//router.get('/getOverallBillabilityBasedOnLoc',OverallBillability.getOverallBillabilityBasedOnLoc);
//router.get('/getOverallBillabilityBasedOnVerticalAndLocation',OverallBillability.getOverallBillabilityBasedOnVerticalAndLocation);
//router.get('/getOverallBillabilityBasedOnVertical',OverallBillability.getOverallBillabilityBasedOnVertical);

router.post('/upload', function(req, res) {
    upload(req, res, function(err) {
       if(err) {
           console.log("Error : " + err);
           res.json({status: 500, success: false, errorCode: 1, desc: err});
       } else {      
           if(req.body.option == 'billability') {
                console.log("Billability Data uploaded, data is being processed for insertion");    
                parseBillabilityData.parseBillabilityData(req.file.filename);
                res.json({status: 200, success: true, errorCode: 0, desc: 'Uploaded!'});
           } else if(req.body.option == 'financial') {
               console.log("Financial Data uploaded, data is being processed for insertion");
               res.json({status: 200, success: true, errorCode: 0, desc: 'Uploaded!'});
           }                      
       }
    });
});

module.exports = router;