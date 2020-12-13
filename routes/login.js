var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
const error = req.session.error;
req.session.error = '';
res.render('login', {error});
});


module.exports = router;