var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PracticeBillabilityBasedOnVerticalSchema = new Schema({
	date: {
		type: Date,
		required: true
	},
	week: {
		type: String,
		required: true
	},
	practice: {
		type: String,
		required: true
	},
	vertical: {
		type: String,
		required: true
	},
	values: [Schema.Types.Mixed]
});

module.exports = mongoose.model('PracticeBillabilityBasedOnVertical', PracticeBillabilityBasedOnVerticalSchema);