// module.exports = function isLoggedIn(req, res, next) {
//     if(req.isAuthenticated()) return next();
//     res.redirect('/auth/google')
// }

const Book = require("../models/book");
const Author = require("../models/author");

module.exports = {
    new:newAuthor,
    create,
}
function create(req, res) {
    // Need to "fix" date formatting to prevent day off by 1
    // This is due to the <input type="date"> returning the date
    // string in this format:  "YYYY-MM-DD"
    // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
    const s = req.body.born;
    req.body.born = `${s.substr(5, 2)}-${s.substr(8, 2)}-${s.substr(0, 4)}`;
    Author.create(req.body)
      .then(function(authorDoc) {
        res.redirect("/authors/new");
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }
  
  function newAuthor(req, res) {
    Author.find({})
      .then(function(authors) {
        res.render("authors/new", {
          title: "Add Author",
          authors,
        });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }