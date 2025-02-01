import { useEffect, useState } from "react";
import { Box, CircularProgress, Alert } from "@mui/material";
import Banner from "../components/common/Banner";
import '../index.css'
import { getMovies } from "../services/api";
import { Upcoming } from "@mui/icons-material";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await getMovies('nowplaying');                           {  /* Fetch movies*/ }
                
                // Filter movies with valid backdrop images
                const validMovies = data.filter(movie => 
                    movie.backdrop_path && movie.title
                );

                if (validMovies.length > 0) {
                    setMovies(validMovies);
                } else {
                    setError("No movies found in the API response.");
                }
            } catch (err) {
                setError(err.message || "Failed to fetch movies");
            } finally {
                setLoading(false);
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
            <div className="min-h-screen bg-[#121212]" >
            <Box>
                <Banner movies={movies} />
            </Box>
            </div>
            
           
        </>
    );
};

export default Home;
