var express = require('express');

var CustomerController = require('./lib/controllers/customer-controller');
var ProductController = require('./lib/controllers/product-controller');
var bodyParser = require('body-parser');
var port = 8888;
var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var migrations = "yes Im using migration";
var mongoUri = 'mongodb://localhost:27017/ecommerce'

//Mongoose Connection
Mongoose.connect(mongoUri);
var connection = Mongoose.connection;
connection.once('open', function(){
	console.log('Successfully connect to: ' + mongoUri)

});

global.mongooseConnection = connection; //now this won't run once everywhere

//don't need these because we have moved them to a controller
// var Product = require('./lib/productModel');
// var Customer = require('./lib/customerModel');
// var Order = require('./lib/orderModel');


var app = express();

//middleware
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));



//creating a handler
//there are lots of error handling libraries for node that you can access if wanted

// ***************************PRODUCT ROUTES************************

app.get('/products', ProductController.get); //we've abstracted the callback out to the controller
	
app.get('/products/:id', ProductController.getProductById);

app.post('/products', ProductController.post); //used create rather than save

app.put('/products/:id', ProductController.put);


// 	function(req, res){
// 	var query = {name: req.params.name}; //change to query so it doesn't confuse the name
// 	console.log('query ', query);
// 	Product.findOneAndUpdate(query, req.body.product, function(err, product){
// 		console.log('producto ', product); //this console logs the data your sending in it appears . . 
// 		if(err){
// 			console.log(err);
// 		} else {
// 			product = req.body.product; // no save method needed
// 			//product.save(function(err){
// 				if (err){
// 					console.log(err);
// 				} else {
// 					res.status(200).send(product);
// 				}
// 			//})
// 		}

// 	})
// });

app.delete('/products/:id', ProductController.delete);



// 	Product.findOne({name: req.params.name} , function(err, product){
// 		if (err){
// 			console.log(err);
// 		} else {
// 			product.remove(function(err, product){
// 				if(err){
// 					console.log('Problem deleting product' ,err)
// 				} else {
// 					Product.findById(product._id, function(err, product){
// 						console.log('This should be null because product removed', product);
// 					})
// 				}
// 			});
// 		}
// 		res.status(200).send('It has been deleted');
// 	})
// })


// ***************************CUSTOMER API************************

app.get('/customers', CustomerController.get);


// 	function(req, res){
// 	Customer.find().exec(function(err, costumers){
// 		if(err){
// 			console.log('Err getting customers ', err)
// 		}
// 		res.status(200).send(costumers);
// 	})	

// })

app.post('/customers', CustomerController.post);

// 	function(req, res){
// 	console.log(req.body.customer);
// 	var newCustomer = new Customer (req.body.customer);
// 	newCustomer.save(function(err, costumer){
// 		if(err){
// 			console.log('problem posting customer', err);
// 		} else{
// 			res.status(200).send(costumer.name + ' added');
// 		}
// 	})
// })

app.get('/customers/:id', CustomerController.getCustomerById);



// 	Customer.findOne({name: req.params.name}, function(err, customer){
// 		if(err){
// 			console.log('couldnt find ' + req.params .name);
// 		}else {
// 			res.status(200).send(customer);
// 		}
// 	})
// })

// app.put('/customers/:name', function(req, res){
// 	var query = {name: req.params.name}; //change to query so it doesn't confuse the name
	
// 	Customer.findOneAndUpdate(query, req.body.customer, function(err, customer){
		 
// 		if(err){
// 			console.log(err);
// 		} else {
// 			customer = req.body.customer; // no save method needed
// 			//product.save(function(err){
// 				if (err){
// 					console.log(err);
// 				} else {
// 					res.status(200).send(customer.name + ' modified');
// 				}
// 			//})
// 		}

// 	})
	
// })

app.delete('/customers/:id', CustomerController.delete);


