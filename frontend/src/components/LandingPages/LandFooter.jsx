import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandFooter() {
  const navigate = useNavigate();
  return (
    <>
      {/* <div className="container">
        <footer className="py-3 my-4">
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item"><a href="#home" className="nav-link px-2 text-body-secondary">Home</a></li>
            <li className="nav-item"><a href="#about" className="nav-link px-2 text-body-secondary">About</a></li>
            <li className="nav-item"><a href="" className="nav-link px-2 text-body-secondary">Contact</a></li>
          </ul>
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <span className='text-gray-300 text-3xl'>|</span>
            <li className="nav-item">
              <span className="nav-link px-2 text-body-secondary cursor-pointer" onClick={()=>navigate('tpo/login')}>
                Login as TPO Admin
              </span>
            </li>
            <span className='text-gray-300 text-3xl'>|</span>
            <li className="nav-item">
              <span className="nav-link px-2 text-body-secondary cursor-pointer" onClick={()=>navigate('management/login')}>
                Login as Management Admin
              </span>
            </li>
            <span className='text-gray-300 text-3xl'>|</span>
          </ul>
          <p className="text-center text-body-secondary">© 2025 PlaceNet Campus Connect</p>
        </footer>
      </div> */}

<div className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow-lg">
  <footer className="py-6 px-4 max-w-7xl mx-auto">
    
    {/* Navigation Links */}
    <ul className="flex flex-wrap justify-center gap-6 border-b border-white/30 pb-4">
      <li className="nav-item">
        <a href="#home" className="nav-link text-white hover:text-yellow-300 transition-all text-lg">Home</a>
      </li>
      <li className="nav-item">
        <a href="#about" className="nav-link text-white hover:text-yellow-300 transition-all text-lg">About</a>
      </li>
      <li className="nav-item">
      <a href="mailto:rakwaldaman7@gmail.com" className="nav-link text-white hover:text-yellow-300 transition-all text-lg">
  Contact
</a>

      </li>
    </ul>

    {/* Admin Login Links */}
    <ul className="flex flex-wrap justify-center items-center gap-6 border-b border-white/30 pb-4 mt-4">
      <li className="nav-item">
        <span className="nav-link text-white hover:text-yellow-300 cursor-pointer transition-all text-lg" onClick={() => navigate('tpo/login')}>
          Login as TPO Admin
        </span>
      </li>
      <li className="nav-item">
        <span className="nav-link text-white hover:text-yellow-300 cursor-pointer transition-all text-lg" onClick={() => navigate('management/login')}>
          Login as Management Admin
        </span>
      </li>
    </ul>

    {/* Copyright Section */}
    <p className="text-center text-white/80 text-base mt-4">
      © 2025 PlaceNet Campus Connect | Empowering Placements with Technology
    </p>
  </footer>
</div>

    </>
  )
}

export default LandFooter
