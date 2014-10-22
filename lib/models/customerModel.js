var Mongoose = require('mongoose');

var Customer = new Mongoose.Schema({
	name: {type: String, required: true},
	email: {type: String, required: true},
	billingAddress: {type: String, required: true},// could you do a combo of numbers
	shippingAddress: {type: String, required: true},
	phoneKind: {type: String, enum: ['home', 'cell', 'work'], required: true },
	phone: [{type: Number,   required:true}],// is this how you would write this to require at least one?  Form validation can force this, yes?
	phoneActive: {type: Boolean, default:true},
	password: {type: String}, ///Yes?
	customerActive: {type: Boolean}, //like a soft delete
	productsOrdered: [{type: String}]
})

module.exports = Mongoose.model('Customer', Customer);