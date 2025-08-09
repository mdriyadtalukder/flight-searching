import React from "react";
import { Button } from "../components/ui/button";
import { Plane } from "lucide-react";
const Hero = () => {
  return (
    <section className="relative max-w-7xl mx-auto h-[600px] overflow-hidden rounded-2xl shadow-lg">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://i.ibb.co.com/0j6DpmhK/plan.jpg')`,
        }}
      >
        {/* Purple Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-purple-800/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 lg:px-24">
        <div className="max-w-2xl">
          {/* Small text above main heading */}
          <p className="text-white/90 text-lg md:text-xl mb-4 font-light">
            {"Ready for your next adventure?"}
          </p>

          {/* Main Heading */}
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            Discover your
            <br />
            <span className="text-purple-200">perfect flight</span>
          </h1>

          {/* CTA Button */}
         <a
            href="#searching"
            className="inline-flex items-center bg-white cursor-pointer text-purple-900 hover:bg-purple-50 text-lg px-8 py-6 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Plane className="mr-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            Search Flights Everywhere
          </a>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-32 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-32 right-16 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse delay-500"></div>
    </section>
  );
};

export default Hero;
