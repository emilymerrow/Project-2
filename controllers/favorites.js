const BookModels = require('../models/book');




function favoriteCreate(req, res) {
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