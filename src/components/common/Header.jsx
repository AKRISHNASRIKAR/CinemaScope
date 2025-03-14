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
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "./HeaderMenu";
import { logoURL } from "../../constants/constant";

// Styled Components
const StyledToolbar = styled(Toolbar)`
  background: #000000; /* Black background matching the image */
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
      color: white; 
    }
  }

  & > p {
    font-size: 14px;
    font-weight: 600;
    color: white; 
    cursor: pointer;
  }
`;

const InputSearchField = styled(InputBase)`
  background:rgba(24, 23, 23, 0.81); /* Black background matching the image */
  height: 32px; /* Matches the height in the provided image */
  width: 40em; /* Maintains width from previous version, matching the image */
  border-radius: 8px; 
  padding: 5px 10px; 
  color: #ffffff;

  &::placeholder {
    color: #ffffff; /* White placeholder text */
    opacity: 0.7; /* Subtle opacity for placeholder, matching the image */
  }

  &:focus {
    outline: none;
    border: 2px solid #ffffff; /* White focus ring for visibility on black background */
  }
`;

const SearchIconWrapper = styled(Box)`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: white;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`;

const Logo = styled("img")({
  width: 110, /* Wider logo to match "CINEMASCOPE" text width in the image */
  height: "auto", /* Maintain aspect ratio */
});

const Header = () => {
  const [open, setOpen] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { user, isAuthenticated, logout } = useAuth0();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery.trim().split(" ").join("-")}`);
      setSearchQuery("");
    }
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
    navigate("/profile");
    setAnchorEl(null);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <AppBar position="static">
      <StyledToolbar>
        <Box onClick={handleLogoClick} style={{ cursor: "pointer" }}>
          <Logo src={logoURL} alt="CINEMASCOPE logo" />
        </Box>
        <Box onClick={handleClick}>
          <DragHandleIcon sx={{ color: "white" }} /> {/* White icon for black background */}
          <Typography sx={{ color: "white" }}>Menu</Typography> {/* White text */}
        </Box>
        <HeaderMenu open={open} handleClose={handleClose} />

        {/* Search Box */}
        <Box position="relative" display="flex" alignItems="center">
          <InputSearchField
            placeholder="Search for a movie or actor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Handle Enter Key
          />
          <button
            onClick={handleSearch}
            style={{
              position: "absolute",
              right: "5px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }
          
          }
          >
            <SearchIconWrapper onClick={handleSearch}>
            <SearchIcon  sx={{ color: "white", opacity: 0.7, "&:hover": { opacity: 1 } , paddingLeft: "36px"}} /> {/* White search icon for black search bar */}
            </SearchIconWrapper>
          </button>
          
        </Box>

        <Box>
          <Bookmark sx={{ color: "white" }} /> {/* White icon for black background */}
          <Typography sx={{ color: "white" }}>Watchlist</Typography> {/* White text */}
        </Box>

        <Box onClick={handleProfileClick}>
          {isAuthenticated ? (
            <>
              <Avatar
                src={user.picture}
                sx={{ width: 30, height: 30, marginRight: 1 }}
              />
              <Typography sx={{ color: "white" }}>{user.name}</Typography> {/* White text */}
            </>
          ) : (
            <Typography sx={{ color: "white" }}>Sign In</Typography> 
          )}
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: "#000000", /* Black background for dropdown */
              color: "#ffffff", /* White text for dropdown */
            },
          }}
        >
          <MenuItem onClick={handleProfileNavigation}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
        </Menu>
      </StyledToolbar>
    </AppBar>
  );
};

export default Header;