const express = require('express');
const Recipe = require("../../models/Recipe.js");



const router = express.Router();

router.get("/recipeGet", async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).json({ message: "Internal server error" });
    }   
});



module.exports = router;