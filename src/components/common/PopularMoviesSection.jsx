import React from "react";
import { Box, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

const Container = styled(Box)`
  width: 100%;
  max-width: 100vw;
  overflow: hidden;
`;

const Header = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 16px;
`;

const MoviesGrid = styled(Box)`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 16px 0;
  gap: 16px;

  /* Hide scrollbars */
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MovieCard = styled(Box)`
  flex: 0 0 auto;
  width: 150px;
  text-align: center;
  color: #fff;

  img {
    width: 100%;
    border-radius: 8px;
    object-fit: cover;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  .rating {
    background-color: #000;
    color: #fff;
    padding: 2px 6px;
    border-radius: 12px;
    font-size: 12px;
    margin-top: 4px;
    display: inline-block;
  }
`;

const PopularMoviesSection = ({ movies }) => {
  return (
    <Container>
      <Header>What's Popular</Header>
      <MoviesGrid>
        {movies.map((movie) => (
          <MovieCard key={movie.id}>
            {/* Wrap poster with Link */}
            <Link to={`/film/${movie.id}`}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : "/fallback-image.jpg"
                }
                alt={movie.title}
              />
            </Link>
            <Typography variant="body1" mt={1}>
              {movie.title}
            </Typography>
            <Typography variant="caption">
              {new Date(movie.release_date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Typography>
            <div className="rating">
              {movie.vote_average
                ? `${Math.round(movie.vote_average * 10)}%`
                : "NR"}
            </div>
          </MovieCard>
        ))}
      </MoviesGrid>
    </Container>
  );
};

export default PopularMoviesSection;
