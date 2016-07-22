var express = require('express');
var router = express.Router();
var Database = require('../database/database.js');


router.route('/')
	.get(function(req,res) {
		var database = new Database(function() {});

		var storeName = req.query['storeName'];

		function getTopPizzaCallback(result) {

			console.log(result);

			database.closeDatabase();
			res.json({ message: result})

		}

		database.getTopPizzas(getTopPizzaCallback);

});

module.exports = router;