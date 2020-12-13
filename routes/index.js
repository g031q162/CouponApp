var express = require('express');
var router = express.Router();
const crypto =require('crypto');
const connection = require('../db');
const authCheck = require('../authCheck');
const today = new Date();

/* GET home page. */
router.get('/', authCheck,
function(req, res, next) {
  res.render('index', { user: req.user, year: today.getFullYear(), month: today.getMonth() + 1, date: today.getDate()});
});

router.post('/', authCheck, async function(req, res, next) {
  //期限取得
});

router.get('/logout', function(req, res, next) {
  req.logout();
   res.redirect('/');
});

module.exports = router;