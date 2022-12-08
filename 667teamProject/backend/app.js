const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { engine } = require('express-handlebars');
const mainRouter = require('./routes');

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const app = express();

app.engine(
  'handlebars',
  engine({
    layoutsDir: path.join(__dirname, '../frontend/views/layout'), //where to look for layouts
    partialsDir: path.join(__dirname, '../frontend/views/partials'),
    extname: '.handlebars', //expected file extension for handlebars files
    defaultLayout: 'home', //default layout for app, general template for all pages in app
  })
);

app.set('views', path.join(__dirname, '../frontend/views'));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//app.set('view engine', 'pug');
app.use("/", mainRouter);
app.use("/assets", express.static(path.join(__dirname, "../frontend/assets")));
app.use("/js", express.static(path.join(__dirname, "../frontend/js")));

module.exports = app;
