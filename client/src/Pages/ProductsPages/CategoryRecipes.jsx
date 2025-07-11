import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipes } from '../../Toolkit/Feactures/RecipesRedux/RecipeSlice';
import Image from '../../Compontents/Image/imag';

export default function CategoryRecipes() {
  const dispatch = useDispatch();
  const { recipes, loading } = useSelector((state) => state.recipes);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef();

  const categories = [
    "All",
    "Vegetarian Curries",
    "Dal Recipes",
    "Chicken Recipes",
    "Biryani & Rice Dishes"
  ];

  useEffect(() => {
    if (recipes.length === 0) {
      dispatch(fetchRecipes());
    }
  }, [dispatch, recipes.length]);

 
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredRecipes =
    selectedCategory === "All"
      ? recipes
      : recipes.filter(
          (recipe) =>
            recipe.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="p-6 pt-30">

      <div className="relative mb-6 inline-block" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {selectedCategory} ⮟
        </button>

        {showDropdown && (
          <ul className="absolute mt-2 bg-white border rounded shadow w-52 z-50">
            {categories.map((cat) => (
              <li
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setShowDropdown(false);
                }}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  selectedCategory === cat ? "bg-gray-200" : ""
                }`}
              >
                {cat}
              </li>
            ))}
          </ul>
        )}
      </div>

  
      {loading ? (
        <p>Loading...</p>
      ) : filteredRecipes.length === 0 ? (
        <p>No recipes found in this category.</p>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe._id}
              className="w-full sm:w-[48%] md:w-[30%] lg:w-[18%] p-4 border rounded shadow bg-white"
            >
              

              {recipe.image && (
            
                <Image path={recipe.image} alt={recipe.title} styling="w-full h-64 object-cover rounded mb-2" />
                
              )}

            <div className=' flex flex-col justify-center items-center'>
               <h2 className="text-lg font-bold mb-1">{recipe.title}</h2>
              <p className="text-xs text-gray-600 mb-1">
                <strong>Category:</strong> {recipe.category}
              </p>
              <p className="mt-2 text-xs">
                <strong>Ingredients:</strong> {recipe.ingredients}
              </p>
              <p className="mt-1 text-xs">
                <strong>Cooking Steps:</strong>
              </p>
              <p className="text-xs text-gray-700 whitespace-pre-line">
                {recipe.steps}
              </p>

              <p className="mt-1 text-xs">
                <strong>Cost:</strong> ₹{recipe.cost}
              </p>
              <p className="mt-1 text-xs">
                <strong>Editor:</strong> {recipe.editorName}
              </p>
            </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
