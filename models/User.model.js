const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    adult: {
      type: Boolean,
      required: [true, "Adult is required."],
    },
    title: {
      type: String,
      required: [true, "Name is required."],
    },
    overview: String,
    genre: {
      type: [String],
      required: [true, "genre is required"]
    },
    imageUrl: String,
    originalLanguage: String,
    releaseDate: String,
  },
);

const Movie = model("Movie", movieSchema);

module.exports = Movie;