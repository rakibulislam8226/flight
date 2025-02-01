import React from "react";

function Hero() {
  return (
    <>
      <div className="relative max-w-[1640px] lg:m-auto lg:p-4 ">
        <img
          src="https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_dark_theme_4.svg"
          alt="hero"
          className="w-full h-auto"
        />
        <p className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
          Flights
        </p>
      </div>
    </>
  );
}

export default Hero;
