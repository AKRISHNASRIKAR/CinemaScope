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
    const fetchWithTimeout = async (url, timeout = 5000) => {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);

      try {
        const response = await fetch(url, {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        clearTimeout(id);
        return response;
      } catch (error) {
        clearTimeout(id);
        throw error;
      }
    };

    const fetchMovies = async () => {
      try {
        if (!API_BASE_URL || !API_KEY) {
          throw new Error('Missing environment variables');
        }

        const url = `${API_BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`;
        const response = await fetchWithTimeout(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
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
