const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const movie = require('./routes/movie');
const director=require('./routes/director');

const app = express();

//mongoDB bağlama
const db=require('./helper/db.js')();

//Config
const config=require('./config');
//global olarak kullanmak için atama yapılır.
app.set('api_secret_key',config.api_secret_key);

//Middleware dosyası
const verifyToken=require('./middleware/verify-token')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//api altındaki her türlü endpoint için geçerli
app.use('/api',verifyToken);
//movie dosyasına yönlendirmek için
app.use('/api/movie',movie);
//director dosyasına erişmek için
app.use('/api/directors',director);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //var olan hata mesajını kendimize göre uyarlıyoruz.
  //movie.js dosyasında bağlantı kullanılıyor.
  res.json({error: {message: err.message, code: err.code}});
});

module.exports = app;
