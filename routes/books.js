
const express = require('express');
const router = express.Router();
const booksCtrl = require('../controllers/books'); // imports the books controller module and assigns it to the booksCtrl variable for use in defining book-related routes.
const isLoggedIn = require('../config/auth')      //  imports the auth middleware module from the ../config directory and assigns it to the isLoggedIn variable for use in checking if a user is authenticated
const BookModel = require('../models/book');      // imports the book model module and assigns it to the BookModel variable for use in defining and manipulating book-related data in the application.

//in this route the user is making a GET request to the server.
// `/` is the path that user will follow (root path/main page) 
// `booksCtrl.index` is the funct. that will be executed when the user visits the root path

router.get('/', booksCtrl.index);  // route for handling GET requests to / and maps the request to the index function in the booksCtrl controller
                                   //and renders a list of all the books


router.get('/new', booksCtrl.new);  // route for handling GET requests to /new and maps the request to the new function in the booksCtrl controller
                                    // for rendering a form to create a new book.

router.get('/:id', booksCtrl.show);   //  route for handling GET requests to /:id and maps the request to the show function in the booksCtrl controller,
                                      //to display the details of the book with the specified :id


router.post('/',isLoggedIn, booksCtrl.create);  // route to handle POST requests to /, requiring the user to be logged in (using isLoggedIn middleware) 
                                                //and sends the request to the create function in the booksCtrl controller, to create a new book.



router.post('/:id/favorite', booksCtrl.favorite); // sends a POST request to /:id/favorite , 
                                                  //which sends the request to the favorite function in the booksCtrl controller
                                                  //to add a book with a specific :id to user's list of favorites


  
  //Unfavorite a book
  router.delete('/:id/favorite',booksCtrl.delete);

  module.exports = router;