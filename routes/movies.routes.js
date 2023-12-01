const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie.model");
const Playlist = require("../models/Playlist.model");

// all this routes have "/movies" as a prefix...
router.get("/", async (req, res, next) => {
    try {
        const allMovies = await Movie.find();
        res.status(200).send(allMovies);
    }
    catch (error) {
        console.log(error)
    }
});

router.get("/filter", async (req, res, next) => {
    try {
        const genresObj = req.query;
        const includegenresArr = genresObj.included.split(",")
        const excludegenresArr = genresObj.excluded.split(",")
        const filteredMovie = await Movie.aggregate([{ $match: { genre: { $in: includegenresArr, $nin: excludegenresArr } } }, { $sample: { size: 1 } }])
        res.status(200).send(filteredMovie);
    } catch (error) {
        console.error(error)
    }
})

router.get("/randomMovie", async (req, res, next) => {
    try {
        const randomMovie = await Movie.aggregate([{ $sample: { size: 1 } }])
        res.status(200).send(randomMovie);
    } catch (error) {
        console.error(error)
    }
})


// this its on the <3
router.post("/favourites", async (req, res, next) => {
    try {
        const { userId, movieId } = req.body;
        const favMovie = await Playlist.findOne({ name: "favourites", owner: userId });
        const updatedFavMovie = await Playlist.findByIdAndUpdate(favMovie._id, { $push: { content: movieId } }, { new: true });
        res.status(200).send(`The movie with the id: ${movieId} has been added!`);
    } catch (error) {
        console.error(error)
    }
})



module.exports = router;
