"use-strict";

module.exports = {
	kind: {type: String, enum: ['Billing', 'Shipping', 'Both']},
	address: {type: String, required: true},
	address2: {type: String},
	city: {type: String, required: true},
	state: {type: String, required: true},
	zip: {type: Number, required: true},
	active: {type: Boolean, default: true}
}