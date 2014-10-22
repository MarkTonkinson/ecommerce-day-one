var app = angular.module('ecommerceApp',['ngRoute']);


app.config(['$routeProvider', function($routeProvider){

$routeProvider
.when('/', {
	templateUrl: 'templates/product-list.html',
	controller: 'productCtrl'
})
.when('/customersList', {
	templateUrl: 'templates/customer-list.html',
	controller: 'customerCtrl'
})
.when('/newCustomer', {
	templateUrl: 'templates/create-edit-customer.html',
	controller: 'editCtrl',
	controller: 'createCtrl'
})
.when('/newProduct', {
	templateUrl: 'templates/create-edit-product.html'
})
.when('customer/:customer/details',{
	templateUrl: 'templates/customer-details.html',
	controller: 'customerCtrl',
	resolve: {}
})
.when('/product/:productName',{
	templateUrl: 'templates/product-details.html',
	controller: 'productCtrl',
	resolve: {}
})
.otherwise({
	redirectTo: '/'
});



}]);