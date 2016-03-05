var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var overallBillableNonbillableSchema = new Schema({
    week: {
        type: String,
        required: true
    },
    value: [Schema.Types.Mixed]
});

module.exports = mongoose.model('OverallBillableNonBillable', overallBillableNonbillableSchema);