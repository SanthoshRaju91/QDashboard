var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var levelBillabilitySchema = new Schema({
    week: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    values: [Schema.Types.Mixed]
});

module.exports = mongoose.model('LevelBillability', levelBillabilitySchema);