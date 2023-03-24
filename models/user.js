const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        name: String,
        googleId: {
            type: String,
            required: true,
        },
        email: String,
        avatar: String
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("User", userSchema);

// this is the User Model => stores info (name, email, pass)
// used in combination with authentification and authorization functionality 
//to allow users to log in, log out etc...
// NO reltionship on the user schema 
//(stand-alone Schema that defines the structure of the User collection in MongoDB)

