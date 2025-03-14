import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SearchPage = () => {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);
  const [people, setPeople] = useState([]);
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Fetch movies & TV shows
        const movieResponse = await axios.get(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`
        );

        // Fetch people 
        const peopleResponse = await axios.get(
          `${BASE_URL}/search/person?api_key=${API_KEY}&language=en-US&query=${query}`
        );

        setMovies(movieResponse.data.results);
        setPeople(peopleResponse.data.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-[#121212] text-white px-6 py-8 flex flex-row ">
      <h2 className="text-xl lg:text-3xl font-bold mb-6">
        Search Results for "{query}"
      </h2>

      {/* Movies Section */}
      {movies.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold mb-4">Movies & TV Shows</h3>
          <div className="flex flex-col gap-4">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="cursor-pointer hover:scale-105 transition transform duration-200"
                onClick={() => navigate(`/film/${movie.id}`)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-lg shadow-md w-full h-auto object-cover"
                />
                <p className="text-center mt-2 font-semibold">
                  {movie.title} ({new Date(movie.release_date).getFullYear()})
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actors & Crew Section */}
      {people.length > 0 && (
        <div className="mt-10">
          <h3 className="text-2xl font-semibold mb-2">Actors & Crew</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 ">
            {people.map((person) => (
              <div
                key={person.id}
                className="cursor-pointer hover:scale-105 transition transform duration-200"
                onClick={() => navigate(`/person/${person.id}`)}
              >
                <img
                  src={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                      : "https://via.placeholder.com/150"
                  }
                  alt={person.name}
                  className="rounded-lg shadow-md w-48 h-auto object-cover"
                />
                <p className="text-center mt-2 font-semibold">{person.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {movies.length === 0 && people.length === 0 && (
        <p className="text-lg text-gray-400 mt-8 text-center">
          No results found.
        </p>
      )}
    </div>
  );
};

export default SearchPage;
