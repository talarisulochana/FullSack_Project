
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipes } from '../../Toolkit/Feactures/RecipesRedux/RecipeSlice';
import { deleteRecipe } from '../../Toolkit/Feactures/RecipesRedux/DeleteSlice';
import { useNavigate } from 'react-router-dom';
import Image from '../../Compontents/Image/imag';
import { IoMdSearch } from "react-icons/io";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { MdEdit, MdDeleteSweep, MdMoreVert } from "react-icons/md";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AllRecipes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { recipes, loading } = useSelector(state => state.recipes);
  const [searchQuery, setSearchQuery] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleEdit = (recipe) => {
    toast.info('Redirecting to edit...');
    navigate(`/update/${recipe._id}`, { state: recipe });
  };


const handleDelete = (id) => {
  const ToastContent = ({ closeToast }) => (
    <div>
      <p className="font-semibold mb-2">Are you sure you want to delete this recipe?</p>
      <div className="flex gap-4 justify-center">
        <button
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          onClick={async () => {
            await dispatch(deleteRecipe(id)).then((res) => {
              if (res.meta.requestStatus === 'fulfilled') {
                toast.success('Recipe deleted successfully!');
                dispatch(fetchRecipes());
              } else {
                toast.error('Failed to delete recipe!');
              }
            });
            closeToast();
          }}
        >
          Yes
        </button>
        <button
          className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
          onClick={closeToast}
        >
          No
        </button>
      </div>
    </div>
  );

  toast.info(<ToastContent />, {
    position: "top-center",
    autoClose: false,
    closeOnClick: false,
    closeButton: false,
    draggable: false,
  });
};


  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>

      <div className="p-6">
       

        <div className="flex justify-center mt-15 mb-5">
          <div className="relative w-full max-w-md">
            <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search recipes by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-wrap gap-4 justify-center">
            {Array(6).fill().map((_, index) => (
              <div key={index} className="w-full md:w-[30%] border p-4 rounded shadow">
                <Skeleton height={256} className="w-full rounded mb-2" />
                <Skeleton height={24} width="60%" className="mx-auto mb-1" />
                <Skeleton height={18} width="40%" className="mx-auto mb-1" />
                <Skeleton height={18} width="50%" className="mx-auto mb-1" />
                <Skeleton height={18} width="30%" className="mx-auto mb-3" />
                <div className="flex justify-center">
                  <Skeleton height={36} width={100} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 justify-center">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map(recipe => (
                <div key={recipe._id} className="w-full md:w-[30%] border p-4 rounded shadow relative">
                  {/* Animated menu icon */}
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => toggleMenu(recipe._id)}
                      className="p-1 hover:bg-gray-200 rounded-full"
                    >
                      <MdMoreVert className="text-2xl text-gray-700" />
                    </button>

                    {openMenuId === recipe._id && (
                      <div className="absolute right-0 mt-2 w-24 bg-white border shadow rounded z-10 flex flex-col animate-fade-in">
                        <button
                          onClick={() => handleEdit(recipe)}
                          className="p-2 hover:bg-gray-100"
                          title="Edit"
                        >
                          <MdEdit className="text-blue-600 text-xl mx-auto" />
                        </button>
                        <button
                          onClick={() => handleDelete(recipe._id)}
                          className="p-2 hover:bg-gray-100"
                          title="Delete"
                        >
                          <MdDeleteSweep className="text-red-600 text-xl mx-auto" />
                        </button>
                      </div>
                    )}
                  </div>

                  <Image path={recipe.image} alt={recipe.title} styling="w-full h-64 object-cover rounded mb-2" />
                  <h2 className="text-xl font-semibold text-center">{recipe.title}</h2>
                  <p className="text-sm text-gray-600 text-center">{recipe.category}</p>
                  <p className="mt-2 text-gray-800 text-center">Cost: ₹{recipe.cost}</p>
                  <p className="mt-1 text-sm text-gray-500 text-center">editor: {recipe.editorName}</p>
                  <div className="flex justify-center">
                    <button
                      onClick={() => navigate(`/single/${recipe._id}`)}
                      className="mt-4 mb-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-green-700"
                    >
                      View Recipe
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No recipes found for "{searchQuery}"</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default AllRecipes;
