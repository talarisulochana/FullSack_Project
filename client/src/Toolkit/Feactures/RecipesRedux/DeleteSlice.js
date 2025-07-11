
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const deleteRecipe = createAsyncThunk(
  'recipes/deleteRecipe',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/recipeDelete/${id}`);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to delete recipe');
    }
  }
);

const deleteSlice = createSlice({
  name: 'deleteRecipe',
  initialState: {
    loading: false,
    successMessage: '',
    error: '',
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteRecipe.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(deleteRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default deleteSlice.reducer;
