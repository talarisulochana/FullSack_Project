import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../Feactures/Auth/LoginauthSlice.js';
import signupReducer from '../Feactures/Auth/SignupauthSlice.js'
import recipeReducer from '../Feactures/RecipesRedux/RecipeSlice.js'
import SingleReducer from "../Feactures/RecipesRedux/SingleRecipeSlice.js"
import deleteReducer from '../Feactures/RecipesRedux/DeleteSlice.js'

export const store = configureStore({
  reducer: {
    auth: loginReducer,
    signup: signupReducer,
    recipes: recipeReducer,

  singleRecipe: SingleReducer,

  deleteRecipe: deleteReducer


  },
});

