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
        // Fetch person details 
        const personResponse = await axios.get(
          `${BASE_URL}/person/${person_id}?api_key=${API_KEY}&language=en-US`
        );
        setPerson(personResponse.data);

        // Fetch film credits 
        const creditsResponse = await axios.get(
          `${BASE_URL}/person/${person_id}/combined_credits?api_key=${API_KEY}`
        );
        setCredits(creditsResponse.data.cast || []); // Focus on cast credits for simplicity
      } catch (error) {
        console.error("Error fetching person details:", error);
        setError("Failed to load person details. Please try again later.");
      }
    };

    fetchPersonData();
  }, [person_id]);

  if (error) {
    return <p className="text-white text-center p-4">{error}</p>; // Error message styled with Tailwind
  }

  if (!person) {
    return <p className="text-white text-center p-4">Loading...</p>; // Loading state styled with Tailwind
  }

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col  rounded-lg"> {/* Dark background color, full height, flex column, rounded corners */}

      {/* Profile image section */}
      <div className="w-[70%] md:w-1/3 p-5 flex items-center justify-center rounded-lg"> 
        <div className="w-[300px] md:w-[100px] h-auto rounded-lg shadow-lg ">
          <img
           src={ 
              person.profile_path
                ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                : "/fallback-image.jpg"
            }
              alt={person.name || "No Name Available"}
              className="w-[300px] md:w-[100px] h-auto rounded-lg shadow-lg object-cover grayscale" 
         />
        </div>
      </div>

      {/* Details and credits section */}
      <div className="w-full md:w-2/3 p-5 flex flex-col justify-right "> 
        <div className="flex-1 flex flex-col gap-4 pr-5 justify-right"> 
          <h1 className="text-2xl font-bold text-right">{person.name}</h1> 

          {/* Biography */}
          <p className="text-base leading-relaxed text-right">
            {person.biography || "No biography available."}
          </p> {/* Bio: base text size, relaxed line height, right-aligned */}

          {/* Film credits */}
          <div className="mt-6 rounded-lg"> {/* Margin top for spacing */}
            <h2 className="text-xl font-semibold mb-4 text-right">Film Credits</h2> 
            <div className="grid grid-cols-5 gap-5 pb-4 rounded-lg"> 
              {credits.slice(0, 5).map((credit) => ( 
                <div key={credit.id} className=" text-center rounded-lg"> 
                  <img
                    src={
                      credit.poster_path
                        ? `https://image.tmdb.org/t/p/w200${credit.poster_path}`
                        : "/fallback-image.jpg"
                    }
                    alt={credit.title || "No Title Available"}
                    className="w-full h-[225px] rounded-lg shadow-md object-cover mb-2 cursor-pointer" // Film poster: full width, fixed height, rounded, shadow, cover fit, clickable
                    onClick={() => navigate(`/film/${credit.id}`)} // Navigate to film page on click
                  />
                  <p className="text-sm truncate text-right">{credit.title || "Untitled"}</p> {/* Title: small text, truncate if too long, right-aligned */}
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
