import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchSingleRecipe = createAsyncThunk(
  'recipes/fetchSingleRecipe',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/recipeGet/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch recipe");
    }
  }
);


const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    singleRecipe: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSingleRecipe.pending, state => {
        state.loading = true;
        state.singleRecipe = null;
      })
      .addCase(fetchSingleRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.singleRecipe = action.payload;
      })
      .addCase(fetchSingleRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default recipeSlice.reducer;
