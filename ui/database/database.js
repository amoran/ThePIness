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


var QRY_GET_PIZZA = 'SELECT * FROM PIZZAS WHERE STORE_ID = ? ;';

Database.prototype.getPizzas = function (store, callback) {
  var _this = this;

  this.connection.query(QRY_GET_PIZZA, store, function (err, rows) {
    if (err) {
      console.log ('(Database) (getPizzas) Error searching ' +
                         'for pizza in DB.');
      return callback();
    }

    if (rows.length === 0) {
      console.log ('(Database) (getPizzas) No pizza found with ' +
                         'store <' + store + '>.');
      return callback();
    }

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