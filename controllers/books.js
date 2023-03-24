const BookModel = require ('../models/book');


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
    //setthe favorite value to fakse by default
    req.body.favorite = false;
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

