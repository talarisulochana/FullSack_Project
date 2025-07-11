const express = require('express');
const multer = require('multer');
const Recipe = require("../../models/Recipe.js");
const cloudinary = require("../../../cloudinary.js");
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const router = express.Router();

// Cloudinary storage config
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'recipes',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
});

const upload = multer({ storage: storage });

// PUT route to update recipe
router.put("/recipePut/:id", upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch existing recipe
    const existingRecipe = await Recipe.findById(id);
    if (!existingRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Extract values from request body
    const {
      title,
      category,
      ingredients,
      cost,
      editorName,
      steps
    } = req.body;

    // Convert ingredients to array if it's a string
    const ingredientsArray = typeof ingredients === 'string'
      ? ingredients.split(',').map(i => i.trim())
      : ingredients;

    // Build update object using fallback to existing values
    const updateData = {
      title: title || existingRecipe.title,
      category: category || existingRecipe.category,
      ingredients: ingredientsArray || existingRecipe.ingredients,
      cost: cost || existingRecipe.cost,
      editorName: editorName || existingRecipe.editorName,
      steps: steps || existingRecipe.steps,
      image: req.file?.path || existingRecipe.image
    };

    const updatedRecipe = await Recipe.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json({
      message: "Recipe updated successfully",
      recipe: updatedRecipe
    });

  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
