
const express = require('express'); //imports the express and creates a new 'router' object
const router = express.Router();    //used to define and handle http routes for app
const favoriteCtrl = require('../controllers/favorites'); //imports the favorites controller module and assigns it to the favoriteCtrl variable

// Favorite a book 
router.post('/books/:id/favorites', favoriteCtrl.create);  //route for handling POST requests to /books/:id/favorites
                                                          // It maps the request to the create function in the favoriteCtrl controller. 
                                                          // used to add a book with the specified :id to the user's list of favorites.  

// Show a book
router.get('/:id', favoriteCtrl.show);   // defines a route for handling GET requests to /:id. 
                                         //It maps the request to the show function in the favoriteCtrl controller
                                         // used to display the details of a favorite book



module.exports = router;
