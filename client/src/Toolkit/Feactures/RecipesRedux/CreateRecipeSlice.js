import {  createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const createRecipe = createAsyncThunk(
  'recipes/createRecipe',
  async (payload, { rejectWithValue }) => {
    try {
      const pd = new FormData();
      pd.append("title", payload.title);
      pd.append("category", payload.category);
      pd.append("ingredients", payload.ingredients);
      pd.append("cost", payload.cost);
      pd.append("editorName", payload.editorName);
      pd.append("steps", payload.steps);
      pd.append("image", payload.image);

      const response = await axios.post("https://fullsack-project.onrender.com/api/recipePost", pd, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });

      return response.data;
    } catch (error) {
      console.error("Redux error:", error.response?.data?.error || error.message);
      return rejectWithValue(error.response?.data?.error || "Server Error");
    }
  }
);

