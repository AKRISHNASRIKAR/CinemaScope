import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "./HeaderMenu";
import { logoURL } from "../../constants/constant";

import SearchIcon from "@mui/icons-material/Search";

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
    <header className="bg-black text-white px-4 py-4 rounded-2xl">
      <nav className="bg-black/75 rounded-2xl flex items-center justify-between px-8 md:px-8 py-3 min-h-[54px]">
        {/* Logo */}
        <div onClick={handleLogoClick} className="cursor-pointer flex-shrink-0">
          <img
            src={logoURL}
            alt="CINEMASCOPE logo"
            className="w-28 p-2 h-auto px-2"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center space-x-6 flex-1 justify-center max-w-3xl ml-4">
          {/* Search Box */}
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search for a movie or actor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full h-8 bg-[#121116] rounded-lg px-4 pr-10 text-white placeholder-white/70 p-1 text-sm border-2 border-transparent focus:outline-none transition-colors"
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
                  className="w-10 h-8 rounded-full"
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
            <div className="absolute right-0 top-full mt-2 w-48 bg-[#121116] border-gray-700 rounded-lg shadow-lg z-50">
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

      {/* Mobile & Tablet Search Bar */}
      <div className="sm:hidden py-3 px-4 xs:px-6 mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for a movie or actor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full h-10 bg-[#121116] rounded-lg px-4 pr-12 text-white placeholder-white/70 text-sm border-2 border-transparent focus:outline-none transition-colors"
          />
          <button
            onClick={handleSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
          >
            <SearchIcon />
          </button>
        </div>
      </div>

      {/* HeaderMenu */}
      <HeaderMenu open={isMenuOpen} handleClose={() => setIsMenuOpen(false)} />
    </header>
  );
};

export default Header;
