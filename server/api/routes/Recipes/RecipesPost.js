const express = require('express');
const multer = require('multer');
const Recipe = require('../../models/Recipe.js');
const cloudinary = require("../../../cloudinary.js");
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const router = express.Router();

// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'recipes',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
});

const upload = multer({ storage: storage });

// POST route to create a recipe
router.post("/recipePost", upload.single('image'), async (req, res) => {
  try {
    const { title, category, ingredients, cost, editorName, steps } = req.body;

    console.log(ingredients,'ingredients')

    // If image upload failed
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Image upload failed" });
    }

    // Convert ingredients to array if needed
    const ingredientsArray = typeof ingredients === 'string' ? ingredients.split(',') : ingredients;

    const newRecipe = new Recipe({
      title,
      category,
      ingredients: ingredientsArray,
      cost,
      editorName,
      steps,
      image: req.file.path // Cloudinary image URL
    });

    console.log(newRecipe,'newRecipe')
    await newRecipe.save();
    res.status(201).json({ message: "Recipe created successfully", recipe: newRecipe });

  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
