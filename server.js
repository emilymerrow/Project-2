// load the env consts
require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
// session middleware
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const booksRouter = require('./routes/books');
const indexRouter = require('./routes/index');

const favoritesRouter = require('./routes/favorites');

// create the Express app
const app = express();

// connect to the MongoDB with mongoose
require('./config/database');
// configure Passport
require('./config/passport');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  store: MongoStore.create({
    mongoUrl: process.env.DATABASE_URL
  }),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Add this middleware BELOW passport middleware
app.use(function(req, res, next) {
  res.locals.user = req.user; // assinging a property to res.locals, makes that said property (user) availiable in every
  // single ejs view
  next();
});

// mount all routes with appropriate base paths
app.use('/', indexRouter);
app.use('/books', booksRouter);

app.use('/favorites', favoritesRouter);





// invalid request, send 404 page
app.use(function(req, res) {
  res.status(404).send('Cant find that!');
});
module.exports = app;
