var mysql = require('mysql');

function Database(callback) {

	this.connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'redr0ver',
			database: 'pizza',
	    multipleStatements: true
	});

	this.connection.connect(function (err) {
	    if (err) {
	      console.log('Error connecting to Database!' + err);
	    }
	    else {
	      console.log('Connected to Database!');
        callback(true);
	    }
	});
}

// Public API ==================================================================
Database.prototype.closeDatabase = function(callback) {
  this.connection.end(function (err) {
  	if (!err) 
  		console.log('(Database) (closeDatabase) Closed DB.');
    return;
  });
};


var QRY_GET_PIZZA = 'SELECT * FROM PIZZAS;';

Database.prototype.getPizzas = function (callback) {
  console.log("Getting Pizzas");
  var _this = this;

  this.connection.query(QRY_GET_PIZZA, function (err, rows) {
    console.log("Made db call");
    if (err) {
      console.log ('(Database) (getPizzas) Error searching ' +
                         'for pizza in DB.');
      return callback();
    }

    if (rows.length === 0) {
      console.log ('(Database) (getPizzas) No pizza found.');
      return callback();
    }
    console.log(rows[0]);
    return callback(rows[0]);
  });
};


var QRY_GET_STORES = 'SELECT * FROM STORES;';

Database.prototype.getStores = function (callback) {
  var _this = this;

  this.connection.query(QRY_GET_STORES, function (err, rows) {
    if (err) {
      console.log ('(Database) (getStores) Error searching ' +
                         'for stores in DB.');
      return callback();
    }

    if (rows.length === 0) {
      console.log ('(Database) (getPizzas) No stores found');
      return callback();
    }

    return callback(rows[0]);
  });
};



module.exports = Database;