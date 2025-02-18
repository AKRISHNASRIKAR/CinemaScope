import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, styled } from "@mui/material";
import axios from "axios";

// Styled components
const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  padding: 20px;
  background-color: #121212;
  color: #fff;
  gap: 20px;
`;

const Poster = styled("img")`
  width: 400px;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const Details = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Rating = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #f5c518;
`;

const CastContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 20px;
  overflow-x: auto;
  padding: 10px 0;
`;

const CastMember = styled(Box)`
  flex: 0 0 auto;
  text-align: center;
`;

const CastImage = styled("img")`
  width: 100px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const FilmPage = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [certification, setCertification] = useState("N/A");
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchFilmData = async () => {
      try {
        console.log("Fetching details for movie ID:", id);

        // Fetch film details
        const filmResponse = await axios.get(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        setFilm(filmResponse.data);

        // Fetch certification
        const certResponse = await axios.get(
          `${BASE_URL}/movie/${id}/release_dates?api_key=${API_KEY}`
        );
        const usRelease = certResponse.data.results?.find(
          (entry) => entry.iso_3166_1 === "US"
        );
        setCertification(usRelease?.release_dates?.[0]?.certification || "N/A");

        // Fetch cast
        const creditsResponse = await axios.get(
          `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`
        );
        setCast(creditsResponse.data.cast);
      } catch (error) {
        console.error("Error fetching film details:", error);
        setError("Failed to load film details. Please try again later.");
      }
    };

    fetchFilmData();
  }, [id]);

  if (error) {
    return <Typography>{error}</Typography>;
  }

  if (!film) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container className="min-h-screen bg-[#121212]">
      <Poster
        src={
          film.poster_path
            ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
            : "/fallback-image.jpg"
        }
        alt={film.title || "No Title Available"}
      />

      <Details>
        <Typography variant="h4">{film.title}</Typography>
        <Typography variant="subtitle1" sx={{ fontStyle: "italic" }}>
          {film.tagline || "No tagline available"}
        </Typography>
        <Typography variant="body1">
          {film.overview || "No overview available"}
        </Typography>
        <Rating>
          <Typography>Rating:</Typography>
          <Typography> ⭐ {film.vote_average ? film.vote_average.toFixed(1) : "N/A"} / 10</Typography>
        </Rating>
        <Typography>Certification: {certification}</Typography>
        <Typography>
          Release Date:{" "}
          {film.release_date
            ? new Date(film.release_date).toDateString()
            : "N/A"}
        </Typography>
        <Typography>
          Runtime: {film.runtime ? `${film.runtime} minutes` : "N/A"}
        </Typography>
        <Typography>
          Genres:{" "}
          {film.genres ? film.genres.map((g) => g.name).join(", ") : "N/A"}
        </Typography>

        {/* Cast Section */}
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Cast
          </Typography>
          <CastContainer>
            {cast.slice(0,10).map((member) => (
              <CastMember key={member.id}>
                <CastImage
                  src={
                    member.profile_path
                      ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                      : "/fallback-image.jpg"
                  }
                  alt={member.name}
                />
                <Typography variant="body2" className="mt-1">
                  {member.name}
                </Typography>
              </CastMember>
            ))}
          </CastContainer>
        </Box>
      </Details>
    </Container>
  );
};

export default FilmPage;
