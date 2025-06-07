import React from "react";
import { Link } from "react-router-dom";

const PopularMoviesSection = ({ movies }) => {
  return (
    <div className="w-full max-w-full overflow-hidden p-4 pb-10">
      <h2 className="text-lg md:text-xl px-4 md:px-10 mt-2 font-bold text-white mb-4 pt-5 pb-4">
        What's Popular
      </h2>

      <div className="flex flex-nowrap lg:overflow-hidden md:overflow-hidden sm:overflow-x-auto py-2 gap-3 px-4 md:gap-4 md:px-10">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex-shrink-0 w-[110px] md:w-[150px] text-center text-white"
          >
            <Link to={`/film/${movie.id}`}>
              <img
                className="w-full rounded-lg object-cover shadow-md aspect-[2/3]"
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : "/fallback-image.jpg"
                }
                alt={movie.title}
              />
            </Link>

            <p className="mt-2 text-sm font-medium line-clamp-1">
              {movie.title}
            </p>

            <p className="text-xs text-gray-300 mt-1">
              {new Date(movie.release_date).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </p>

            <span className="bg-black text-white text-xs py-0.5 px-2 rounded-full inline-block mt-1">
              {movie.vote_average
                ? `${Math.round(movie.vote_average * 10)}%`
                : "NR"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularMoviesSection;
