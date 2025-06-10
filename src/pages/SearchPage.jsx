import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SearchOffIcon from "@mui/icons-material/SearchOff";

const SearchPage = () => {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        // Fetch movies
        const movieResponse = await axios.get(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`
        );

        // Fetch people
        const peopleResponse = await axios.get(
          `${BASE_URL}/search/person?api_key=${API_KEY}&language=en-US&query=${query}`
        );

        setMovies(movieResponse.data.results || []);
        setPeople(peopleResponse.data.results || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setMovies([]);
        setPeople([]);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query, BASE_URL, API_KEY]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="text-xl">Loading search results...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white p-5">
      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8 space-y-8 sm:space-y-12">
        {/* Movies Section */}
        {movies.length > 0 && (
          <section>
            <h2 className="text-xl p-10 sm:text-2xl text-center lg:text-left font-semibold mb-4 sm:mb-6">
              Movies
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 sm:gap-4 lg:gap-6">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/film/${movie.id}`)}
                >
                  <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105">
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : "/fallback-image-film.jpg"
                      }
                      alt={movie.title || movie.name}
                      className="w-full aspect-[2/3] object-cover"
                      loading="lazy"
                    />
                    {/* Overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="mt-2 px-1">
                    <h3 className="text-sm sm:text-base font-medium line-clamp-2 group-hover:text-blue-400 transition-colors">
                      {movie.title || movie.name}
                    </h3>
                    {(movie.release_date || movie.first_air_date) && (
                      <p className="text-xs sm:text-sm text-gray-400 mt-1">
                        {new Date(
                          movie.release_date || movie.first_air_date
                        ).getFullYear()}
                      </p>
                    )}
                    {movie.vote_average > 0 && (
                      <p className="text-xs text-yellow-400 mt-1">
                        ⭐ {movie.vote_average.toFixed(1)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* People Section */}
        {people.length > 0 && (
          <section>
            <h2 className="p-10 text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
              Actors & Crew
            </h2>
            <div className="p-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-3 sm:gap-4 lg:gap-6">
              {people.map((person) => (
                <div
                  key={person.id}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/person/${person.id}`)}
                >
                  <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105">
                    <img
                      src={
                        person.profile_path
                          ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                          : "/fallback-image.jpg"
                      }
                      alt={person.name}
                      className="w-full aspect-[2/3] object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-2 px-1">
                    <h3 className="text-sm sm:text-base font-medium line-clamp-2 group-hover:text-blue-400 transition-colors">
                      {person.name}
                    </h3>
                    {person.known_for_department && (
                      <p className="text-xs sm:text-sm text-gray-400 mt-1">
                        {person.known_for_department}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* No Results */}
        {movies.length === 0 && people.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <div className="text-4xl sm:text-6xl mb-4">
              <SearchOffIcon className="w-3xl" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">
              No results found
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
