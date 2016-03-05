var express = require('express');
var router = express.Router();
var multer = require('multer');

var OverallBillability = require('../controllers/billabilityController.js');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split(".")[file.originalname.split(".").length - 1 ]);
    }
});

var upload = multer({
    storage: storage
}).single('file');


router.get('/getBillability', OverallBillability.getOverallBillability);
router.get('/getOverallBillabilityBasedOnLoc',OverallBillability.getOverallBillabilityBasedOnLoc);
router.get('/getOverallBillabilityBasedOnVerticalAndLocation',OverallBillability.getOverallBillabilityBasedOnVerticalAndLocation);
router.get('/getOverallBillabilityBasedOnVertical',OverallBillability.getOverallBillabilityBasedOnVertical);

router.post('/upload', function(req, res) {
    console.log("Here");
    upload(req, res, function(err) {
       if(err) {
           console.log("Error : " + err);
           res.json({status: 500, success: false, error_code: 1, desc: err});
       } else {
           res.json({status: 200, success: true,error_code: 0, desc: 'Uploaded!'});
       }
    });
});

module.exports = router;