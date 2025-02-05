import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Banner.css";

const Banner = ({ movies }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate(); // Initialize navigate

    const nextSlide = () => {
        setCurrentIndex(prev => (prev + 1) % movies.length);
    };

    const prevSlide = () => {
        setCurrentIndex(prev => (prev - 1 + movies.length) % movies.length);
    };

    useEffect(() => {
        if (movies.length > 0 && !isHovered) {
            const interval = setInterval(nextSlide, 3000); // Change every 3 seconds
            return () => clearInterval(interval);
        }
    }, [currentIndex, movies.length, isHovered]);

    if (!movies?.length) {
        return (
            <div className="banner">
                <h2>No upcoming movies found.</h2>
            </div>
        );
    }

    const currentMovie = movies[currentIndex];

    return (
        <div 
            className="banner"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button 
                onClick={prevSlide} 
                className="nav-button prev"
                aria-label="Previous slide"
            >
                &lt;
            </button>
            
            <div className="banner-content">
                <img
                    key={currentMovie.id}
                    src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
                    alt={currentMovie.title}
                    className="banner-image"
                    onError={(e) => {
                        e.target.src = './public/fallback-image.jpg';
                    }}
                    onClick={() => navigate(`/film/${currentMovie.id}`)} // Navigate to FilmPage
                />
                <div className="banner-info">
                    <h2>{currentMovie.title}</h2>
                </div>
            </div>

            <button 
                onClick={nextSlide} 
                className="nav-button next"
                aria-label="Next slide"
            >
                &gt;
            </button>
        </div>
    );
};

export default Banner;
