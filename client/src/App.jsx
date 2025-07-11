
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import SignUp from './Pages/UserdataAuth/SignUp';
import Login from './Pages/UserdataAuth/Login';

import AllRecipes from './Pages/ProductsPages/AllRecipes';
import CreateRecipe from './Pages/ProductsPages/CreateRecipes';
import CategoryRecipes from './Pages/ProductsPages/CategoryRecipes';
import SingleRecipe from './Pages/ProductsPages/SingleRecipes';
import UpdateRecipes from './Compontents/Update/UpdateRecipes';
import Navbar from './Compontents/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Wrap your logic using useLocation directly inside App
function App() {
  const location = useLocation();

  // Hide Navbar on "/" (SignUp) and "/login"
  const hideNavbar = location.pathname === '/' || location.pathname === '/login';

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/AllRecipes" element={<AllRecipes />} />
        <Route path="/Category" element={<CategoryRecipes />} />
        <Route path="/single/:id" element={<SingleRecipe />} />
        <Route path="/update/:id" element={<UpdateRecipes />} />
        <Route path="/create" element={<CreateRecipe />} />
      </Routes>
    </>
  );
}

// Wrap App in Router here since we are using useLocation inside App
function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWithRouter;
