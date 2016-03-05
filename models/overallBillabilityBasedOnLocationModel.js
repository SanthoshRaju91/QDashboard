var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var overallBillableNonbillableBasedOnLocationSchema = new Schema({
    week: {
        type: String,
        required: true
    },
    base_location:{
        type: String,
        required: true
    },
    value: [Schema.Types.Mixed]
});

module.exports = mongoose.model('OverallBillableNonBillableBasedOnLoc', overallBillableNonbillableBasedOnLocationSchema);