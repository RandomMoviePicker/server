const { Schema, model, } = require("mongoose");
const mongoose = require("mongoose");
const Playlist = require("./Playlist.model")
// TODO: Please make sure you edit the User model to whatever makes sense in this case
const movieSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    collections: 
        [{type: mongoose.Schema.Types.ObjectId,
        ref:"Playlist"}]
  
    
  }
 
);

const User = model("User", userSchema);

module.exports = User;
