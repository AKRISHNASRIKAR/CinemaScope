import { useEffect, useState } from "react";
import { Box, CircularProgress, Alert } from "@mui/material";
import Banner from "../components/common/Banner";
import PopularMoviesSection from "../components/common/PopularMoviesSection";
import "../index.css";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();
        setMovies(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Unable to load movies. Please try again later.");
        setLoading(false);
      }
    };

    fetchMovies();
  }, [API_BASE_URL, API_KEY]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={2}>
        <Alert severity="error">
          {error} <br />
          Try refreshing the page or check back later.
        </Alert>
      </Box>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Banner Section */}
      <Box>
        <Banner movies={movies} />
      </Box>

      {/* What's Popular Section */}
      <PopularMoviesSection movies={movies} />
    </div>
  );
};

export default Home;
