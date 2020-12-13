var express = require('express');
var router = express.Router();
const crypto =require('crypto');
const connection = require('../db');
const authCheck = require('../authCheck');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/create', function(req, res, next) {
  res.render('users/create', {error: ''});
});

router.post('/create', async function(req, res, next) {
  const newUser = {
    username: req.body.username,
    password: crypto.createHash('sha256').update(req.body.password).digest('hex'),
  };
  console.log(newUser);
  (await connection)
  .getRepository('users')
  .save(newUser)
  .then((saveUser) => {
    console.log(saveUser);
    res.redirect('/');
  })
  .catch(error => {
    console.log(error)
    res.render('users/create', {error: ''});
  });
});

router.get('/delete', authCheck, function(req, res, next) {
  res.render('users/delete', {error: ''});
});

router.post('/delete', authCheck, async function(req, res, next) {
  const deleteUser = {
    username: req.body.username,
    password: crypto.createHash('sha256').update(req.body.password).digest('hex'),
  };
  (await connection)
  .getRepository('users')
  .delete({username: deleteUser.username}, {password: deleteUser.password})
  .then(() => {
    req.logout();
    res.redirect('/');
  })
  .catch(error => {
    console.log(error)
    res.render('users/delete', {error: ''});
  });
});

router.get('/update', function(req, res, next) {
  res.render('users/update', {error: ''});
});

router.post('/update', async function(req, res, next) {
    const updateUser = {
      username: req.body.username,
      password: crypto.createHash('sha256').update(req.body.password).digest('hex'),
    };
    
    (await connection)
    .getRepository('users')
    .update({username: updateUser.username}, {password: updateUser.password})
    .then((newUser) => {
      console.log(newUser);
      res.redirect('/');
    })
    .catch(error => {
      console.log(error)
      res.render('users/update', {error: ''});
    });
});

module.exports = router;
