import React from 'react';
import About1 from '../../assets/aboutImg1.jpg';
import About2 from '../../assets/aboutImg2.jpg';
import About3 from '../../assets/aboutImg3.jpg';

function LandAbout() {
  return (
    <>
      {/* <div id='about' className="bg-gradient-to-r from-slate-100 via-green-100 to-yellow-100">
        <h1 className='ml-12 px-3 pt-3 text-4xl'>About Us</h1>
        <div className="min-h-96 my-3 flex flex-wrap justify-around items-center gap-8">
          <div className='w-10/12 md:w-1/3 lg:w-1/4 h-5/6 bg-opacity-10 shadow-lg shadow-slate-200 bg-green-500 border border-black rounded-lg text-center'>
            <h3 className='py-1'>Get Placement</h3>
            <div className="flex justify-center flex-col items-center py-1">
              <img src={`${About1}`} alt="Image" className='w-56 md:w-64 border-2 border-black rounded-xl' />
              <span className='mx-10 max-md:mx-0'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa, omnis!</span>
            </div>
          </div>
          <div className='w-10/12 lg:w-1/4 md:w-1/3 h-5/6 bg-opacity-10 shadow-lg shadow-slate-200 bg-green-500 border border-black rounded-lg text-center'>
            <h3 className='py-1'>Get Placement</h3>
            <div className="flex justify-center flex-col items-center py-1">
              <img src={`${About2}`} alt="Image" className='w-56 md:w-64 border-2 border-black rounded-xl' />
              <span className='mx-10 max-md:mx-0'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa, omnis!</span>
            </div>
          </div>
          <div className='w-10/12 lg:w-1/4 md:w-1/3 h-5/6 bg-opacity-10 shadow-lg shadow-slate-200 bg-green-500 border border-black rounded-lg text-center'>
            <h3 className='py-1'>Get Placement</h3>
            <div className="flex justify-center flex-col items-center py-1">
              <img src={`${About3}`} alt="Image" className='w-56 md:w-64 border-2 border-black rounded-xl' />
              <span className='mx-10 max-md:mx-0'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa, omnis!</span>
            </div>
          </div>
        </div>

      </div> */}


<div id="about" className="bg-gradient-to-r from-blue-500 to-teal-400 text-white py-20">
  <h1 className="text-5xl font-bold text-center text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text animate__animated animate__fadeIn">
    About Us
  </h1>

  <div className="min-h-96 my-12 flex flex-wrap justify-around items-center gap-8 animate__animated animate__fadeIn animate__delay-1s">
    <div className="relative w-10/12 md:w-1/3 lg:w-1/4 h-5/6 bg-opacity-10 shadow-lg bg-green-500 border border-black rounded-lg text-center transform hover:scale-105 transition-all">
      <h3 className="py-4 text-xl font-semibold">Our Mission</h3>
      <div className="flex justify-center flex-col items-center py-4">
        <img src={`${About1}`} alt="Image" className="w-56 md:w-64 border-2 border-black rounded-xl mb-4" />
        <p className="mx-10 max-md:mx-0 text-sm text-gray-200">We aim to streamline the placement process for universities, ensuring a seamless connection between students and top recruiters.</p>
      </div>
    </div>

    <div className="relative w-10/12 lg:w-1/4 md:w-1/3 h-5/6 bg-opacity-10 shadow-lg bg-yellow-500 border border-black rounded-lg text-center transform hover:scale-105 transition-all">
      <h3 className="py-4 text-xl font-semibold">Our Vision</h3>
      <div className="flex justify-center flex-col items-center py-4">
        <img src={`${About2}`} alt="Image" className="w-56 md:w-64 border-2 border-black rounded-xl mb-4" />
        <p className="mx-10 max-md:mx-0 text-sm text-gray-200">Our vision is to bridge the gap between talent and opportunity, creating a strong ecosystem for both students and employers.</p>
      </div>
    </div>

    <div className="relative w-10/12 lg:w-1/4 md:w-1/3 h-5/6 bg-opacity-10 shadow-lg bg-blue-500 border border-black rounded-lg text-center transform hover:scale-105 transition-all">
      <h3 className="py-4 text-xl font-semibold">Why Choose Us</h3>
      <div className="flex justify-center flex-col items-center py-4">
        <img src={`${About3}`} alt="Image" className="w-56 md:w-64 border-2 border-black rounded-xl mb-4" />
        <p className="mx-10 max-md:mx-0 text-sm text-gray-200">With an intuitive platform, expert guidance, and a network of top recruiters, we ensure the best placement opportunities for every student.</p>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default LandAbout
