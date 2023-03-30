
const express = require('express');
const router = express.Router();
const booksCtrl = require('../controllers/books');
const isLoggedIn = require('../config/auth')
const BookModel = require('../models/book');

//in this route the user is making a GET request to the server.
// `/` is the path that user will follow (root path/main page) 
// `booksCtrl.index` is the funct. that will be executed when the user visits the root path
router.get('/', booksCtrl.index);  // Get all books and render the index view
router.get('/new', booksCtrl.new);  // Render a form to create a new book
router.get('/:id', booksCtrl.show);   // Get a single book by ID and render the show view
router.post('/',isLoggedIn, booksCtrl.create);  // Create a new book and redirect to its show view
router.post('/:id/favorite', booksCtrl.favorite); //favorites functionality




  
  //Unfavorite a book
  router.delete('/:id/favorite',booksCtrl.delete);

  module.exports = router;