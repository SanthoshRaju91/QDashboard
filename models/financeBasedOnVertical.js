var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FinanceBasedOnVerticalSchema = new Schema({
    period: {
       type: String,
       required: true
    },
    date: {
        type: Date,
        required: true
    },
    vertical: {
        type: String,
        required: true
    },
    Revenue: [Schema.Types.Mixed],
    DirectCostPlan: [Schema.Types.Mixed],
    EmpCompensation: [Schema.Types.Mixed],
    SubContractor: [Schema.Types.Mixed],
    TravelEntertainment: [Schema.Types.Mixed],
    TeleCommunication: [Schema.Types.Mixed],
    Others: [Schema.Types.Mixed],
    TotalDirectCost: [Schema.Types.Mixed]
});

module.exports = mongoose.model('FinanceBasedOnVertical', FinanceBasedOnVerticalSchema);