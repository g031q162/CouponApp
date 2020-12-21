var express = require('express');
var router = express.Router();
const authCheck = require('../authCheck');
const connection = require('../db');
const today = new Date();
const { getRepository, Raw } = require('typeorm');



/* GET home page. */
router.get('/', authCheck, async function(req, res, next) {

const periodRepository = getRepository('period');

let results = await periodRepository.find({
  where: {
    user_id: req.user.user_id, 
    expire_date: Raw(alias => `${alias} > NOW()`),
    number: Raw(alias => `${alias} > 0`),
    used: 0
  },
  order: {expire_date: 'ASC'}
});

console.log(results);

let couponRepository = getRepository('coupon');

let arr = [];
for(var j=0; j < results.length; j++) {
arr.push(await couponRepository.find({coupon_id: results[j].coupon_id}));
};

console.log(arr);

let name = [];
if (arr.length > 1){
for (var x=0; x < arr.length; x++){
  for (var y=0; y < arr[y].length; y++){
    name.push(arr[x][y]);
  }
}
} else if (arr.length === 1){
  name.push(arr[0][0]);
} 

console.log(name);

res.render('index', { 
  user: req.user, 
  data: results, 
  data2: name,
  year: today.getFullYear(), 
  month: today.getMonth() + 1, 
  day: today.getDate()
 }); 

});

router.post('/', authCheck, async function(req, res, next) {
  const newCoupon = {
    coupon_name: req.body.coupon_name
  };

  const couponRepository = getRepository('coupon');

  let serchCoupon = await couponRepository.find({coupon_name: newCoupon.coupon_name});

  if (serchCoupon.length === 0 ) {

  console.log(newCoupon);

  let inCoupon = await couponRepository.save(newCoupon);

    console.log(inCoupon);

  }

  serchCoupon = await couponRepository.find({coupon_name: newCoupon.coupon_name}); 

  const newPeriod = {
        user_id: req.user.user_id,
        coupon_id: serchCoupon[0].coupon_id,
        number: req.body.number,
        expire_date: req.body.expire_date,
      };
      console.log(newPeriod);
      (await connection)
      .getRepository('period')
      .save(newPeriod)
      .then((savePeriod) => {
        console.log(savePeriod);
        res.redirect('./');
      })
      .catch(error => {
        console.log(error)
        res.render('./', {error: ''});
      });
});

router.post('/used', async function(req, res, next) {
  const useCoupon = {
    period_id: req.body.period_id,
    used_number: req.body.used_number
  };

  const periodRepository = getRepository('period');
  const serchPeriod = await periodRepository.find({period_id: useCoupon.period_id});

  if (serchPeriod[0].number - useCoupon.used_number < 1) {
  await periodRepository.update({period_id: useCoupon.period_id}, {used: 1});
  }

  (await connection)
  .getRepository('period')
  .update({period_id: useCoupon.period_id}, {number: serchPeriod[0].number - useCoupon.used_number})
  .then((newCoupon) => {
    console.log(newCoupon);
    res.redirect('/');
  })
  .catch(error => {
    console.log(error)
    res.render('/', {error: ''});
  });
});

router.get('/logout', function(req, res, next) {
  req.logout();
   res.redirect('/');
});

module.exports = router;