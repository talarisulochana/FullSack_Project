 require('dotenv').config();
const express = require('express');
const cors=require("cors")
const mongoose = require('mongoose');
const connectMongo = require('./config/db.js');
//User
const userGet = require('./api/routes/User/userGet.js')
const userPost = require('./api/routes/User/userPost.js')
const userPut = require('./api/routes/User/userPut.js')
const userDelete = require('./api/routes/User/userDelete.js')
const userGetByid=require('./api/routes/User/userGetByid.js')
//Recipes
const RecipesPost = require('./api/routes/Recipes/RecipesPost.js')
const RecipesGet = require('./api/routes/Recipes/RecipesGet.js')
const RecipesPut = require('./api/routes/Recipes/RecipesPut.js')
const RecipesDelete = require('./api/routes/Recipes/RecipesDelete.js');
const RecipesGetByid =require('./api/routes/Recipes/RecipesGetByid.js')



const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


            

connectMongo();

app.use(cors({
  origin:[ 'https://fullsack-project.onrender.com',"http://localhost:5173/"],
  origin:"*",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

//User routes
app.use('/api', userGet)
app.use('/api',userGetByid)
app.use('/api', userPost)
app.use('/api', userPut)
app.use('/api', userDelete)


// Recipes routes
app.use("/api", RecipesGet);
app.use("/api",RecipesPost);
app.use("/api", RecipesPut);
app.use("/api", RecipesDelete);
app.use("/api",RecipesGetByid);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});