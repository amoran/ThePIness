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

  this.connection.query("SET sql_mode = 'NO_UNSIGNED_SUBTRACTION'");

}

// Public API ==================================================================
Database.prototype.closeDatabase = function(callback) {
  this.connection.end(function (err) {
  	if (!err) 
  		console.log('(Database) (closeDatabase) Closed DB.');
    return;
  });
};


var QRY_GET_CUSTOMER = 'SELECT * FROM CUSTOMERS WHERE CUSTOMER_NAME = ? ;';
var QRY_GET_CUSTOMER2 = 'SELECT * FROM CUSTOMERS WHERE CUSTOMER_ADDRESS = ? ;';

Database.prototype.getCustomer = function (name, address, callback) {
  console.log("Getting Customer");
  var _this = this;

  this.connection.query(QRY_GET_CUSTOMER, name, function (err, rows) {
    console.log("Made db call");
    if (err) {
      console.log ('(Database) (getCustomer) Error searching for customer in DB.');
      return callback(false);
    }

    if (rows.length === 0) {
      console.log ('(Database) (getCustomer) No customer found.');
      _this.connection.query(QRY_GET_CUSTOMER2, address, function (err, rows) {
        console.log("Made db call");
        if (err) {
          console.log ('(Database) (getCustomer) Error searching for customer in DB.');
          return callback(false);
        }
        if (rows.length === 0) {
          console.log ('(Database) (getCustomer) No customer found.');
          return callback(false);
        }
        console.log(rows[0]);
        return callback(true);
      });
    } else {
      console.log(rows[0]);
      return callback(true);
    }
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
    return callback(rows);
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

    return callback(rows);
  });
};

var QRY_GET_TOP = "SELECT s.STORE_NAME, p.PIZZA_NAME, COUNT(o.PIZZA_NAMES) AS NUM_PIZZAS " 
QRY_GET_TOP += "FROM pizzas AS p, stores AS s, orders AS o "
QRY_GET_TOP += "WHERE p.STORE_ID = s.STORE_ID AND o.PIZZA_NAMES LIKE CONCAT('%', p.PIZZA_NAME, '%') "
QRY_GET_TOP += "GROUP BY p.PIZZA_NAME "
QRY_GET_TOP += "ORDER BY s.STORE_NAME,NUM_PIZZAS DESC;"

Database.prototype.getTopPizzas = function (callback) {
  this.connection.query(QRY_GET_TOP, function (err, rows) {
    if (err) {
      console.log ('(Database) (getTopPizzas) Error searching for top in DB.' + err);
      return callback();
    }

    if (rows.length === 0) {
      console.log ('(Database) (getTopPizzas) No tops found');
      return callback();
    }

    return callback(rows);
  });
};



module.exports = Database;