
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const getMovies = async (type) => {
  try {
    let url;
    switch (type) {
      case "popular":
        url = `${API_BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`;
        break;
      case "upcoming":
        url = `${API_BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US`;
        break;
      case "toprated":
        url = `${API_BASE_URL}/movie/toprated?api_key=${API_KEY}&language=en-US`;
        break;
      case "nowplaying":
        url = `${API_BASE_URL}/movie/nowplaying?api_key=${API_KEY}&language=en-US`;
        break;
      default:
        throw new Error("Invalid movie type");
    }

    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching ${type} movies:`, error);
    throw error;
  }

}
  export const getMovieDetails = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/movie/${id}`, {
        params: {
          api_key: API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching details for movie ID ${id}:`, error);
      throw error;
    }
}
    export const getMovieCertification = async (movieId) => {
        try {
            const url = `${BASE_URL}/movie/${movieId}/release_dates?api_key=${API_KEY}`;
            const response = await axios.get(url);
    
            // Find certification for the US region (or any preferred region)
            const usCert = response.data.results.find((item) => item.iso_3166_1 === "US");
    
            // Return the certification (if available)
            return usCert?.release_dates[0]?.certification || "N/A";
        } catch (error) {
            console.error("Error fetching movie certification:", error);
            return "N/A"; // Return "N/A" if there's an error
        }
    
};
