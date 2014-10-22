"use-strict";
var Promise = require('bluebird');
var Product = require('../productModel.js');//this is now an object that is a schema
//remember the Product has mongoose on it

//this is bluebird promise helpers so we don't have to do weird callback returns
Promise.promisifyAll(Product);
Promise.promisifyAll(Product.prototype);//will look at all helper methods on product- ie find, findOne, etc


module.exports.getAllProducts = function(){ //doesn't need parameters because going to get all of them
	return Product.findAsync(); //bluebird findAsync instead of just find- though you could still call find	
}

module.exports.getProduct = function(id){
	return Product.findByIdAsync(id);

	// console.log("did we get an id", productid);
	// if(productid){
	// 	return Product.getByIdAsync(productid, product);
	// } else {
	// 	res.status(404).send();
	// }

} 



//save happens on a post and a put and we don't want to have to rewrite it - hence the if statement
module.exports.saveProduct = function(product){
	if(product._id){
		return Product.findByIdAndUpdateAsync(product._id, product);
	} else {
		return new Product(product).saveAsync();
	}
}


module.exports.deleteProduct = function(id){
	return Product.findByIdAndRemoveAsync(id);
}










