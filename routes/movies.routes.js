const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie.model");


// all this routes have "/movies" as a prefix...
router.get("/", async(req, res, next) => {
    try{
        const allMovies = await Movie.find();
        res.send(allMovies);
    }
    catch(error){
        console.log(error)
    }

  
});

    


module.exports = router;