// 	function(req, res){
// 	Customer.findOne({name: req.params.name} , function(err, customer){
// 		console.log(customer);
// 		if (err){
// 			console.log(err);
// 		} else {
// 			customer.customerActive = false;
// 			Customer.findById(customer._id, function(err, customer){
// 				customer.customerActive = false;
// 			})
// 		}
// 		res.status(200).send('Customer has been set to inactive in the db - should display false', customer);
// 		customer.save();
// 	})
// })

app.get('/customers/:customer_id/addresses', function(req, res){
	
	Customer.findById(req.params.customer_id).exec(function(err, customer){ //don't put find by id in an object, it already knows to look for id
		
		if(err){
			console.log(err)
		} else {
			res.status(200).send('shipping: ' + customer.shippingAddress + ' billing: ' + customer.billingAddress);
		}
	})
})

//wait, what are we trying to post?? the addresses that were never included before?  This doesn't take it . . .
//but it does, the 'route/url' has the customer id, but then you still send a json object
app.post('/customers/:customer_id/addresses', function(req, res){
	Customer.findById(req.params.customer_id).exec(function(err, customer){
		if(err){
			console.log(err);
		} else {
			customer.shippingAddress = req.body.shippingAddress;
			customer.billingAddress = req.body.billingAddress;
			res.status(200).send(customer.name + "-address changed");
		}
	})
})


app.get('/customers/:customer_id/address/:id', function(req, res){ //is id billingAddress/shippingAddress?
	Customer.findById(req.params.customer_id).exec(function(err, customer){
		//console.log('the customer found by id ', customer)
		if(err){
			console.log(err);
		} else {
			var whichAddress = req.params.id;
			console.log(whichAddress , ' is the address requested');
			console.log(customer);  //why can I console log both but not the combination comes back undefined?
			res.status(200).send('I\'m cool! ' + customer[whichAddress]);//have to use this definition
		}
	})
})

app.put('/customers/:customer_id/address/:id', function(req, res){
	Customer.findById(req.params.customer_id).exec(function(err, customer){
		if(err){
			console.log(err);
		} else {

			//logic similar to above I would thing
			res.status(200).send('address modified');
		}
	})
})

app.delete('/customers/:customer_id/address/:id', function(req, res){
	Customer.findById(req.params.customer_id).exec(function(err, customer){
		if(err){
			console.log(err);
		} else { ///still this would depend on teh thing above working right . . .
			var whichAddress = req.params.id;
			customer[whichAdress].remove();
			customer.save();
		}
	})
})

app.get('/customers/:customer_id/phone-numbers', function(req, res){
	Customer.findById(req.params.customer_id).exec(function(err, customer){
		if(err){
			console.log(err);
		} else {
			res.status(200).send(customer.name + ' I should get phone number when I reseed data');
		}
	})
})

app.post('/customers/:customer_id/phone-numbers', function(req, res){
	Customer.findById(req.params.customer_id).exec(function(err, customer){
		if(err){
			console.log(err);
		} else {
			if(!customer.phone){
				console.log('no phone')
			} else {
				console.log('there is phone number here already');
				//new phoneNum = new phone module;?  would you have to require it in this main service or because it's required in the other file you don't have to?
			}

		}
	})
})

app.get('/customers/:customer_id/phone-numbers/:id', function(req, res){
	Customer.findById(req.params.customer_id).exec(function(err, customer){
		if(err){
			console.log(err);
		} else {
			var phoneNumRequested = req.params.id;

			res.status(200).send(customer.phoneNumRequested)
		}
	})
})

app.put('/customers/:customer_id/phone-numbers/:id', function(req, res){
	Customer.findById(req.params.customer_id).exec(function(err, customer){
		if(err){
			console.log(err);
		} else {
		// similar logic to what is above
		}
	})
})

app.delete('/customers/:customer_id/phone-numbers/:id', function(req, res){
	Customer.findById(req.params.customer_id).exec(function(err, customer){
		if(err){
			console.log(err);
		} else {
			var phoneNumRequested = req.params.id;
			customer.phoneNumRequested.remove();
			res.status(200).send('deleted the phone number')
		}
	})
})


//server startup
app.listen(port, function(){
	console.log('Chilling on port ' + port);
})


