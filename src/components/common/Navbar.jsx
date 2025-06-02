import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "./HeaderMenu";
import { logoURL } from "../../constants/constant";

const SearchIcon = () => (
  <svg
    className="w-4 h-4 pointer-events-none"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { user, isAuthenticated, logout } = useAuth0();
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      navigate(`/search/${trimmedQuery.split(" ").join("-")}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
    setIsProfileMenuOpen(false);
  };

  const handleProfileNavigation = () => {
    navigate("/profile");
    setIsProfileMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className="bg-black text-white px-4 py-4">
      <nav className="flex items-center justify-between px-4 md:px-8 py-3 min-h-[54px]">
        {/* Logo */}
        <div onClick={handleLogoClick} className="cursor-pointer flex-shrink-0">
          <img
            src={logoURL}
            alt="CINEMASCOPE logo"
            className="w-28 p-2 h-auto"
          />
        </div>

        {/* Desktop Navigation - Updated for tablet responsiveness */}
        <div className="hidden sm:flex items-center space-x-6 flex-1 justify-center max-w-3xl ml-4">
          {/* Search Box - Made more compact */}
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search for a movie or actor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full h-8 bg-[#121116] rounded-lg px-4 pr-10 text-white placeholder-white/70 text-sm border-2 border-transparent focus:outline-none transition-colors"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-1"
            >
              <SearchIcon />
            </button>
          </div>
        </div>

        {/* Profile Section */}
        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center space-x-2 px-4 pr-4 hover:bg-gray-800 rounded-lg transition-colors p-2"
          >
            {isAuthenticated ? (
              <>
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-semibold hidden md:block p-2 px-0.5">
                  {user.name}
                </span>
              </>
            ) : (
              <span className="text-sm font-semibold">Sign In</span>
            )}
          </button>

          {/* Profile Dropdown */}
          {isProfileMenuOpen && isAuthenticated && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-black border border-gray-700 rounded-lg shadow-lg z-50">
              <button
                onClick={handleProfileNavigation}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-800 transition-colors"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-800 transition-colors border-t border-gray-700"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile & Tablet Search Bar - Updated for better tablet appearance */}
      <div className="sm:hidden px-4 pb-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for a movie or actor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full h-8 bg-[#121116] rounded-lg px-4 pr-10 text-white placeholder-white/70 text-sm border-2 border-transparent focus:border-white focus:outline-none transition-colors"
          />
          <button
            onClick={handleSearch}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-1"
          >
            <SearchIcon />
          </button>
        </div>
      </div>

      {/* HeaderMenu Component */}
      <HeaderMenu open={isMenuOpen} handleClose={() => setIsMenuOpen(false)} />
    </header>
  );
};

export default Header;
