const express = require('express');
const router = express.Router();
const authorsCtrl = require('../controllers/authors');

router.post('/books/:id/authors', (req, res) => {
    // Your code to handle the request and send a response
  });

//router.get('/authors/new', authorsCtrl.new);
//outer.post('/authors', authorsCtrl.create);
//router.post('/books/:id/authors', authorsCtrl.addToCast);

module.exports = router;