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
  res.render('users/create');
});

router.post('/create', async function(req, res, next) {
  const newUser = {
    username: req.body.username,
    password: crypto.createHash('sha256').update(req.body.password).digest('hex'),
    password2: crypto.createHash('sha256').update(req.body.password2).digest('hex')
  };
  if (newUser.password !== newUser.password2) {
    req.session.error = 'failed';
    res.redirect('/');
  } else {
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
    res.render('users/create', {error: 'アカウントの作成に失敗しました'});
  });
  }
});

router.get('/delete', authCheck, function(req, res, next) {
  res.render('users/delete');
});

router.post('/delete', authCheck, async function(req, res, next) {
  const deleteUser = {
    username: req.body.username,
    password: crypto.createHash('sha256').update(req.body.password).digest('hex'),
    password2: crypto.createHash('sha256').update(req.body.password2).digest('hex')
  };
  if (deleteUser.password !== deleteUser.password2) {
    req.session.error = 'failed';
    res.redirect('/');
  } else {
  (await connection)
  .getRepository('users')
  .delete({username: deleteUser.username}, {password: deleteUser.password})
  .then(() => {
    req.logout();
    res.redirect('/');
  })
  .catch(error => {
    console.log(error)
    res.render('users/delete', {error: 'アカウントの削除に失敗しました'});
  });
}
});

router.get('/update', function(req, res, next) {
  res.render('users/update');
});

router.post('/update', async function(req, res, next) {
    const updateUser = {
      username: req.body.username,
      password: crypto.createHash('sha256').update(req.body.password).digest('hex'),
      password2: crypto.createHash('sha256').update(req.body.password2).digest('hex')
    };
    if (updateUser.password !== updateUser.password2) {
      req.session.error = 'failed';
      res.redirect('/');
    } else {
    (await connection)
    .getRepository('users')
    .update({username: updateUser.username}, {password: updateUser.password})
    .then((newUser) => {
      console.log(newUser);
      res.redirect('/');
    })
    .catch(error => {
      console.log(error)
      res.render('users/update', {error: 'パスワードの更新に失敗しました'});
    });
  }
});

module.exports = router;
