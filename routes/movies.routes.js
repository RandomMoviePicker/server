const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie.model");


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
        const genres = req.body;
        const filteredMovies = await Movie.find({genre: {$in: filteredMovies}})
        res.status(200).send(filteredMovies);
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

    


module.exports = router;
