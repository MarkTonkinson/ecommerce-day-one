"use-strict";


var Promise = require('bluebird');
var Customer = require('../customerModel.js');

Promise.promisifyAll(Customer);
Promise.promisifyAll(Customer.prototype);


module.exports.getAllCustomers = function(){
	return Customer.findAsync();
}

module.exports.saveCustomer = function(customer){
	if(customer._id){
		return Customer.getByIdAsync(customer_id, customer);
	} else {
		return new Customer(customer).saveAsync();
	}
}

module.exports.getById = function(id){
	console.log('id', id);
	return Customer.findByIdAsync(id);
}

module.exports.deleteCustomer = function(id){
	return Customer.findByIdAsync(id);
	
}