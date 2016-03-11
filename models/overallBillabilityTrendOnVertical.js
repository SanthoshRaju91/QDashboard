var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OverallBillabilityTrendOnVerticalSchema = new Schema({
   week: {
       type: String,
       required: true
   },
    data: [{
        vertical: {
            type: String,
            required: true
        },
        values: [Schema.Types.Mixed]
    }]
});

module.exports = mongoose.model('OverallBillabilityTrendOnVertical', OverallBillabilityTrendOnVerticalSchema);