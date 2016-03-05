var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var overallBillableNonbillableBasedOnVerticalSchema = new Schema({
    week: {
        type: String,
        required: true
    },
    vertical:{
        type: String,
        required: true
    },
    value: [Schema.Types.Mixed]
});

module.exports = mongoose.model('OverallBillableNonBillableBasedOnVertical', overallBillableNonbillableBasedOnVerticalSchema);