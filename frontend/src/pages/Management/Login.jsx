import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../assets/CPMS.png';
import Toast from '../../components/Toast';
import isAuthenticated from '../../utility/auth.utility';
import { Button } from 'react-bootstrap';
import { BASE_URL } from '../../config/config';

function LoginManagement() {
  document.title = 'PCC | Management Login';

  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const [error, setError] = useState({});

  // if login user visit redirect to home page
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("../tpo/dashboard");
    }
  }, [navigate]);

  // useState for toast display
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'email') return setError({ ...error, email: '' });
    if (e.target.name === 'password') return setError({ ...error, password: '' });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!formData?.email && !formData?.password) return setError({ email: 'Email Required!', password: 'Password Required!' })
    if (!formData?.email) return setError({ email: 'Email Required!' })
    if (!formData?.password) return setError({ password: 'Password Required!' })

    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/management/login`, formData);
      localStorage.setItem('token', response.data.token);
      navigate('/management/dashboard');
    } catch (error) {
      if (error.response.data.msg) {
        setToastMessage(error.response.data.msg);
        setShowToast(true);
      }
      console.log("Error in Management login.jsx => ", error);
      setLoading(false);
    }
  }

  // toggle eye
  const [isEyeOpen, setEyeOpen] = useState(false);

  const handleEye = () => {
    setEyeOpen(!isEyeOpen);
  }


  return (
    <>
      {/* for any message "toast" */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        delay={3000}
        position="bottom-end"
      />

<div className="flex justify-center items-center h-screen bg-gradient-to-r from-cyan-500 from-10% via-purple-400 via-40% to-pink-500 to-100%">
  <form 
    className="flex flex-col justify-center items-center gap-4 backdrop-blur-lg bg-white/20 border border-white/30 rounded-xl p-8 shadow-xl shadow-purple-300 w-1/3 max-lg:w-2/3 max-md:w-3/4 max-[400px]:w-4/5"
    onSubmit={handleSubmit}
  >
    <div className="flex flex-col justify-center items-center">
      <img className="mb-4 rounded-xl shadow-lg w-30 h-28 lg:w-40 lg:h-40" src={`${Logo}`} alt="Logo" />
      <h1 className="text-2xl font-bold text-white">Management Log In</h1>
    </div>

    {/* Email Field */}
    <div className="w-full">
      <input 
        type="email"
        className="w-full px-4 py-2 rounded-lg bg-white/30 border border-white/50 text-white placeholder-white focus:ring-2 focus:ring-purple-400 focus:outline-none"
        placeholder="Email Address"
        autoComplete="email"
        name="email"
        value={email}
        onChange={handleChange}
      />
      {error?.email && <div className="text-red-400 text-sm mt-1">{error.email}</div>}
    </div>

    {/* Password Field */}
    <div className="w-full relative">
      <input 
        type={isEyeOpen ? "text" : "password"}
        className="w-full px-4 py-2 rounded-lg bg-white/30 border border-white/50 text-white placeholder-white focus:ring-2 focus:ring-purple-400 focus:outline-none"
        placeholder="Password"
        autoComplete="current-password"
        name="password"
        value={password}
        onChange={handleChange}
      />
      <i 
        className={`absolute right-3 top-3 text-white cursor-pointer ${isEyeOpen ? "fa-solid fa-eye" : "fa-regular fa-eye-slash"}`} 
        onClick={handleEye}
      ></i>
      {error?.password && <div className="text-red-400 text-sm mt-1">{error.password}</div>}
    </div>

    {/* Login Button */}
    <button 
      type="submit"
      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 rounded-lg shadow-md hover:scale-105 transition-all"
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : "Log In"}
    </button>

    {/* Switch to TPO Login */}
    <span className="text-white text-sm">
      Log In as TPO?
      <span 
        className="text-yellow-300 font-bold cursor-pointer px-1 hover:underline"
        onClick={() => navigate('../tpo/login')}
      >
        Click Here
      </span>
    </span>

    {/* Footer */}
    <p className="text-gray-300 text-sm text-center">© PlaceNet Campus Connect 2024 - 25</p>
  </form>
</div>

    </>
  )
}

export default LoginManagement
