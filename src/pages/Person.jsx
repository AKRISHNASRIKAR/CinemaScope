import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Person = () => {
  const { person_id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);
  const [credits, setCredits] = useState([]);
  const [error, setError] = useState(null);

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchPersonData = async () => {
      try {
        const personResponse = await axios.get(
          `${BASE_URL}/person/${person_id}?api_key=${API_KEY}&language=en-US`
        );
        setPerson(personResponse.data);

        const creditsResponse = await axios.get(
          `${BASE_URL}/person/${person_id}/combined_credits?api_key=${API_KEY}`
        );
        setCredits(creditsResponse.data.cast || []);
      } catch (error) {
        console.error("Error fetching person details:", error);
        setError("Failed to load person details. Please try again later.");
      }
    };

    fetchPersonData();
  }, [person_id]);

  if (error) {
    return <p className="text-white text-center p-4">{error}</p>;
  }

  if (!person) {
    return <p className="text-white text-center p-4">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-[#121212] rounded-2xl p-4 md:p-8">
      {/* Layout: column on mobile, row on desktop */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Profile image */}
        <div className="w-full md:w-1/3 mt-2 flex justify-center">
          <img
            src={
              person.profile_path
                ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                : "/fallback-image.jpg"
            }
            alt={person.name || "No Name Available"}
            className="w-64 h-auto rounded-lg shadow-lg object-cover grayscale"
          />
        </div>

        {/* Person details */}
        <div className="w-full md:w-2/3 flex flex-col text-left">
          <h1 className="text-2xl text-start font-bold mb-2">
            {" "}
            {person.name}{" "}
          </h1>

          <p className="text-base justify justify-center  m-6">
            {person.biography || "No biography available."}
          </p>

          {/* Film credits */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Film Credits</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-8">
              {credits.slice(0, 6).map((credit) => (
                <div key={credit.id} className="text-center">
                  <img
                    src={
                      credit.poster_path
                        ? `https://image.tmdb.org/t/p/w200${credit.poster_path}`
                        : "/fallback-image.jpg"
                    }
                    alt={credit.title || "No Title Available"}
                    className="w-full h-[225px] rounded-lg shadow-md object-cover mb-2 cursor-pointer"
                    onClick={() => navigate(`/film/${credit.id}`)}
                  />
                  <p className="text-sm truncate">
                    {credit.title || "Untitled"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Person;
