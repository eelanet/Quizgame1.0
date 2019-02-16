const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const questionsRouter = require('./routes/questions');
const adminRouter = require('./routes/admin');
const categoriesRouter = require('./routes/categories');

const app = express();
require('./db');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(express.static(path.join(__dirname + '/public')));
app.use('/lobby', express.static(path.join(__dirname, '/public')));
app.use('/category', express.static(path.join(__dirname, '/public')));
app.use('/register', express.static(path.join(__dirname, '/public')));
app.use('/login', express.static(path.join(__dirname, '/public')));
app.use('/quiz', express.static(path.join(__dirname, '/public')));
app.use('/result', express.static(path.join(__dirname, '/public')));

// Routes
app.use(questionsRouter);
app.use(adminRouter);
app.use(categoriesRouter);

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
  res.json({
    message: err.message,
    error: err
    });
});


module.exports = app;
