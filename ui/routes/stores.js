var express = require('express');
var router = express.Router();

router.route('/')
	.get(function(req, res) {
		res.json({ message: 'API is running. Use /api/{route} to access it.' });
	}
});

module.exports = router;