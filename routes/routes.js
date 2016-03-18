var express = require('express');
var router = express.Router();
var multer = require('multer');

var OverallBillability = require('../controllers/billabilityController.js');
var LevelBillability = require('../controllers/levelBillabilityController.js');
var parseBillabilityData = require('../automated_task/parseBillabilityData.js');
var DepartmentBillability = require('../controllers/departmentBillabilityController.js');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.originalname.split(".")[0] + '_' + datetimestamp + '.' + file.originalname.split(".")[file.originalname.split(".").length - 1]);
    }
});

var upload = multer({
    storage: storage
}).single('file');


router.get('/getDates', OverallBillability.getDates);
router.get('/getLocations/:date', OverallBillability.getLocations);
router.get('/getOverallBillability', OverallBillability.getOverallBillability);
router.get('/getOverallBillabilityBasedOnLoc/:location', OverallBillability.getOverallBillabilityBasedOnLoc);
router.get('/getOverallBillabilityBasedOnVerticalAndLocation', OverallBillability.getOverallBillabilityBasedOnVerticalAndLocation);
router.get('/getOverallBillabilityBasedOnVertical/:vertical', OverallBillability.getOverallBillabilityBasedOnVertical);



router.get('/getOverallBillabilityBasedOnLoc/:location/:date', OverallBillability.getOverallBillabilityBasedOnLocdate);
router.get('/getOverallBillabilityBasedOnVertical/:vertical/:date', OverallBillability.getOverallBillabilityBasedOnVerticaldate);
router.get('/getOverallBillabilityBasedOnVerticalAndLocation/:date', OverallBillability.getOverallBillabilityBasedOnVerticalAndLocationdate);
router.get('/getOverallBillability/:date', OverallBillability.getOverallBillabilitydate);

//Routes for Level Billability
router.get('/getlevelBillability', LevelBillability.getlevelBillability);
router.get('/getlevelBillability/:date', LevelBillability.getlevelBillabilityDate);
router.get('/getlevelBillabilityLocation/:date/:location', LevelBillability.getlevelBillabilityLocation);
router.get('/getlevelBillabilityVertical/:date/:vertical', LevelBillability.getlevelBillabilityVertical);
router.get('/getlevelBillabilityVerticalandLocation/:date/:location/:vertical', LevelBillability.getlevelBillabilityVerticalandLocation);


//Routes for Department
router.get('/getDepartmentBillability/:date', DepartmentBillability.getDepartmentBillability);
router.get('/getDepartmentBillabilityBasedOnLocation/:date/:location', DepartmentBillability.getDepartmentBillabilityBasedOnLocation);
router.get('/getDepartmentBillabilityBasedOnVertical/:date/:vertical',DepartmentBillability.getDepartmentBillabilityBasedOnVertical);

router.get('/getBillabilityTrend', OverallBillability.billabilityTrend);


router.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            console.log("Error : " + err);
            res.json({
                status: 500,
                success: false,
                errorCode: 1,
                desc: err
            });
        } else {
            if (req.body.option == 'billability') {
                console.log("Billability Data uploaded, data is being processed for insertion");
                parseBillabilityData.parseBillabilityData(req.file.filename);
                res.json({
                    status: 200,
                    success: true,
                    errorCode: 0,
                    desc: 'Uploaded!'
                });
            } else if (req.body.option == 'financial') {
                console.log("Financial Data uploaded, data is being processed for insertion");
                res.json({
                    status: 200,
                    success: true,
                    errorCode: 0,
                    desc: 'Uploaded!'
                });
            }
        }
    });
});

module.exports = router;