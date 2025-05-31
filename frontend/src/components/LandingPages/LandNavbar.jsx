import React, { useEffect, useState } from 'react';
import Logo from '../../assets/CPMS.png';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function LandingNavbar() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const [buttonSize, setButtonSize] = useState('lg');
  const [logoText, setLogoText] = useState('PlaceNet Campus Connect');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    setLoading(false);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  // Detect screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setButtonSize('md'); // Set size 'sm' for max-md screens
        setLogoText('PCC');
      } else if (window.innerWidth <= 768) {
        setButtonSize('md'); // Set size 'sm' for max-md screens
        setLogoText('PlaceNet Campus Connect');
      } else {
        setButtonSize('lg'); // Set size 'lg' for larger screens
        setLogoText('PlaceNet Campus Connect');
      }
    };

    handleResize(); // Set initial size
    window.addEventListener('resize', handleResize); // Update size on window resize

    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerWidth]);

  return (
    <>
      {
        loading ? (
          <div className="">Loading...</div>
        ) : (
          <>
            <div className={`flex justify-between items-center p-4 playfair transition-all duration-200 ease-in z-50 ${isScrolled && 'shadow-lg bg-gradient-to-r from-blue-500 to-teal-400 top-0 sticky'}`}>
  <div className='flex items-center my-2 mx-3 p-1 gap-3 max-sm:my-0.5 max-sm:mx-1'>
    <img
      src={Logo}
      alt="Logo"
      className='rounded-lg border border-black w-20 h-20 max-md:w-16 max-md:h-16 max-sm:w-12 max-sm:h-12'
    />
    <h1 className={`text-4xl max-md:text-2xl max-sm:text-lg font-bold text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text ${logoText === 'CPMS' && '!text-3xl'}`}>
      {logoText}
    </h1>
  </div>
  
  <div className='flex gap-4 p-2 justify-center items-center'>
    <Button
      variant="outline-light"
      size={buttonSize}
      className="text-white border-2 border-white transition-all hover:bg-teal-600 hover:border-teal-600"
      onClick={() => navigate('student/login')}
    >
      Login
    </Button>

    <Button
      variant="success"
      size={buttonSize}
      className="text-white bg-gradient-to-r from-yellow-500 to-orange-500 hover:bg-gradient-to-r hover:from-teal-400 hover:to-blue-500 transition-all"
      onClick={() => navigate('student/signup')}
    >
      Sign Up
    </Button>
  </div>
</div>

          </>
        )
      }
    </>
  )
}

export default LandingNavbar
