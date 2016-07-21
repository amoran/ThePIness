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

});

module.exports = router;