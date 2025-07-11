import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleRecipe  } from '../../Toolkit/Feactures/RecipesRedux/SingleRecipeSlice';


function SingleRecipe() {
  const { id } = useParams();
  const dispatch = useDispatch();
const { singleRecipe, loading } = useSelector(state => state.singleRecipe);



  useEffect(() => {
    dispatch(fetchSingleRecipe(id));
  }, [dispatch, id]);

  if (loading || !singleRecipe) return <p>Loading recipe...</p>;

  return (
    <>

     <div className="p-6 max-w-2xl mx-auto text-center pt-30">
  <img
    src={singleRecipe.image}
    alt={singleRecipe.title}
    className="w-[450px] h-96 object-cover rounded mb-4 mx-auto"
  />
  <h1 className="text-3xl font-bold">{singleRecipe.title}</h1>
  <p className="text-lg text-gray-700 mt-2">Category: {singleRecipe.category}</p>
  <p className="text-lg mt-2">Cost: ₹{singleRecipe.cost}</p>
  <p className="text-sm text-gray-500 mt-1">By: {singleRecipe.editorName}</p>

  <h2 className="text-xl font-semibold mt-6">Ingredients:</h2>
  <ul className="list-disc ml-6 mt-2 text-left inline-block">
    {singleRecipe.ingredients?.map((ing, index) => (
      <li key={index}>{ing}</li>
    ))}
  </ul>

  <h2 className="text-xl font-semibold mt-6">Steps:</h2>
  <p className="mt-2">{singleRecipe.steps}</p>
</div>

    </>
  );
}

export default SingleRecipe;
