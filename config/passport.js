const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const UserModel = require('../models/user');

//Require your User Model here!

// configuring Passport!
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  async function(accessToken, refreshToken, profile, cb) {
    // this function occurs after a user has logged in via OAUTH

    try {
      // Check if the user is in the database
      // Has the user logged in before?
     let user = await UserModel.findOne({googleId: profile.id});
     // if the UserModel doesn't find anything 
     // user variable is undefined, its not an error
     if(user) return cb(null, user);
     // if the user hasn't logged in before 
		 // Create the User in the database

     user = await UserModel.create({
      name: profile.displayName,
      googleId: profile.id,  // <- For your project your must store the googleId
      email: profile.emails[0].value, 
      avatar: profile.photos[0].value
    })
     // pass thier information to the next piece of middleware
     cb(null, user)


   } catch(err){
    cb(err)
   }
})
)
//This method is called after the verify callback when a user logs in and accepts the user document 
//from the above function as an argument with the signature cb(null, user)
passport.serializeUser(function(user, cb){
	cb(null, user._id); // <- this adds the user._id to our session cookie! 
  //The session cookies identify who is making HTTP requests to our server 
  //and are sent back and forth between the browser and the server.
});

passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(function(userId, cb) {
  UserModel.findById(userId)
			.then(function(userDoc){
				cb(null, userDoc);  //<- this line is what assigns the userDoc to req.user, so essentially req.user = userDoc
				// passes the request to our controller now
	}).catch(err => {
		cb(err)
	})

  // Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
  // When you call this done function passport assigns the user document to req.user, which will 
  // be availible in every Single controller function, so you always know the logged in user

});



