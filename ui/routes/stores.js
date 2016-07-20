var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'mysql123',
	database: 'pizza'
});

connection.connect();

function endConnection() {
	connection.end();
}

router.get('/', function(req,res) {


	var result = 'oops';
	connection.query('SELECT * FROM STORES', function(err, rows, fields) {
		if (err) throw err;
		result = rows[0];
		console.log('The solution is: ', rows[0]);
		res.json({ stores: 'Result: '+ JSON.stringify(result) });
	});

});

module.exports = router;