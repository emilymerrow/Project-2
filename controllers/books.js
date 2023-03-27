const BookModel = require ('../models/book');
const UserModel = require('../models/user');

module.exports = {
    new: newBook,
    create,
    index,
    show,
    favorite,
    unfavorite
};

function newBook(req, res) {
    res.render('books/new');
}

function create(req, res) {
    //setthe favorite value to false by default
    req.body.favorite = false;
    //Check if the favorite book was selected 
    if (req.body.isFavorite === 'on') {
        req.body.favorite = true;
    //Add the current user's id to the book's fav array
    req.body.favorites = [req.user._id];
    }

    BookModel.create(req.body) 
    .then(function(bookWeCreated){
        console.log(bookWeCreated);
        res.redirect(`/books/${bookWeCreated._id}`);
    })
    .catch(function(err) {
        console.log(err);
        res.send(err);
    });
}



function index(req, res) {
    //Find all the books in the database
    BookModel.find({})
    .then(function(allBooks) {
        res.render('books/index', { books: allBooks});
    })
    .catch(function(err) {
    console.log(err);
    res.send(err);
});
}

function show(req, res) {
    console.log(req.user, " <- this is req.user");
    BookModel.findById(req.params.id)
      .populate('favorites') // pass the name of the key, with the id/id's
      .exec() // to execute the populate
      .then(function(bookDoc){
        console.log(bookDoc); // <- bookDoc is the object from the database!
  
        // Goal: TO find all of the users that have favorited the book
        // 1. find the book (bookDoc) so we know what users have favorited it
        // 2. Use the UserModel to query the users collection to find all the users
        // whose id is in the bookDoc.favorites array
        UserModel.find(
          {_id: {$in: bookDoc.favorites}} // find all the users whose ids are in ($in) the bookDoc.favorites array
        ).then(function(usersWhoFavoritedBook){
          res.render('books/show', { 
            book: bookDoc, // this has the favorites array, the users who favorited the book
            usersWhoFavoritedBook // this is for our dropdown menu
          });
        })
        .catch(function(err){
          console.log(err);
          res.send(err);
        });
      })
      .catch(function(err){
        console.log(err);
        res.send(err);
      });
  }

function favorite(req, res) {

}

function unfavorite(req, res){

}