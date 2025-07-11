
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../Toolkit/Feactures/Auth/LoginauthSlice';
import Cookies from 'js-cookie';
import { FiMenu, FiX } from 'react-icons/fi';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [cookieUser, setCookieUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const cookieData = Cookies.get('user');
    if (cookieData) {
      try {
        setCookieUser(JSON.parse(cookieData));
      } catch (error) {
        console.error('Invalid cookie data:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove('user');
    setCookieUser(null);
    navigate('/login');
    setMenuOpen(false);
  };

  const currentUser = user || cookieUser;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white text-black p-4 shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
  <div className="text-xl font-bold text-green-600">
          MyRecipes      
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/AllRecipes" className="hover:text-blue-600 font-bold">All Recipes</Link>
          <Link to="/Category" className="hover:text-blue-600 font-bold">Categories</Link>
          <Link to="/create" className="hover:text-blue-600 font-bold">Create</Link>
          {currentUser ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="hover:text-blue-600 font-bold">Login</Link>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col mt-4 space-y-4 px-4 pb-4 bg-white shadow">
          <Link to="/AllRecipes" onClick={() => setMenuOpen(false)} className="hover:text-blue-600 font-bold">All Recipes</Link>
          <Link to="/Category" onClick={() => setMenuOpen(false)} className="hover:text-blue-600 font-bold">Categories</Link>
          <Link to="/create" onClick={() => setMenuOpen(false)} className="hover:text-blue-600 font-bold">Create</Link>
          {currentUser ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-blue-600 font-bold">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
