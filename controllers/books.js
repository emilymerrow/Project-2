

const BookModel = require("../models/book"); // import the BookModel from the models/book
const UserModel = require("../models/user");  //import the UserModel from the models/user
 


// Exporting the functions for external use
module.exports = {
  new: newBook,
  create,
  index,
  show,
  favorite,
  delete: deleteFavorite
};

//Renders a form to create a New Book
function newBook(req, res) { 
  res.render("books/new"); // sends an HTTP response back to the client by rendering a view named "books/new"
}


   // Creates a new book document in the BookModel collection.
  //  Redirects to the newly created book's page.
 //   Handles errors by sending the error message to the client
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


 // Fetches and displays all the books from the BookModel collection(all the books in the database)
//  this function handles a GET request to the "/books" endpoint
function index(req, res) {

  //Find all the books in the database (BookModel collection)
    BookModel.find({}) //BookModel.find is our mangoose model going to mongodb to find all the books in the books collection
  //when the model comes back from the database we want a function to run, and that is .then
    .then(function (allBooks) { //it renders the "index" view passing in an object with a key of "books"
      res.render("books/index", { books: allBooks });  //and a value of all the books found in the database
    })
    .catch(function (err) {   //if there is an error, it logs the error 
      console.log(err);       //and sends it as a response
      res.send(err);
    });
}


      //this function displays the details of a specific book
      //find a book by ID, populate its "favorites" property with user data
     // and render a page that shows the book's details

function show(req, res) { 
  console.log(req.user, " <- this is req.user"); //logs the user info to the console
  BookModel.findById(req.params.id)   //finds a specific book by ID passed in as a parameter
    .populate("favorites") // replaces user IDs in "favorites" with their actual user data.
    .exec() // to execute the populate
    .then(function (bookDoc) {  //if the book is found, it's passed to the .then function
      console.log(bookDoc,'this is the bookDoc for Book'); // <- bookDoc is the object from the database!

      //finds users who have favorited a book and renders the book's details page
      UserModel.find(
        { _id: { $in: bookDoc.favorites } } // find all the users who's IDs are in the book's fav array
      )
        .then(function (usersWhoFavoritedBook) {  //if book favorites are found, they're passed to the `.then`
          res.render("books/show", {     // Render the boos/show View
            book: bookDoc,        //Pass the book data
            usersWhoFavoritedBook,  //pass the users who favorited the book
          });
        })
        .catch(function (err) { //handle errors
          console.log(err);     //log the errors
          res.send(err);        //send the errors to the client
        });
    })
}


// Adds a specific book to the current user's favorites

function favorite(req, res) { //define the 'favorite' funct. with request & response parameters
  const bookId = req.params.id; //get the book Id
  BookModel.findById(bookId, {  //find the book by id and update it
    $addToSet: { favorites: req.user._id }, //add the current user's ID to the favorites array if it's not already present
  })
    .then(() => {  // Callback after the update is successful
      res.redirect(`/books/${bookId}`);  // Redirect the user to the book's details page
    })
    .catch((err) => { //handle errors during the update
      console.log(err); //log the error
      res.send(err);    // send the error to the client
    });
}

// Removes a specific book from the current user's favorites
function deleteFavorite(req, res) {  //define the function with req, res parameters
      const bookId = req.params.id;  //get the book Id from the request parameters

    BookModel.findById(bookId) // Find the book document by ID
    .then(function(bookDoc) {  //callback when the book is found
      bookDoc.favorites.pop()  // Removes the last user ID from the favorites array
      bookDoc.save()           // Save the updated book document
      res.redirect(`/books/${bookId}`); //redirect the user to the book's details page
    })
    .catch(function(err) {    //handle errors during the find and update process
      console.log(err);       // log the error
      res.send(err);          //send the error to the client
    });
  }





