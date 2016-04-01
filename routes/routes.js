var express = require('express');
var router = express.Router();
var multer = require('multer');
var excel = require('node-excel-export');

var parseBillabilityData = require('../automated_task/parseBillabilityData.js');
var parseFinancialData = require('../automated_task/parseFinanceData.js');

var OverallBillability = require('../controllers/billabilityController.js');
var LevelBillability = require('../controllers/levelBillabilityController.js');
var DepartmentBillability = require('../controllers/departmentBillabilityController.js');
var PracticeBillability = require('../controllers/practiceBillabilityController.js');

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

//Routes for overal Billability
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
router.get('/getlevelBillabilityLocation/:location', LevelBillability.getLevelBillabilityLocationLatest);
router.get('/getlevelBillabilityLocation/:date/:location', LevelBillability.getlevelBillabilityLocation);
router.get('/getlevelBillabilityVertical/:vertical', LevelBillability.getLevelBillabilityVerticalLatest);
router.get('/getlevelBillabilityVertical/:date/:vertical', LevelBillability.getlevelBillabilityVertical);
router.get('/getlevelBillabilityVerticalandLocation/:date/:location/:vertical', LevelBillability.getlevelBillabilityVerticalandLocation);


//Routes for Department
router.get('/getDepartmentBillability',DepartmentBillability.getDepartmentBillability)
router.get('/getDepartmentBillability/:date', DepartmentBillability.getDepartmentBillabilityDate);
router.get('/getDepartmentBillabilityBasedOnLocation/:location', DepartmentBillability.getDepartmentBillabilityBasedOnLocationLatest);
router.get('/getDepartmentBillabilityBasedOnLocation/:date/:location', DepartmentBillability.getDepartmentBillabilityBasedOnLocation);
router.get('/getDepartmentBillabilityBasedOnVertical/:vertical', DepartmentBillability.getDepartmentBillabilityBaseOnVerticalLatest);
router.get('/getDepartmentBillabilityBasedOnVertical/:date/:vertical',DepartmentBillability.getDepartmentBillabilityBasedOnVertical);
router.get('/getBillabilityTrend', OverallBillability.billabilityTrend);

//Routes for Practice Billability
router.get('/getPracticeBillability', PracticeBillability.getPracticeBillability);
router.get('/getPracticeBillability/:date', PracticeBillability.getPracticeBillabilityOnDate);
router.get('/getLocationPracticeBillability/:location', PracticeBillability.getLocationPracticeBillability);
router.get('/getLocationPracticeBillability/:date/:location', PracticeBillability.getLocationPracticeBillabilityOnDate);
router.get('/getVerticalPracticeBillability/:vertical', PracticeBillability.getVerticalPracticeBillability);
router.get('/getVerticalPracticeBillability/:date/:vertical', PracticeBillability.getVerticalPracticeBillabilityOnDate);

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
                if(req.body.financeOption == 'Vertical') {
                    parseFinancialData.parseFinancialDataForVertical('Vertical', req.body.verticalName); 
                    res.json({
                        status: 200,
                        success: true,
                        errorCode: 0,
                        desc: 'Financial Data uploaded!'
                    });
                } else {
                    parseFinancialData.parseFinancialDataForProject('Project', req.body.clientName, req.body.projectName, req.file.filename);
                    res.json({
                       status: 200,
                        success: true,
                        errorCode: 0,
                        desc: 'Financial Data uploaded!'
                    });
                }
                
            }
        }
    });
});

 

module.exports = router;