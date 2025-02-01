import { useAuth0 } from "@auth0/auth0-react";
import { Box, Typography, Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth0();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h5">You are not logged in.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Add the Squares component as the background */}
     

      {/* Profile content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          paddingTop: "5rem",
          color: "white",
        }}
      >
        <Avatar
          src={user.picture}
          sx={{ width: 100, height: 100, margin: "auto" }}
        />
        <Typography variant="h4" sx={{ mt: 2 }}>
          {user.name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {user.email}
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 2 }}
            onClick={() => navigate("/")}
          >
            Home
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => logout({ returnTo: `${window.location.origin}/home` })}

          >
            Logout
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;