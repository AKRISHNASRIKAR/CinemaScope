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
      console.log('Environment Variables:', {
        API_BASE_URL,
        API_KEY_EXISTS: !!API_KEY
      });

      try {
        if (!API_BASE_URL || !API_KEY) {
          throw new Error('Missing environment variables');
        }

        const url = `${API_BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`;
        console.log('Fetching from:', url);

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received data:', data);
        setMovies(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error details:", error);
        setError(`Failed to load movies: ${error.message}`);
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
          Please check the console for more details.
        </Alert>
      </Box>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      <Box>
        <Banner movies={movies} />
      </Box>
      <PopularMoviesSection movies={movies} />
    </div>
  );
};

export default Home;
