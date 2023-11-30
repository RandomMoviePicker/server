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
    
    try{
        const {userId} =req.query;
    const data = await Playlist.find({owner: userId});
    console.log(data)
    }
    catch(error){
        console.error(error);
    }
})


module.exports = router;