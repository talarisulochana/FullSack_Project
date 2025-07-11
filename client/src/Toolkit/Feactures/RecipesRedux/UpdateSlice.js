import {  createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateRecipe = createAsyncThunk(
  'recipes/updateRecipe',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const updated = new FormData();
      updated.append('title', formData.title);
      updated.append('category', formData.category);
      updated.append('ingredients', formData.ingredients);
      updated.append('cost', formData.cost);
      updated.append('editorName', formData.editorName);
      updated.append('steps', formData.steps);
      if (formData.image) {
        updated.append('image', formData.image);
      }

      console.log(updated)
      const res = await axios.put(
        `http://localhost:3000/api/recipePut/${id}`,
        updated,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Error updating recipe');
    }
  }
);

