var path = require('path');
var router = require('express').Router();

router.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '../views/index.html'));
});


module.exports = router;