var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

var router = express.Router();

router.use(function(req, res, next) {
	console.log('Request received.');

	res.header("Access-Control-Allow-Origin", "localhost");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header("Access-Control-Allow-Headers", "X-Request-With, Content-Type");

	next();
});

router.use('/', require('./routes/index'));
router.use('/api/stores', require('./routes/stores'));
router.use('/api/pizzas', require('./routes/pizzas'));
router.use('/api/customers', require('./routes/customers'));
router.use('/api/orders', require('./routes/orders'));

app.use('/', router);
 app.use(express.static('./public'));

app.listen(port);
console.log('Server online (port ' + port + ')');



