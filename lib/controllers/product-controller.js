"use-strict";

var ProductService = require('../services/product-service');

module.exports.get = function(req, res){
	ProductService.getAllProducts()  //calls to our service to get all products
		.then(function(products){
			res.json(products);
		}).catch(function(err){
			res.status(500).json(err) /// catching is from bluebird- it handles any problems in the call chain whether in teh controller, the service or the server
		})
}
//your id should really only be one value
module.exports.getProductById = function(req, res){
	var id = req.params.id;
	ProductService.getProduct(id)
		.then(function(product){
			if(product){
				res.status(200).json(product)
			} else {
				res.status(404).send();
			}
			
		}).catch(function(err){
			res.status(500).json(err);
		})
}


module.exports.post = function(req, res){
	ProductService.saveProduct(req.body)
		.then(function(product){
			res.json({id: product[0]._id});
		}).catch(function(err){
			res.status(500).json(err);
		});
}

module.exports.put = function(req, res){
	if (!req.params.id){
		res.status(404).send(); //404 not found
	} else {
		ProductService.saveProduct(req.body)
		.then(function(product){
			res.send('this is the product ', product);
		})
		.catch(function(err){
			res.status(500).json(err);
		})	
	}
	
}

module.exports.delete = function(req, res){
	var id = req.params.id;
	ProductService.deleteProduct(id)
 		.then(function(){
 			res.status(200).send();
 		})
 		.catch(function(err){
 			res.status(500).json(err);
 		
		})
 }














