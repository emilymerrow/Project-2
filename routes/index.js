const router = require('express').Router();
const passport = require('passport');

// The root route renders our only view
router.get('/', function(req, res) {
  res.render('index'); //redirect to the books index page
  
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/books', // <- redirect to the books index page after login
    failureRedirect : '/login'  // <- redirect to the home page if login fails
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout(function(){ //< - req.logout comes from passport, and what it does is destorys the cookie keeping track of the user!
    res.redirect('/') // <- redirect to the home page after logout
  })
})


module.exports = router;
