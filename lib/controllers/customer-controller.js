"use-strict";
var CustomerService = require('../services/customer-service');


module.exports.get = function(req, res){
	CustomerService.getAllCustomers()
		.then(function(customers){ //grabbing the data that comes back from the promise
			res.status(200).json(customers);
		}).catch(function(err){
			res.status(500).json(err);
		})
}

module.exports.post = function(req, res){
	CustomerService.saveCustomer(req.body)
		.then(function(customer){
			res.status(200).json({id: customer[0]._id});
		}).catch(function(err){
			res.status(500).json(err);
		})
}

module.exports.getCustomerById = function(req, res){
	var id = req.params.id;
	CustomerService.getById(id)
		.then(function(customer){
			if(customer){
				res.status(200).json(customer);
			} else {
				res.status(404).send();
			}
		}).catch(function(err){
			res.status(500).send();
		})
}
//This sets us up for a soft delete
module.exports.delete = function(req, res){
	var id = req.params.id;
	CustomerService.deleteCustomer(id)
		.then(function(customer){
			console.log('got back ', customer);
			customer.customerActive = false;
			res.status(200).send('Customer has been set to inactive in the db - should display false', customer);
			customer.save();
		}).catch(function(err){
			res.status(500).json(err);
		})
}


