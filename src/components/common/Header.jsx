import { useState } from "react";
import {
  AppBar,
  Toolbar,
  styled,
  Box,
  Typography,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import DragHandleIcon from "@mui/icons-material/Menu";
import Bookmark from "@mui/icons-material/BookmarkAdd";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "./HeaderMenu";
import { logoURL } from "../../constants/constant";

// Styled Components
const StyledToolbar = styled(Toolbar)`
  background: #000000;
  min-height: 54px !important;
  padding: 0 30px !important;
  justify-content: space-between;

  & > * {
    padding: 0 16px;
  }

  & > div {
    display: flex;
    align-items: center;
    cursor: pointer;

    & > p {
      font-size: 14px;
      font-weight: 600;
    }
  }

  & > p {
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }
`;

const InputSearchField = styled(InputBase)`
  background: #434343;
  height: 30px;
  width: 70em;
  border-radius: 0px;
  padding: 5px;
  color: white;
`;

const SuggestionsBox = styled(Box)`
  position: absolute;
  background: black;
  width: 70%;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
  border: 1px solid #434343;
`;

const SuggestionItem = styled(Box)`
  padding: 10px;
  cursor: pointer;
  color: white;
  &:hover {
    background: #333;
  }
`;

const Logo = styled("img")({
  width: 128,
});

const Header = () => {
  const [open, setOpen] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const { user, isAuthenticated, logout } = useAuth0();
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      try {
        const response = await axios.get(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`
        );
        setSuggestions(response.data.results.slice(0, 3));
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectMovie = (movieId) => {
    navigate(`/film/${movieId}`);
    setSearchQuery("");
    setSuggestions([]);
  };

  const handleClick = (e) => {
    setOpen(e.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleProfileClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
    setAnchorEl(null);
  };

  const handleProfileNavigation = () => {
    navigate("/profile");                                                         //For onclick logo routing
    setAnchorEl(null);
  };                  

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <AppBar position="static">
      <StyledToolbar>
        <Box onClick={handleLogoClick} style={{ cursor: "pointer" }}>
          <Logo src={logoURL} alt="logo" />
        </Box>
        <Box onClick={handleClick}>
          <DragHandleIcon />
          <Typography> Menu </Typography>
        </Box>
        <HeaderMenu open={open} handleClose={handleClose} />

        {/* Search Box with Suggestions */}
        <Box position="relative">
          <InputSearchField
            placeholder="Search for a movie..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />                                                                                          
          {suggestions.length > 0 && (
            <SuggestionsBox>
              {suggestions.map((movie) => (
                <SuggestionItem
                  key={movie.id}
                  onClick={() => handleSelectMovie(movie.id)}
                >
                  {movie.title}
                </SuggestionItem>
              ))}
            </SuggestionsBox>
          )}
        </Box>

        <Box>
          <Bookmark />
          <Typography> Watchlist</Typography>
        </Box>

        <Box onClick={handleProfileClick}>
          {isAuthenticated ? (
            <>
              <Avatar
                src={user.picture}
                sx={{ width: 30, height: 30, marginRight: 1 }}
              />
              <Typography>{user.name}</Typography>
            </>
          ) : (
            <Typography> Sign In </Typography>
          )}
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleProfileNavigation}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
        </Menu>
      </StyledToolbar>
    </AppBar>
  );
};

export default Header;
