import { useState } from 'react';

import { AppBar, Toolbar, styled, Box, Typography, InputBase, Avatar, Menu, MenuItem, Button } from "@mui/material";
import { logoURL } from '../../constants/constant';
import DragHandleIcon from '@mui/icons-material/Menu';

import Bookmark from '@mui/icons-material/BookmarkAdd';

import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import HeaderMenu from "./HeaderMenu";

// components
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
  width: 55%;
  border-radius: 0px;
`;

const Logo = styled("img")({
  width: 128,
});

const Header = () => {
  const [open, setOpen] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null); // State to control the dropdown
  const { user, isAuthenticated, logout } = useAuth0(); // Auth0 hook to get user info
  const navigate = useNavigate();

  const handleClick = (e) => {
    setOpen(e.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleProfileClick = (e) => {
    setAnchorEl(e.currentTarget); // Open the menu when profile is clicked
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the menu
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin }); // Log out the user
    setAnchorEl(null); // Close the menu after logout
  };

  const handleProfileNavigation = () => {
    navigate("/profile"); // Navigate to the profile page
    setAnchorEl(null); // Close the menu
  };

  const handleLogoClick = () => {
    navigate("/"); // Navigate to the Home page
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
        <InputSearchField />
        <Typography> </Typography>
        <Box>
          <Bookmark />
          <Typography> Watchlist</Typography>
        </Box>

        {/* User Profile / Sign In */}
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

        {/* Dropdown menu for profile and logout */}
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