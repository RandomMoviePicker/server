const express = require("express");
const router = express.Router();
const Playlist = require("../models/Playlist.model");
const User = require("../models/User.model")

router.post("/create", async (req, res, next) => {
    const { userId, name } = req.body;
const trimedString = name.trim()

    const nameUsed = await Playlist.find({name:trimedString, owner:userId });
    
    if(nameUsed.length === 0 && trimedString ){
        try {
            const playlist = await Playlist.create({ name: trimedString, owner: userId })
            await User.findByIdAndUpdate(userId, {$push: { collections: playlist._id}})
            res.status(200).send("playlist created")
            
        }
        catch (error) {
            console.error(error);
        }
    }
    else{
        res.status(403).json({message:"This name is invalid or already used"})
    }
})

router.get("/", async (req, res, next) => {
    
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

router.put("/edit", async(req, res, next) =>{
    const {playlistId, name} = req.body;
    console.log(req.body)
    try{
       const updated = await Playlist.findByIdAndUpdate(playlistId, {name})
       res.status(200).send("playlist updated")
    }
    catch(error){
        console.error(error);
        res.status(400).send("something went wrong...")
    }

})




module.exports = router;