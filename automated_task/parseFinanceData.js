var xlsxj = require("xlsx-to-json");
var config = require('../config.js');
var fs = require('fs');
var mongoose = require('mongoose');

var FinanceBasedOnVertical = require('../models/financeBasedOnVertical.js');

//connecting to mongodb
mongoose.connect(config.dbConnectionURL, function(err){
    if(err) console.error("Error in connecting to mongo DB" + err); 
    else console.info("Connected to MongoDB");
}); 


xlsxj({
        input: 'finance.xls',
        output: "output.json"
    }, function (err, result) {
    if (err) {
        console.error(err);
    } else {
        loadFinancialDateForVertical(result);
    }
});

function loadFinancialDateForVertical(inputResultToStore) {
    
    FinanceBasedOnVertical.remove({}, function(err) {
        if(err) {
            console.log("Error in removing data" + err);
        } else {
            for(var i=0; i<inputResultToStore.length; i++) {
                if(inputResultToStore[i].Month != 'Q1' && inputResultToStore[i].Month != 'Q2' && inputResultToStore[i].Month != 'Q3' && inputResultToStore[i].Month != 'Q4' && inputResultToStore[i].Month != 'YTD' && inputResultToStore[i].Month != '2015-16') {
                    var financeBasedOnVertical = new FinanceBasedOnVertical({
                        period: inputResultToStore[i].Month, 
                        date: new Date(Date.parse(inputResultToStore[i].Month)),
                        vertical: 'Financial & Service',
                        Revenue: [{"Plan": inputResultToStore[i].Revenue_Plan || 0, "Actual": inputResultToStore[i].Revenue_Actual || 0}],
                        DirectCostPlan: [{"Plan": inputResultToStore[i].Direct_Cost_Plan || 0, "Actual": inputResultToStore[i].Direct_Cost_Actual || 0}],
                        EmpCompensation: [{"Plan": inputResultToStore[i].Emp_Compensation_Plan || 0, "Actual": inputResultToStore[i].Emp_Compensation_Actual || 0}],
                        SubContractor: [{"Plan": inputResultToStore[i].Subcontractor_Cost_Plan || 0, "Actual": inputResultToStore[i].Subcontractor_Cost_Actual || 0 }],
                        TravelEntertainment: [{"Plan": inputResultToStore[i].Travel_Entertainment_Plan || 0, "Actual": inputResultToStore[i].Travel_Entertainment_Actual || 0}],
                        TeleCommunication: [{"Plan": inputResultToStore[i].Telecommunication_Plan || 0, "Actual": inputResultToStore[i].Telecommunication_Actual || 0}],
                        Others: [{"Plan": inputResultToStore[i].Others_Plan || 0, "Actual": inputResultToStore[i].Others_Actual || 0}],
                        TotalDirectCost: [{"Plan": inputResultToStore[i].Total_Direct_Cost_Plan || 0, "Actual": inputResultToStore[i].Total_Direct_Cost_Actual || 0}]
                    });

                    financeBasedOnVertical.save(function(err) {
                        if(err) {
                            console.log("Error in loading data " + err);
                        } else {
                            console.log("Data loaded");
                        }
                    });
                } else {
                    var financeBasedOnVertical = new FinanceBasedOnVertical({
                        period: inputResultToStore[i].Month, 
                        date: new Date(),
                        vertical: 'Financial & Service',
                        Revenue: [{"Plan": inputResultToStore[i].Revenue_Plan || 0, "Actual": inputResultToStore[i].Revenue_Actual || 0}],
                        DirectCostPlan: [{"Plan": inputResultToStore[i].Direct_Cost_Plan || 0, "Actual": inputResultToStore[i].Direct_Cost_Actual || 0}],
                        EmpCompensation: [{"Plan": inputResultToStore[i].Emp_Compensation_Plan || 0, "Actual": inputResultToStore[i].Emp_Compensation_Actual || 0}],
                        SubContractor: [{"Plan": inputResultToStore[i].Subcontractor_Cost_Plan || 0, "Actual": inputResultToStore[i].Subcontractor_Cost_Actual || 0 }],
                        TravelEntertainment: [{"Plan": inputResultToStore[i].Travel_Entertainment_Plan || 0, "Actual": inputResultToStore[i].Travel_Entertainment_Actual || 0}],
                        TeleCommunication: [{"Plan": inputResultToStore[i].Telecommunication_Plan || 0, "Actual": inputResultToStore[i].Telecommunication_Actual || 0}],
                        Others: [{"Plan": inputResultToStore[i].Others_Plan || 0, "Actual": inputResultToStore[i].Others_Actual || 0}],
                        TotalDirectCost: [{"Plan": inputResultToStore[i].Total_Direct_Cost_Plan || 0, "Actual": inputResultToStore[i].Total_Direct_Cost_Actual || 0}]
                    });

                    financeBasedOnVertical.save(function(err) {
                        if(err) {
                            console.log("Error in loading data " + err);
                        } else {
                            console.log("Data loaded");
                        }
                    });
                }       
            }      
        }
    })        
}