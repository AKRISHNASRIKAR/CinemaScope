import { useEffect, useState } from "react";
import { Box, CircularProgress, Alert } from "@mui/material";
import Banner from "../components/common/Banner";
import PopularMoviesSection from "../components/common/PopularMoviesSection"; // Import new component
import "../index.css";
import axios from "axios";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
  const fetchMovies = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    
    const data = await response.json();
    setMovies(data.results);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


  

    fetchMovies();
  }, []);

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
    <>
      {/* Banner Section */}
      <div className="min-h-screen bg-[#121212]">
        <Box>
          <Banner movies={movies} />
        </Box>
        {/* What's Popular Section */}
        <PopularMoviesSection movies={movies} />
      </div>
    </>
  );
};

export default Home;
