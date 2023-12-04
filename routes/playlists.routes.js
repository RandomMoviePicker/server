const express = require("express");
const router = express.Router();
const Playlist = require("../models/Playlist.model");
const User = require("../models/User.model")

router.post("/create", async (req, res, next) => {
    const { userId, name } = req.body;
    try {
        const playlist = await Playlist.create({ name: name, owner: userId })
        await User.findByIdAndUpdate(userId, {$push: { collections: playlist._id}})
    }
    catch (error) {
        console.error(error);
    }
})

router.get("/", async (req, res, next) => {
    // console.log(req.query)
    try {
        const { userId } = req.query;
        const data = await Playlist.find({ owner: userId });
        res.status(200).send(data)
    }
    catch (error) {
        console.error(error);
    }
})

router.get("/:playListName/:id", async (req, res, next) => {

    try {
        const userId = req.params.id;
        const playListName = req.params.playListName;
        const userList = await Playlist.find({ name: playListName, owner: userId }).populate("content")
        res.status(200).send(userList[0].content);
    } catch (error) {
        console.error(error)
    }
})

router.get("/:playListName/:userId/:movieId", async (req, res, next) => {
    try {
        const movieId = req.params.movieId;
        const userId = req.params.userId;
        const playListName = req.params.playListName;

        const playlist = await Playlist.findOne({ name: playListName, owner: userId }).populate("content")//??is necessary??(populate)
        const updatedList = await Playlist.findByIdAndUpdate(playlist._id, { $pull: { content: movieId } }, { new: true }).populate("content");
        res.status(200).send(updatedList.content);
    }
    catch (error) {
        console.log(error);
    }
})
router.delete("/:playlistId", async( req, res, next) => {
    const playlistId = req.params.playlistId;
    try{
        const playlist = await Playlist.findById(playlistId);

        playlist.content.forEach(async(eachMovie)=>{
            console.log(eachMovie)
            await Playlist.findByIdAndUpdate(playlist._id, {$pull:{ content: eachMovie }})
        })
        await Playlist.deleteOne({_id:playlistId})

    res.status(200).send("playlist deleted")
    }
    catch(error){
        console.log(error);
    }
})

router.post("/addMovie", async (req,res,next)=>{
    const {movieId, selectedPlaylist, userId} = req.body
    try{
        const playlist = await Playlist.findOne({ name: selectedPlaylist, owner: userId });
        const updatedPlaylist = await Playlist.findByIdAndUpdate(playlist._id, { $push: { content: movieId } }, { new: true });
        res.status(200).send(`The movie with the id: ${movieId} has been added!`);

    }
    catch(error){
        console.log(error)
    }
})




module.exports = router;