# Project 3: Full Stack Web App

This is the initial setup for project 3.

Fork this repository to your org account, then clone it to your local machine.
The rest of the team will clone the forked repository to their local machines as well.

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

Remember to update this readme file with your project description and routes.

## Routes table example

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