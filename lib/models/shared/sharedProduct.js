"use-strict";
module.exports = {
	name: {type: String, required: true, unique: true},
	price: {type: Number, precision: 2, required: true}, //is it easier to pass price around as  number or a string? number, append $ sign on front end
	description: {type: String},
	availability: {type: Boolean, default:true}
}