var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DepartmentBillabilityBasedOnVerticalSchema = new Schema({
    week: {
        type: String,
        required: true
    },
    vertical: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    values: [Schema.Types.Mixed]
});

module.exports = mongoose.model("DepartmentBillabilityBasedOnVertical", DepartmentBillabilityBasedOnVerticalSchema);