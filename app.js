var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

var connection = require('express-myconnection');
var mysql = require('mysql');
app.use(
  connection(mysql, {
    host: 'sql10.freemysqlhosting.net', //servidor do banco mysql, se for local: localhost,
    user: 'sql10262361', //usuario com permissao de conexao a base de dados
    password: 'FlZcyglvVx', //senha de acesso ao banco
    port: 3306, //porta do mysql, normalmente 3306
    database: 'sql10262361' //nome da base de dados (esquema)
  }, 'pool')
);

var cliente = require('./routes/cliente');
app.use('/cliente', cliente);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
