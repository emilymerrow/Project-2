const BookModel = require("../models/book");

module.exports = {create };

function create(req, res) {
  //Find the book by id and update the favorite value to true
  BookModel.findById(req.params.id)
    .then(function (bookDocument) {
      console.log(bookDocument);
      const favorite = { is_favorite: true, user_id: req.user._id };
      bookDocument.favorites.push(favorite);
      console.log(bookDocument);
      bookDocument.save().then(function () {
        res.redirect(`/books/${req.params.id}`);
      });
    })

    .catch((err) => {
      console.log(err);
      res.send(err);
    });
}
