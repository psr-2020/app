var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


var indexRouter = require('./routes/index');
var cuentasRouter = require('./routes/accounts');
var reviewsRouter = require('./routes/reviews');
var gamesRouter = require('./routes/games');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/accounts', cuentasRouter);
app.use('/reviews', reviewsRouter);
app.use('/games', gamesRouter);

module.exports = app;
