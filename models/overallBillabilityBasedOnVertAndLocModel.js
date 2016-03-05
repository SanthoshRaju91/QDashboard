var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var overallBillableNonbillableBasedOnVerticalAndLocationSchema = new Schema({
    week: {
        type: String,
        required: true
    },
    vertical:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    value: [Schema.Types.Mixed]
});

module.exports = mongoose.model('OverallBillableNonBillableBasedOnVerticalAndLocation', overallBillableNonbillableBasedOnVerticalAndLocationSchema);