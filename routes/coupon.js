var express = require('express');
var router = express.Router();
const connection = require('../db');
const authCheck = require('../authCheck');
const { getRepository } = require('typeorm');

router.get('/', authCheck, function(req, res, next) {
  res.render('./coupon');
});

  router.post('/', authCheck, async function(req, res, next) { 
    const catchCoupon = {
      coupon_name: req.body.coupon_name
    };
  
    const couponRepository = getRepository('coupon');
    const storeRepository = getRepository('store');
    const availablestoreRepository = getRepository('available_stores');
  
  
    let c_data = await couponRepository.find({coupon_name: catchCoupon.coupon_name});
  
    let as_data = await availablestoreRepository.find({coupon_id: c_data[0].coupon_id});
  
    let arr = [];
    let s_data = [];

    if (as_data.length > 0){
    for(var j=0; j < as_data.length; j++) {
    arr.push(await storeRepository.find({store_id: as_data[j].store_id}));
    };
  } else {
    s_data.push();
  }

    if (arr.length > 1){
    for (var x=0; x < arr.length; x++){
      for (var y=0; y < arr[y].length; y++){
        s_data.push(arr[x][y]);
      }
    }
  } else if (arr.length === 1){
    s_data.push(arr[0][0]);
  } 

  console.log(s_data[0]);
  
    res.render('./coupon', { 
      title: req.body.coupon_name,
      coupon_data: c_data, 
      store_data: s_data,
     }); 
});

router.get('/reg_effect', authCheck, function(req, res, next) {
  res.render('./coupon/reg_effect');
});

router.post('/reg_effect', authCheck, async function(req, res, next) { 
  const updateEffect = {
    coupon_name: req.body.coupon_name,
    effect: req.body.effect
  };
  
  (await connection)
  .getRepository('coupon')
  .update({coupon_name: updateEffect.coupon_name}, {effect: updateEffect.effect})
  .then((newEffect) => {
    console.log(newEffect);
    res.redirect('../');
  })
  .catch(error => {
    console.log(error)
    res.render('../', {error: ''});
  });
});

router.get('/reg_stores', authCheck, function(req, res, next) {
  res.render('./coupon/reg_stores');
});

router.post('/reg_stores', authCheck, async function(req, res, next) { 
  const newStore = {
    store_name: req.body.store_name,
    info: req.body.info,
    adress: req.body.adress
  };

  let storeRepository = getRepository('store');
  let couponRepository = getRepository('coupon');

  let serchStore = await storeRepository.find({store_name: newStore.store_name});

  if (serchStore.length === 0) {

  let inStore = await storeRepository.save(newStore);

  console.log(inStore);

  }

  let serchCoupon = await couponRepository.find({coupon_name: req.body.coupon_name});
  serchStore = await storeRepository.find({store_name: newStore.store_name});

  const newAS = {
    coupon_id: serchCoupon[0].coupon_id,
    store_id: serchStore[0].store_id
  };

  // await asRepository.save(newAS);

  // let serchAS = await asRepository.find({coupon_id: serchCoupon[0].coupon_id});

  //   let arr2 = [];
  //   let serchStore2 = [];

  //   if (serchAS.length > 0){
  //   for(var j=0; j < serchAS.length; j++) {
  //   arr2.push(await storeRepository.find({store_id: serchAS[j].store_id}));
  //   };
  // } else {
  //   serchStore2.push();
  // }

  //   if (arr2.length > 1){
  //   for (var x=0; x < arr2.length; x++){
  //     for (var y=0; y < arr2[y].length; y++){
  //       serchStore2.push(arr2[x][y]);
  //     }
  //   }
  // } else if (arr2.length === 1){
  //   serchStore2.push(arr2[0][0]);
  // } 

  // res.render('../coupon', { 
  //   title: req.body.coupon_name,
  //   coupon_data: serchCoupon, 
  //   store_data: serchStore2,
  //  }); 

  (await connection)
  .getRepository('available_stores')
  .save(newAS)
  .then((saveAS) => {
    console.log(saveAS);
    res.redirect('../');
  })
  .catch(error => {
    console.log(error)
    res.render('../', {error: ''});
  });

});

module.exports = router;