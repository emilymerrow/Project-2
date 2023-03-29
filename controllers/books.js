const BookModel = require("../models/book");
const UserModel = require("../models/user");
const Book = require("../models/book");
module.exports = {
  new: newBook,
  create,
  index,
  show,
  favorite,
  unfavorite,
  delete: deleteFavorite
};

function newBook(req, res) { 
  res.render("books/new"); // sends an HTTP response back to the client by rendering a view named "books/new"
}
// the function Create creates a new document in the BookModel collection with the data passed in req.body
//and redirects the user to the newly created book's page after it has been added to the database
//if there is an error, it logs the error message and sends it to the client
function create(req, res) { 
  BookModel.create(req.body) //creates a new document in the BookModel collection with the data passed in re.body
    .then(function (bookWeCreated) {  //"then" function is called with the newly created document passed as "bookWeCreated"
      console.log(bookWeCreated);  //console log for debugging purposes
      console.log(req.body, "this is the req.body");
      res.redirect(`/books/${bookWeCreated._id}`); //user is redirected to the newly created book's page
    })                                             //after the book has been added to the database
    .catch(function (err) { //handles errors that occur when creating a new book 
      console.log(err);     //and sends the error message to the client
      res.send(err);
    });
}
//this function handles a GET request to the "/books" endpoint
function index(req, res) {
  //Find all the books in the database (BookModel collection)
  BookModel.find({})
    .then(function (allBooks) { //it renders the "index" view passing in an object with a key of "books"
      res.render("books/index", { books: allBooks });  //and a value of all the books found in the database
    })
    .catch(function (err) {   //if there is an error, it logs the error and
      console.log(err);       //and sends it as a response
      res.send(err);
    });
}

//this function displays the details of a specific book
//including the users who have favorited it
function show(req, res) { 
  console.log(req.user, " <- this is req.user"); //logs the user info to the console
  BookModel.findById(req.params.id)   //finds a specific book by ID passed in as a parameter
    .populate("favorites") // pass the name of the key, with the id/id's
    .exec() // to execute the populate
    .then(function (bookDoc) {  //if the book is found, it's passed to the then function
      console.log(bookDoc,'this is the bookDoc for Book'); // <- bookDoc is the object from the database!

      // Goal: TO find all of the users that have favorited the book
      // 1. find the book (bookDoc) so we know what users have favorited it
      // 2. Use the UserModel to query the users collection to find all the users
      // whose id is in the bookDoc.favorites array
      UserModel.find(
        { _id: { $in: bookDoc.favorites } } // find all the users whose ids are in ($in) the bookDoc.favorites array
      )
        .then(function (usersWhoFavoritedBook) {
          res.render("books/show", {
            book: bookDoc, // this has the favorites array, the users who favorited the book
            usersWhoFavoritedBook, // this is for our dropdown menu
          });
        })
        .catch(function (err) {
          console.log(err);
          res.send(err);
        });
    })
}

function favorite(req, res) {
  const bookId = req.params.id;
  BookModel.findById(bookId, {
    $addToSet: { favorites: req.user._id },
  })
    .then(() => {
      res.redirect(`/books/${bookId}`);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
}
function deleteFavorite(req, res) {
    // logic to remove book from favorites for current user
    const bookId = req.params.id;

    // Remove the current user's ID from the book's fav array
    BookModel.findById(bookId)
    .then(function(bookDoc) {
      bookDoc.favorites.pop()
      bookDoc.save()
      res.redirect(`/books/${bookId}`);
    })
    .catch(function(err) {
      console.log(err);
      res.send(err);
    });
  }

function unfavorite(req, res) {}

exports.favorite = function(req, res) {
    const bookId = req.params.id;
  
    // Add the current user's ID to the book's fav array
    BookModel.findById(bookId, {
      $addToSet: { favorites: req.user._id },
    })
    .then(function() {
      res.redirect(`/books/${[bookId]}`);
    })
    .catch(function(err) {
      console.log(err);
      res.send(err);
    });
};

