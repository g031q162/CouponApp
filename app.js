var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var fizzbuzzRouter = require('./routes/fizzbuzz')
var loginRouter = require('./routes/login')
var couponRouter = require('./routes/coupon')

var app = express();

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

const crypto = require('crypto');
const connection = require('./db');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ cookie: { maxAge: 60000 }, 
  secret: 'secret',
  resave: false, 
  saveUninitialized: false}));

// const users = [
//   {
//     id: 1,
//     username: 'john',
//     password: '12345'
//   },
//   {
//     id: 2,
//     username: 'yudai',
//     password: '94162'
//   }
// ];
passport.use(new LocalStrategy(
  async function(username, password, done) {
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    const user = await (await connection).getRepository('users').findOne({username});
    console.log(user);
    if (user === undefined) {
      return done(null, false);
    }
    if (user.password !== hash) {
      return done(null, false);
    }
    return done(null, user);
  }
));

app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/',
}));
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // done(null, users.find((user) => user.id === id));
  done(null, user)
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/fizzbuzz', fizzbuzzRouter)
app.use('/login', loginRouter);
app.use('/coupon', couponRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
