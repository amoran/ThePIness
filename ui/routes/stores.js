var express = require('express');
var router = express.Router();
var Database = require('../database/database.js');


router.route('/')
	.get(function(req,res) {
		var database = new Database(function() {});

		function getStoresCallback(result) {

			console.log(result);

			database.closeDatabase();
			res.json({ message: result})

		}

		database.getStores(getStoresCallback);

});

module.exports = router;