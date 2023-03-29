const mongoose = require("mongoose");

//Define the Embedded Schema 
const favoriteSchema = new mongoose.Schema( {
        is_favorite: {type: Boolean, default: false},
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

       
      
}, { timestamps: true });
 

const bookSchema = new mongoose.Schema(
  {
    //mongoose schema code
    image: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String 
    },
    yearPublished: {
      type: Number,
    },
    genre: {
      type: String,
    } ,
    favorites: [favoriteSchema],
    },

  {
    timestamps: true,
  }
);
favoriteSchema.methods.getBookTitle = function() {
  return this.parent().title;
};
module.exports = mongoose.model("Book", bookSchema);
