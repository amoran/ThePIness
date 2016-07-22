var express = require('express');
var router = express.Router();
var Database = require('../database/database.js');


router.route('/')
	.get(function(req,res) {
		var database = new Database(readyCallback);


		function getPizzasCallback(result) {
			console.log(result);

			database.closeDatabase();
			res.json({ message: result});

		}

		function readyCallback(isReady) {
			if (isReady)
				database.getPizzas(getPizzasCallback);

		}

});

module.exports = router;