const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const playlistSchema = new Schema(
  {
    name: {
        type: String,
        required: true
    },
    content: [{type: mongoose.Schema.Types.ObjectId, ref:"Movie"}]
  }
 
);

const Playlist = model("Playlist", playlistSchema);

module.exports = Playlist;
