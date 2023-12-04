const IMG_URL = 'https://image.tmdb.org/t/p/w500'
const apiKey = 'd1b2ab92e0024d87c581a88cf097ea66'
const lang = 'en'
const path = require("path");
const mongoose = require("mongoose")
const Movie = require("../models/Movie.model");
const getGenre = require('../utils/genresCatcher') 

require("dotenv").config({path: path.join(__dirname, "../.env")})
const mongo_uri = process.env.MONGODB_URI

const api = async (endpoint, params) => {
    
    let url = `https://api.themoviedb.org/3/${endpoint}?api_key=${apiKey}&language=${lang}`
    if(params)
        url += params;
    const response = await fetch(url).then(res =>res.json());
    return response
}

const getPopularMovies = async (page) =>{
    try{
    const res = await api('movie/popular', `&page=${page}`);
    return res;
    }
    catch(error){
        console.log(error)
    }
    
}

const cleanMovies = (moviesArr) =>{
   
    const cleanMovieArr = moviesArr.map(movie => {
        const {adult,
            title,
            overview,
            genre_ids,
            backdrop_path,
            original_language,
            release_date} = movie
           const newMovieObj = {
                adult:adult,
                title:title,
                overview:overview,
                genre:genre_ids,
                imageUrl:IMG_URL + backdrop_path,
                originalLanguage:original_language,
                releaseDate:release_date
            }
            return newMovieObj
    });
    return cleanMovieArr
}

const convertGenre = (cleanArr) =>{
    const setGenreArr = cleanArr.map((movie)=>{
        const modifiedGenre = movie.genre.map((eachGenre)=>{
            const genreName = getGenre(eachGenre);
            return genreName;
        })
        movie.genre = modifiedGenre;
        return movie;
        
    })
    return setGenreArr;
}

const fetchPages = async () =>{
    try{

        await mongoose.connect(mongo_uri)
        for(let page = 101; page <= 300; page++)
        {
            const res = await getPopularMovies(page);
            const cleanArr =  cleanMovies(res.results)
            const genreSetted = convertGenre(cleanArr);
            // console.log(genreSetted);
            const mongoMovieArr = await Movie.insertMany(genreSetted)
        }
        mongoose.connection.close()
    }catch(error)
    {
        console.error(error);
    }
}

fetchPages();
