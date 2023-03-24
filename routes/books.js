
const express = require('express');
const router = express.Router();
const booksCtrl = require('../controllers/books');

router.get('/', booksCtrl.index);  // Get all books and render the index view
router.get('/new', booksCtrl.new);  // Render a form to create a new book
router.get('/:id', booksCtrl.show);   // Get a single book by ID and render the show view
router.post('/', booksCtrl.create);   // Create a new book and redirect to its show view
router.post('/:id/favorite', booksCtrl.toggleFavorite); //favorites functionality



// Favorite a book
router.post('/books/:id/favorite', function(req, res) {
    // logic to add book to favorites for current user
  });
  
  // Unfavorite a book
  router.delete('/books/:id/favorite', function(req, res) {
    // logic to remove book from favorites for current user
  });