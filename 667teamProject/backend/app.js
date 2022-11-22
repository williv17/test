const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {engine} = require("express-handlebars");

if(process.env.NODE_ENV === 'development') {
  require("dotenv").config();
}

const indexRouter = require('./routes/index');
const gamesRouter = require('./routes/games');
const lobbyRouter = require('./routes/lobby');
const testsRouter = require('./routes/tests');
const rulesRouter = require('./routes/rules');
const registerRouter = require('./routes/register');

const app = express();

// view engine setup
var cons = require('consolidate');

app.engine(
  'handlebars',
  engine({
      layoutsDir: path.join(__dirname, "../frontend/views/layout"), //where to look for layouts
      partialsDir: path.join(__dirname, "../frontend/views/partials"), 
      extname: ".handlebars", //expected file extension for handlebars files
      defaultLayout: "home", //default layout for app, general template for all pages in app
    
  })
);

app.set("views", path.join(__dirname, '../frontend/views'));
app.set("view engine", "handlebars");


//app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/games', gamesRouter);
app.use('/tests', testsRouter);
app.use('/lobby', lobbyRouter);
app.use('/rules', rulesRouter);
app.use('/register', registerRouter);

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
