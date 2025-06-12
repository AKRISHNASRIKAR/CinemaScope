import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
    return (
      <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center p-4">
        <div className="text-white p-4 text-center">{error}</div>
      </div>
    );
  }

  if (!film) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4">
        <div className="text-white p-4">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] rounded-xl text-white p-20 sm:p-8 lg:p-8 ">
      {/* Mobile Layout */}
      <div className="md:hidden space-y-4 space-x-5 mt-5 ">
        <div className="flex flex-col items-center ">
          <img
            src={
              film.poster_path
                ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
                : "/fallback-image-film.jpg"
            }
            alt={film.title || "No Title Available"}
            className="w-full max-w-[300px] rounded-lg shadow-lg aspect-[2/3] object-cover   "
          />

          <div className="w-full space-y-4 mt-6">
            <h1 className="text-2xl font-bold text-center">{film.title}</h1>
            {film.tagline && (
              <p className="italic text-gray-400 text-center">{film.tagline}</p>
            )}

            <div className="flex items-center justify-center gap-2">
              <span className="text-yellow-400 font-bold">⭐</span>
              <span>
                {film.vote_average ? film.vote_average.toFixed(1) : "N/A"} / 10
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="font-bold text-yellow-400">
                  Certification:
                </span>
                <span>{certification}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-yellow-400">Release Date:</span>
                <span>
                  {film.release_date
                    ? new Date(film.release_date).toDateString()
                    : "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-yellow-400">Runtime:</span>
                <span>{film.runtime ? `${film.runtime} minutes` : "N/A"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-yellow-400">Genres:</span>
                <span className="items-end-safe">
                  {film.genres
                    ? film.genres.map((g) => g.name).join(", ")
                    : "N/A"}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="font-bold text-yellow-400 text-lg mb-3">
                Overview
              </h2>
              <p className="leading-relaxed">
                {film.overview || "No overview available"}
              </p>
            </div>
          </div>

          {/* Cast Section - Mobile */}
          <div className="w-full mt-8">
            <h2 className="text-xl font-bold mb-4">Cast</h2>
            <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide">
              {cast.slice(0, 8).map((member) => (
                <div
                  key={member.id}
                  className="flex-shrink-0 w-[90px] text-center"
                >
                  <img
                    src={
                      member.profile_path
                        ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                        : "/fallback-image.jpg"
                    }
                    alt={member.name}
                    className="w-full h-[135px] rounded-lg object-cover shadow-md"
                  />
                  <p className="mt-2 text-xs leading-tight">{member.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tablet Layout (768px - 1024px) */}
      <div className="hidden md:block lg:hidden">
        <div className="flex flex-col gap-8">
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <img
                src={
                  film.poster_path
                    ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
                    : "/fallback-image-film.jpg"
                }
                alt={film.title || "No Title Available"}
                className="w-[280px] h-[420px] rounded-lg shadow-lg object-cover"
              />
            </div>

            <div className="flex-1 space-y-5">
              <h1 className="text-3xl font-bold">{film.title}</h1>
              {film.tagline && (
                <p className="italic text-gray-400 text-lg">{film.tagline}</p>
              )}

              <div className="flex items-center gap-2 text-lg">
                <span className="text-yellow-400 font-bold">⭐</span>
                <span>
                  {film.vote_average ? film.vote_average.toFixed(1) : "N/A"} /
                  10
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-bold text-yellow-400">
                    Certification:
                  </span>{" "}
                  {certification}
                </div>
                <div>
                  <span className="font-bold text-yellow-400">
                    Release Date:
                  </span>{" "}
                  {film.release_date
                    ? new Date(film.release_date).toDateString()
                    : "N/A"}
                </div>
                <div>
                  <span className="font-bold text-yellow-400">Runtime:</span>{" "}
                  {film.runtime ? `${film.runtime} minutes` : "N/A"}
                </div>
                <div className="col-span-2">
                  <span className="font-bold text-yellow-400">Genres:</span>{" "}
                  {film.genres
                    ? film.genres.map((g) => g.name).join(", ")
                    : "N/A"}
                </div>
              </div>

              <div>
                <h2 className="font-bold text-yellow-400 text-lg mb-3">
                  Overview
                </h2>
                <p className="leading-relaxed">
                  {film.overview || "No overview available"}
                </p>
              </div>
            </div>
          </div>

          {/* Cast Section - Tablet */}
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Cast</h2>
            <div className="grid grid-cols-6 gap-4">
              {cast.slice(0, 12).map((member) => (
                <div key={member.id} className="text-center">
                  <img
                    src={
                      member.profile_path
                        ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                        : "/fallback-image.jpg"
                    }
                    alt={member.name}
                    className="w-full h-[140px] rounded-lg object-cover shadow-md"
                  />
                  <p className="mt-2 text-sm leading-tight">{member.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout (> 1024px) */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-10">
            <div className="flex-shrink-0">
              <img
                src={
                  film.poster_path
                    ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
                    : "/fallback-image-film.jpg"
                }
                alt={film.title || "No Title Available"}
                className="w-[350px] h-[525px] rounded-lg shadow-lg object-cover"
              />
            </div>

            <div className="flex-1 space-y-6">
              <h1 className="text-4xl font-bold">{film.title}</h1>
              {film.tagline && (
                <p className="italic text-gray-400 text-xl">{film.tagline}</p>
              )}

              <div className="flex items-center gap-2 text-xl">
                <span className="text-yellow-400 font-bold">⭐</span>
                <span>
                  {film.vote_average ? film.vote_average.toFixed(1) : "N/A"} /
                  10
                </span>
              </div>

              <div className="grid grid-cols-2 gap-6 text-base">
                <div>
                  <span className="font-bold text-yellow-400">
                    Certification:
                  </span>{" "}
                  {certification}
                </div>
                <div>
                  <span className="font-bold text-yellow-400">
                    Release Date:
                  </span>{" "}
                  {film.release_date
                    ? new Date(film.release_date).toDateString()
                    : "N/A"}
                </div>
                <div>
                  <span className="font-bold text-yellow-400">Runtime:</span>{" "}
                  {film.runtime ? `${film.runtime} minutes` : "N/A"}
                </div>
                <div>
                  <span className="font-bold text-yellow-400">Genres:</span>{" "}
                  {film.genres
                    ? film.genres.map((g) => g.name).join(", ")
                    : "N/A"}
                </div>
              </div>

              <div>
                <h2 className="font-bold text-yellow-400 text-2xl mb-4">
                  Overview
                </h2>
                <p className="text-lg leading-relaxed">
                  {film.overview || "No overview available"}
                </p>
              </div>

              {/* Cast Section - Desktop */}
              <div className="mt-10">
                <h2 className="text-2xl font-bold mb-6">Cast</h2>
                <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
                  {cast.slice(0, 10).map((member) => (
                    <div
                      key={member.id}
                      className="flex-shrink-0 w-[100px] text-center"
                    >
                      <img
                        src={
                          member.profile_path
                            ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                            : "/fallback-image.jpg"
                        }
                        alt={member.name}
                        className="w-[100px] h-[150px] rounded-lg object-cover shadow-md cursor-pointer"
                      />
                      <p className="mt-2 text-sm leading-tight">
                        {member.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FilmPage;
