"use-strict";

module.exports = {
	phoneKind: {type: String, enum: ['home', 'cell', 'work'], required: true },
	phone: [{type: Number,   required:true}],// is this how you would write this to require at least one?  Form validation can force this, yes?
	phoneActive: {type: Boolean, default:true}
}