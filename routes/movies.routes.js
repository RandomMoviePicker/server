const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie.model");
const Playlist = require("../models/Playlist.model");

// all this routes have "/movies" as a prefix...
router.get("/", async(req, res, next) => {
    try{
        const allMovies = await Movie.find();
        res.status(200).send(allMovies);
    }
    catch(error){
        console.log(error)
    }

    


});
router.get("/filter", async(req, res, next) =>{
    try{
        const genresObj = req.query;
        console.log(genresObj);
        const includegenresArr = genresObj.included.split(",")
        const excludegenresArr = genresObj.excluded.split(",")
        const filteredMovie = await Movie.aggregate([{ $match: {genre: {$in: includegenresArr, $nin: excludegenresArr}}},{$sample: {size:1}}])
        res.status(200).send(filteredMovie);
    }catch(error){
        console.error(error)
    }
})

router.get("/randomMovie", async(req, res, next) =>{
    try{
        const randomMovie = await Movie.aggregate([{$sample:{size:1}}])
        res.status(200).send(randomMovie);
    }catch(error){
        console.error(error)
    }
})

router.get("/favourites/:id", async(req, res, next) =>{
    try{
        const userId = req.params.id;
        const userFavs = await Playlist.find({name: "favourites", owner: userId})
        res.status(200).send(userFavs);
    }catch(error){
        console.error(error)
    }
})

    


module.exports = router;
