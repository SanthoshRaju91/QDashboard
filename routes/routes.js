var express = require('express');
var router = express.Router();
var multer = require('multer');
var excel = require('node-excel-export');

var parseBillabilityData = require('../automated_task/parseBillabilityData.js');

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

router.post('/excel',function(req,res) {
                // You can define styles as json object 
                // More info: https://github.com/protobi/js-xlsx#cell-styles 
                var styles = {
                  headerDark: {
                    fill: {
                      fgColor: {
                        rgb: ''
                      }
                    },
                    font: {
                      color: {
                        rgb: ''
                      },
                      sz: 14,
                      bold: true,
                      underline: true
                    }
                  },
                  cellPink: {
                    fill: {
                      fgColor: {
                        rgb: ''
                      }
                    }
                  },
                  cellGreen: {
                    fill: {
                      fgColor: {
                        rgb: ''
                      }
                    }
                  }
                };
 
            //Array of objects representing heading rows (very top) 
            var heading = [
             /* [{value: 'a1', style: styles.headerDark}, {value: 'b1', style: styles.headerDark}, {value: 'c1', style: styles.headerDark}],*/
            //  ['a2', 'b2', 'c2'] // <-- It can be only values 
            ];

            //Here you specify the export structure 
            var specification = {
              customer_name: { // <- the key should match the actual data key 
                displayName: 'Customer', // <- Here you specify the column header 
                headerStyle: styles.headerDark, // <- Header style 
                cellStyle: function(value, row) { // <- style renderer function 
                  // if the status is 1 then color in green else color in red 
                  // Notice how we use another cell value to style the current one 
                  return (row.status_id == 1); // <- Inline cell style is possible  
                },
                width: 120 // <- width in pixels 
              },
              status_id: {
                displayName: 'Status',
                headerStyle: styles.headerDark,
                cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property 
                  return (value == 1) ? 'Active' : 'Inactive';
                },
                width: '10' // <- width in chars (when the number is passed as string) 
              },
              note: {
                displayName: 'Description', // <- Cell style 
                width: 220 // <- width in pixels 
              }
            }

            // The data set should have the following shape (Array of Objects) 
            // The order of the keys is irrelevant, it is also irrelevant if the 
            // dataset contains more fields as the report is build based on the 
            // specification provided above. But you should have all the fields 
            // that are listed in the report specification 
            var dataset = [
              {customer_name: 'IBM', status_id: 1, note: 'some note', misc: 'not shown'},
              {customer_name: 'HP', status_id: 0, note: 'some note'},
              {customer_name: 'MS', status_id: 0, note: 'some note', misc: 'not shown'}
            ]
 
        // Create the excel report. 
        // This function will return Buffer 
        var report = excel.buildExport(
          [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report 
            {
              name: 'Sheet name1', // <- Specify sheet name (optional) 
              heading: heading, // <- Raw heading array (optional) 
              specification: specification, // <- Report specification 
              data: dataset // <-- Report data 
            },
              {
              name: 'Sheet name2', // <- Specify sheet name (optional) 
              heading: heading, // <- Raw heading array (optional) 
              specification: specification, // <- Report specification 
              data: dataset // <-- Report data 
            }
          ]
        );
 
// You can then return this straight 

        res.attachment('report.xlsx'); // This is sails.js specific (in general you need to set headers) 
        return res.send(report);
}); 

module.exports = router;