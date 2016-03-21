var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PracticeBillabilityBasedOnLocationSchema = new Schema({
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
	location: {
		type: String,
		required: true
	},
	values: [Schema.Types.Mixed]
});

module.exports = mongoose.model('PracticeBillabilityBasedOnLocation', PracticeBillabilityBasedOnLocationSchema);