var express = require('express');
var router = express.Router();
const crypto =require('crypto');
const connection = require('../db');
const authCheck = require('../authCheck');

router.get('/', authCheck, function(req, res, next) {
    res.render('/coupon_info', {error: ''});
  });

  router.post('/', authCheck, async function(req, res, next) { //クーポン情報挿入

  });

  router.get('/period', authCheck, function(req, res, next) {
    res.render('index', {error: ''});
});

router.post('/period', authCheck, async function(req, res, next) {　//期限挿入
    const newCowpon = {
//      user_id: ,  req.user
//     copupon_id: ,  req.body.coupon_name
        number: req.body.number,
        expire_date: req.body.expire_date,
      };
      console.log(newCoupon);
      (await connection)
      .getRepository('period')
      .save(newCoupon)
      .then((saveCoupon) => {
        console.log(saveCoupon);
        res.redirect('../index');
      })
      .catch(error => {
        console.log(error)
        res.render('../index', {error: ''});
      });
    });

router.get('/available_stores', authCheck, function(req, res, next) {
    res.render('/coupon_info', {error: ''});
});

router.post('/available_stores', authCheck, async function(req, res, next) { //店情報挿入

});