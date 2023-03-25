const mongoose = require("mongoose");

//Define the Embedded Schema
const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const bookSchema = new mongoose.Schema(
  {
    //mongoose schema code
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      genre: String,
      yearPublished: Number,
    },
    favorites: [
      {
        _id: mongoose.Schema.Types.ObjectId,
        is_favorite: Boolean,
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },

  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Book", bookSchema);
