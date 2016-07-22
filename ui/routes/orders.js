var express = require('express');
var router = express.Router();
var Database = require('../database/database.js');


router.route('/')
	.get(function(req,res) {
		var database = new Database(function() {});

		function getOrdersCallback(result) {

			database.closeDatabase();

		}

		database.getOrders(getOrdersCallback);

	})
	.post(function(req,res) {
		var database = new Database(function() {});
		var name = req.param('name');
		var address = req.param('address');
		var store = req.param('store');
		var pizza = req.param('pizza');
		console.log('Got post request');

		function putOrderCallback(result) {

			console.log(result);

			database.closeDatabase();
			res.json({ message: result});

		}

		function readyCallback(isReady) {
			if (isReady)
				database.putOrder(putOrderCallback);

		}
	});

module.exports = router;