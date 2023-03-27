const express = require('express'); //imports the express and creates a new 'router' object
const router = express.Router();    //used to define routes for app
const favoriteCtrl = require('../controllers/favorites');

// Favorite a book
//router.post('/books/:id/favorites', favoriteCtrl.create);
router.post('/books/:id/favorites', function(req, res) {
    // add code to favorite a book for current user
  });

//unfavorite a book

//router.delete('/books/:id/favorites', function(req, res) {
//router.delete('/books/:id/favorites', favoriteCtrl.delete);


module.exports = router;
