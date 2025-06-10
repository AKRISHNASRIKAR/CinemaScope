import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth0();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl">You are not logged in.</h2>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Profile content */}

      <div className="relative  z-10 text-center pt-20 text-white m-10">
        <img
          src={user.picture}
          alt="Profile"
          className="w-24 h-24 items-center rounded-full mx-auto"
        />
        <h1 className="text-3xl mt-4">{user.name}</h1>
        <p className="text-gray-400 p-4">{user.email}</p>
        <div className="mt-6 p-20 gap-4 flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4"
            onClick={() => navigate("/")}
          >
            Home
          </button>
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={() =>
              logout({ returnTo: `${window.location.origin}/home` })
            }
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
