var express = require('express');
var router = express.Router();
var Database = require('../database/database.js');


router.route('/')
	.get(function(req,res) {
		var database = new Database(function() {});

		function getPizzasCallback(result) {

			database.closeDatabase();

		}

		database.getPizzas(getPizzasCallback);

});

module.exports = router;