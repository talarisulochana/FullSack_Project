
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios  from 'axios';

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async (_, thunkAPI) => {
  try {
    const response = await axios.get('http://localhost:3000/api/recipeGet');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});


const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRecipes.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default recipeSlice.reducer;
