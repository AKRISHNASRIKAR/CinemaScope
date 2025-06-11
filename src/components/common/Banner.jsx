import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const Banner = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const navigate = useNavigate();

  // Minimum swipe distance
  const minSwipeDistance = 50;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  // Touch handlers for mobile swipe
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  useEffect(() => {
    if (movies.length > 0 && !isHovered) {
      const interval = setInterval(nextSlide, 3000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, movies.length, isHovered]);

  if (!movies?.length) {
    return (
      <div className="relative w-full h-screen flex items-center justify-center bg-gray-900">
        <h2 className="text-white text-2xl">No upcoming movies found.</h2>
      </div>
    );
  }

  const currentMovie = movies[currentIndex];

  return (
    <div
      className="relative p-20 px-8 mb-10 w-full h-[50vh] sm:h-[70vh] lg:h-[92vh] overflow-hidden flex items-center justify-center  rounded-xl  "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      loading="lazy"
    >
      {/* Slide Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white border-none p-2 md:p-3 cursor-pointer text-lg md:text-2xl z-10 hover:bg-black/50 transition-all duration-200 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center"
        label="Previous slide"
      >
        <ChevronLeftIcon className="w-4 h-4 md:w-6 md:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white border-none p-2 md:p-3 cursor-pointer text-lg md:text-2xl z-10 hover:bg-black/50 transition-all duration-200 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center"
        label="Next slide"
      >
        <ChevronRightIcon className="w-4 h-4 md:w-6 md:h-6" />
      </button>

      {/* Banner Main */}

      <div
        loading="lazy"
        className="relative p-20 w-full h-full  flex items-center  "
      >
        <img
          key={currentMovie.id}
          src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
          alt={currentMovie.title}
          className="w-full h-full object-cover object-center cursor-pointer"
          onError={(e) => {
            e.target.src = "./public/fallback-image-film.jpg";
          }}
          onClick={() => navigate(`/film/${currentMovie.id}`)}
        />

        {/* Movie Info  */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 pb-10 sm:pb-20 lg:pb-40   text-white text-center">
          <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-2 sm:mb-3 lg:mb-4 leading-tight px-2 pb-2 sm:pb-4 lg:pb-6">
            {currentMovie.title}
          </h2>
        </div>
      </div>

      {/* Touch/Swipe indicators for mobile */}
      <div className="absolute bottom-20 sm:hidden left-1/2 -translate-x-1/2 text-white/60 text-xs"></div>
    </div>
  );
};

export default Banner;
