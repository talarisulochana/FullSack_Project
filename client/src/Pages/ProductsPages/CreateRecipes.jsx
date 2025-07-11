
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRecipe } from '../../Toolkit/Feactures/RecipesRedux/CreateRecipeSlice';
import { useDispatch } from 'react-redux';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateRecipes() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [formData, setFormData] = useState({
    title: '',
    image: '',
    category: '',
    ingredients: '',
    cost: '',
    editorName: '',
    instructions: '',
    steps: ''
  });

  const [imageFile, setImageFile] = useState(null);



  const imageHandler = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const payload = {
        title: formData.title,
        category: formData.category,
        ingredients: formData.ingredients,
        cost: formData.cost,
        editorName: formData.editorName,
        image: imageFile,
        steps: formData.steps
      };

      await dispatch(createRecipe(payload)).unwrap();

      toast.success("Recipe added successfully!");
      setTimeout(() => {
        navigate('/AllRecipes');
      }, 2000); 
    } catch (err) {
      console.error("Redux error:", err);
      toast.error("Error adding recipe!");
    }
  };

  return (
    <>
    

     <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-26">
  <h1 className="text-2xl font-bold mb-4 text-center">Create New Recipe</h1>

  <form onSubmit={handleSubmit} className="space-y-4">
    

    {imageFile && (
      <img
        src={URL.createObjectURL(imageFile)}
        alt="Preview"
        className="w-full h-80 object-cover rounded border border-gray-300"
      />
    )}

  
    <label className="w-full border border-gray-300 rounded p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
      <span className="text-4xl text-green-600 font-bold">+</span>
      <span className="mt-2 text-gray-600">Upload Recipe Image</span>
      <input
        type="file"
        onChange={imageHandler}
        className="hidden"
        accept="image/*"
      />
    </label>


    <input
      type="text"
      name="title"
      placeholder="Title"
      className="w-full border border-gray-300 px-4 py-2 rounded"
      value={formData.title}
      onChange={handleChange}
      required
    />


    <select
      name="category"
      className="w-full border border-gray-300 px-4 py-2 rounded"
      value={formData.category}
      onChange={handleChange}
      required
    >
      <option value="">Select Category</option>
      <option value="Vegetarian Curries">Vegetarian Curries</option>
      <option value="Dal Recipes">Dal Recipes</option>
      <option value="Chicken Recipes">Chicken Recipes</option>
      <option value="Biryani & Rice Dishes">Biryani & Rice Dishes</option>
    </select>

  
    <input
      type="text"
      name="ingredients"
      placeholder="Ingredients (comma separated)"
      className="w-full border border-gray-300 px-4 py-2 rounded"
      value={formData.ingredients}
      onChange={handleChange}
      required
    />

 
    <input
      type="number"
      name="cost"
      placeholder="Cost (₹)"
      className="w-full border border-gray-300 px-4 py-2 rounded"
      value={formData.cost}
      onChange={handleChange}
      required
    />


    <input
      type="text"
      name="editorName"
      placeholder="Editor Name"
      className="w-full border border-gray-300 px-4 py-2 rounded bg-gray-100 "
      value={formData.editorName}
      onChange={handleChange}
    required
    />


    <textarea
      name="steps"
      placeholder="Cooking Steps"
      className="w-full border border-gray-300 px-4 py-2 rounded h-40 resize-none"
      value={formData.steps}
      onChange={handleChange}
      required
    ></textarea>

   
    <div className="flex justify-center mt-4">
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Submit
      </button>
    </div>
  </form>
</div>

    </>
  );
}

export default CreateRecipes;
