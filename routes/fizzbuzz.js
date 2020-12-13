var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:userId', function(req, res, next) { 
    if (req.isAuthenticated()) {
    return next();
  }
  req.session.error = 'login failed';
  res.redirect('/login');
},
function(req, res, next) {
if (req.user.username === 'yudai') {

    let x = 0;
    let arr = [];

 while (x < req.params.userId) {
   x += 1;
   if (x % 15 === 0) {
     arr.push('FizzBuzz');
   } else if (x % 3 === 0) {
     arr.push('Fizz');
   } else if (x % 5 === 0) {
     arr.push('Buzz');
   } else {
     arr.push(x);
   }
 }
   let fizzbuzz = arr.join(', ');
   res.send(fizzbuzz); 
}else{
  req.logout();
  req.session.error = 'This is an unsupported user';
  res.redirect('/login');
}
});




module.exports = router;