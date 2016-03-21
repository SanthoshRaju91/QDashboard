var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var levelBillabilityBasedOnVerticalSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    week: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    vertical: {
        type: String,
        required: true
    },
    values: [Schema.Types.Mixed]
});

module.exports = mongoose.model('LevelBillabilityBasedOnVertical', levelBillabilityBasedOnVerticalSchema);