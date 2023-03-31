const BookModel = require("../models/book");

module.exports = {create,show }; //export the create and show functions


//this function marks a specific book as a favorite for the current user
function create(req, res) {
  //Find the book by id
  BookModel.findById(req.params.id)  // find the book by ID
    .then(function (bookDocument) {  // Process the found book document
      console.log(bookDocument);     // log the book document in the console
      const favorite = { is_favorite: true, user_id: req.user._id };  //create a new favorite object for the book
      bookDocument.favorites[0] = favorite; //update the first favorite of the book with the new favorite object
      console.log(bookDocument);       // Log the updated book document to the console
      bookDocument.save().then(function () {  // Save the updated book document
        res.redirect(`/books/${req.params.id}`);  // Redirect to the book's page
      });
    })

    .catch((err) => {
      console.log(err);
      res.send(err);
    });
}

//displays all the favorite books of a specific user 

function show(req, res) {  
 
    BookModel.find({ 'favorites.user_id': req.params.id })  // Find all books that have the user's ID in their favorites list
    .populate({
      path: 'favorites.user_id',  // Populate the user data for each favorite book (populate = replace)
    })
    .then(function(books){   // Handle the returned books
        console.log(books);  // Log the found books to the console
        res.render("books/favorites", { // Render the "books/favorites" view with the found books
            favoriteBooks: books, 
          });
    })
    
  }