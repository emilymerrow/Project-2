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

function show(req, res) {
    BookModel.findById(req.params.id)
    .then(function(book){
        res.render('books/show', { book: book});
    })
    .catch(function(err){
        console.log(err);
        res.send(err);
    });
}
function favorite(req, res) {
    //Find the book by id and update the favorite value to true
    BookModel.findByIdAndUpdate(req.params.id, {favorite: false})
    .then(function(){
        res.redirect(`/books/${req.params.id}`);
    })
    .catch(function(err) {
        console.log(err);

    })
    .catch(function(err) {
        console.log(err);
        res.send(err);
    });
}