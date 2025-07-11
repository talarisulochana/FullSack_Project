
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateRecipe } from '../../Toolkit/Feactures/RecipesRedux/UpdateSlice';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function UpdateRecipes() {
  const { id } = useParams();
  const { state } = useLocation(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();




  const [formData, setFormData] = useState({
    title: '',
    category: '',
    ingredients: '',
    cost: '',
    editorName: '',
    steps: '',
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
     const storedUser = JSON.parse(localStorage.getItem("user"));
  const editor = storedUser?.name;
    if (state) {
      setFormData({
        title: state.title,
        category: state.category,
        ingredients: state.ingredients,
        cost: state.cost,
        editorName: state.editorName||editor,
        steps: state.steps,
        image: null,
      });
      setPreviewImage(state.image);
    }
  }, [state]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setFormData({ ...formData, image: file });

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result); 
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateRecipe({ id, formData })).unwrap();
      toast.success("Recipe updated successfully!");
      setTimeout(() => {
        navigate('/AllRecipes');
      }, 2000);
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update recipe!");
    }
  };

  return (
    <>
   <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto space-y-4">
  {previewImage && (
    <img
      src={previewImage}
      alt="Preview"
      className="w-full h-60 object-cover rounded border border-gray-300"
    />
  )}


  <label className="flex flex-col items-center justify-center w-full border border-gray-300 rounded p-4 cursor-pointer hover:bg-gray-50">
    <span className="text-4xl text-green-600 font-bold">+</span>
    <span className="mt-2 text-gray-600">Upload New Image (optional)</span>
    <input
      type="file"
      accept="image/*"
      name="image"
      onChange={handleChange}
      className="hidden"
    />
  </label>


  <input
    type="text"
    name="title"
    value={formData.title}
    onChange={handleChange}
    placeholder="Title"
    className="border border-gray-300 p-2 w-full rounded"
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


  <textarea
    name="ingredients"
    value={formData.ingredients}
    onChange={handleChange}
    placeholder="Ingredients"
    className="border border-gray-300 p-2 w-full resize-none rounded"
  />


  <input
    type="text"
    name="cost"
    value={formData.cost}
    onChange={handleChange}
    placeholder="Cost"
    className="border border-gray-300 p-2 w-full rounded"
  />



<input
  type="text"
  name="editorName"
  value={formData.editorName}
  readOnly
  className="border border-gray-300 p-2 w-full rounded bg-gray-100 cursor-not-allowed"
/>


  <textarea
    name="steps"
    value={formData.steps}
    onChange={handleChange}
    placeholder="Cooking Steps"
    className="border border-gray-300 p-2 w-full resize-none rounded"
  />
  <button
    type="submit"
    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
  >
    Update Recipe
  </button>
</form>

    </>

  );
}

export default UpdateRecipes;
