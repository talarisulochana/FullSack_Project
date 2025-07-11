const express = require('express');
const Recipe = require("../../models/Recipe.js");   

const router = express.Router();

router.delete("/recipeDelete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletedRecipe = await Recipe.findByIdAndDelete(id);

        if (!deletedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.status(200).json({ message: "Recipe deleted successfully", recipe: deletedRecipe });
    } catch (error) {
        console.error("Error deleting recipe:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
module.exports = router;