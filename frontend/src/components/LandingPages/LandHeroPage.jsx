import React, { useEffect, useState } from 'react';
import HeroImg from '../../assets/heroImg.jpg';

function LandingHeroPage() {
  const style = {
    container: {
      backgroundImage: `url(${HeroImg})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "85vh",
    }
  }


  return (
    <>
      {/* <div id='home' className='flex flex-col justify-center items-center gap-8' style={style.container}>
        <h3 className='text-5xl bg-yellow-200 p-2 rounded-full max-md:text-4xl max-sm:text-2xl'>
          PlaceNet Campus Connect Portal
        </h3>
        <div className='flex justify-center items-center'>
          <div className="flex justify-center items-center gap-4 max-md:flex-col">
            <input type="email" className="form-control !w-96 max-sm:!w-52" id="email" placeholder="Enter Your Email Address..." />
            <button className='bg-green-400 border border-black px-3 py-1 text-lg rounded-lg text-nowrap shadow-lg shadow-green-400/50 hover:bg-green-600 text-white max-md:text-base'>Create Account Now</button>
          </div>
        </div>
      </div> */}


<div id="home" className="flex flex-col justify-center items-center gap-8 min-h-screen bg-gradient-to-r from-blue-500 to-teal-400 text-white relative">
  <h3 className="text-6xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent p-3 rounded-full max-md:text-4xl max-sm:text-3xl animate__animated animate__fadeIn">
    PlaceNet Campus Connect Portal
  </h3>

  <p className="text-lg max-w-xl text-center mx-4 animate__animated animate__fadeIn animate__delay-1s">
    Your one-stop solution for university placement management. Start your journey today!
  </p>

  <div className="flex justify-center items-center gap-8 max-md:flex-col animate__animated animate__fadeIn animate__delay-2s">
    <div className="relative flex justify-center items-center max-md:flex-col animate__animated animate__fadeIn animate__delay-2s">
      <div className="bg-teal-600 p-12 rounded-full animate__animated animate__pulse animate__infinite animate__delay-2s">
        <p className="text-xl font-bold text-white">Explore your campus placement opportunities today!</p>
      </div>
    </div>

    <div className="relative flex justify-center items-center animate__animated animate__fadeIn animate__delay-3s">
      <div className="bg-yellow-500 p-12 rounded-full animate__animated animate__pulse animate__infinite animate__delay-3s">
        <p className="text-xl font-bold text-white">Gain valuable insights with PlaceNet!</p>
      </div>
    </div>

    <div className="relative flex justify-center items-center animate__animated animate__fadeIn animate__delay-4s">
      <div className="bg-blue-500 p-12 rounded-full animate__animated animate__pulse animate__infinite animate__delay-4s">
        <p className="text-xl font-bold text-white">Get started and connect with top recruiters!</p>
      </div>
    </div>
  </div>

  <div className="absolute bottom-10 text-center animate__animated animate__fadeIn animate__delay-3s">
    <p className="text-xl">Welcome to the future of campus recruitment!</p>
  </div>
</div>

    </>
  )
}

export default LandingHeroPage
