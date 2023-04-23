var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var logger = require('morgan');
const mongoose = require("mongoose");
const expressLayouts = require('express-ejs-layouts')


const dotenv = require("dotenv");
dotenv.config();
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, },
  () => {
    console.log(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  }
);

var indexRouter = require('./routes/index');
//var lteRouter = require('./routes/lte');

//var usersRouter = require('./routes/users');
var apiCategory=require('./api/add-category');
var apiUser=require('./api/user');


var app = express();

// middleware for static files like css,images
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.engine('ejs', require('express-ejs-extend')); // add this line

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//app.set('view engine', 'ejs');
//app.use(expressLayouts);

app.use(logger('dev'));
app.use(express.json());

// setting the parser
//app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/api',apiCategory);
app.use('/apiuser',apiUser);
//app.use('/lte',lteRouter);



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
  //res.render('error');
  res.status(404).json({
    error:"page not found"
  });

  res.status(500).json({
    error:"Internal server error"
  });
  

});

app.listen(process.env.PORT, () => {
  console.log("Backend server is running!");
});

module.exports = app;
