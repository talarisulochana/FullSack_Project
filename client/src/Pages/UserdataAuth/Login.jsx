
import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; 
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../Toolkit/Feactures/Auth/LoginauthSlice';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);
  const loading = status === 'loading';

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


//  const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const user = await dispatch(loginUser(formData)).unwrap();
//       Cookies.set('user', JSON.stringify(user), { expires: 7 });
//       localStorage.setItem('user', JSON.stringify(user));

//       toast.success('Login successful!');
//       navigate('/AllRecipes');
//     } catch (err) {
//       toast.error(err || 'Login failed!');
//     }
//   };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Attempt login using Redux thunk
    const user = await dispatch(loginUser(formData)).unwrap();

    // ✅ Save user to cookies (7-day expiration)
    Cookies.set('user', JSON.stringify(user), { expires: 7 });

    toast.success('Login successful!');
    navigate('/AllRecipes');
  } catch (err) {
    toast.error(err?.message || 'Login failed!');
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="max-w-md w-full p-6 bg-white rounded-lg shadow space-y-6">
        <h1 className="text-2xl font-bold text-center text-green-600">Login</h1>

        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="relative">
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$"
            className="w-full px-4 py-2 border border-gray-300 rounded pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-600 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white transition duration-300 ${
            loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="text-center text-sm">
          Don't have an account?{' '}
          <Link to="/" className="text-blue-600 hover:underline">
            Sign up here
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
