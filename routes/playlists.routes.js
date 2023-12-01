const express = require("express");
const router = express.Router();
const Playlist = require("../models/Playlist.model");
const User = require("../models/User.model")

router.post("/create", async(req, res, next)=>{
    const {userId, name} = req.body;
    try{
         await Playlist.create({name: name, owner: userId})
    }
    catch(error){
        console.error(error);
    }
})

router.get("/", async(req, res, next) => {
    // console.log(req.query)
    try{
        const {userId} =req.query;
    const data = await Playlist.find({owner: userId});
    res.status(200).send(data)
    }
    catch(error){
        console.error(error);
    }
})

router.get("/:playListName/:id", async(req, res, next) =>{
    console.log(req.params.playListName)
    try{
        const userId = req.params.id;
        const playListName = req.params.playListName;
        console.log("here",userId,"here00",playListName)
        const userList = await Playlist.find({name: playListName, owner: userId}).populate("content")
        console.log(userList)
        res.status(200).send(userList[0].content);
    }catch(error){
        console.error(error)
    }
})

module.exports = router;