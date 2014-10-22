var Mongoose = require('mongoose');

var Order = new Mongoose.Schema({
	//customer: [{type: ObjectId, ref:'Customer'}],///want to be able to populate the data from elsewhere -minus the password
	product: [{type: String}],
	quantity:{type: Number},
	subtotal: {type: Number},
	taxes: {type: Number},
	total: {type: Number} //model on the server

//calculate the product times quantity for subtotal before now// is this in the server before it arrives, or is it client side?
})

module.exports = Mongoose.model('Order', Order);