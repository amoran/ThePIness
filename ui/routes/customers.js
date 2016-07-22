var express = require('express');
var router = express.Router();
var Database = require('../database/database.js');


router.route('/')
	.get(function(req,res) {
		var database = new Database(readyCallback);
		var customerName = req.param('name');
		var customerAddress = req.param('address');
		console.log(customerName);
		console.log(customerAddress);

		function getCustomerCallback(result) {

			console.log(result);

			database.closeDatabase();
			res.json({ message: result})

		}

		function readyCallback(isReady) {
			if (isReady)
				database.getCustomer(customerName, customerAddress, getCustomerCallback);
		}

});

module.exports = router;