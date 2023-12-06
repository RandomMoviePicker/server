# PickaMovie: Full Stack Web App

This project is made using the MERN stack
Here is the link to the deployed app : https://reliable-squirrel-f831ed.netlify.app/

# About this project:

This app's purpose is to select a random movie extracted from the TMDB (the movie data base) API. The user can press the big red button on the home page and receive a result or go to filters and discard the genres he/she is not interested in.

The app also allows saving the movie results in a favourites playlist and visit its content. He/She also can create new playlists of movies, and customize the name later, also add and delete movies from it.

Some of the features require the user to be logged in, those are: filtering, adding to favourites and creating new playlists. The user can easily sign up and log in or keep using the big red button to get a random movie without filtering.


## Setup dotenv
Once you have cloned the repository, create a `.env` file in the root of the project.
Add the following to the `.env` with your infomration:
```
PORT=5005
ORIGIN=http://localhost:5173
TOKEN_SECRET=whateverYourSecretIs
MONGODB_URI=mongodb+srv://yourMongoDBURI
```
By default the port is set to 5005, but you can change it to whatever you want. Just make sure that you change it in the frontend as well (fetch or axios calls).
The origin is set to `http://localhost:5173` which is the port that the react app will run on with vite. Once deployed, you will need to change this to the domain of your deployed app.


## Routes table 

| Method | Path | Description |
|--------|------|-------------|
| POST | /auth/signup | Sends the user information to the DB and checks if the input is correct in order to save it |
| POST | /auth/login | Search in the DB if we have a user with those credentials|
| GET | /auth/verify | Used to verify JWT stored on the client|
| GET | /movies/filter | Sends back a random movie from the DB applying filters |
| GET | /movies/randomMovie | Sends back a random movie from the DB |
| GET | /playlists | Get all the playlists of a user |
| POST | /playlists/create | Creates a new playlist|
| GET | /playlists/:playListName/:id | Gets a specific playlist and its content|
| GET | /playlists/:playListName/:userId/:movieId | Removes a movie from a specific playlist |
| DELETE | /playlists/:playListId/:name | Deletes a playlist and its content |
| PUT | /playlists/edit | Edits the name of a playlist |
| POST | /playlists/addMovie | Adds a movie to a specific playlist |