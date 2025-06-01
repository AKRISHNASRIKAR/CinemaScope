import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth0Provider, withAuthenticationRequired } from "@auth0/auth0-react";
import Home from "./pages/Home";
import LoginPage from "./components/LoginPage";
import Header from "./components/common/Navbar";
import Profile from "./pages/Profile";
import FilmPage from "./pages/FilmPage"; // Import the FilmPage component
import SearchPage from "./pages/SearchPage";
import Person from "./pages/Person";

import "./App.css";

const ProtectedRoute = ({ component, ...args }) => {
  const Component = withAuthenticationRequired(component, args);
  return <Component />;
};

function App() {
  return (
    <Router>
      <Header /> {/* Include header outside Routes to make it persistent */}
      <Routes>
        <Route path="/" element={<ProtectedRoute component={Home} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/profile"
          element={<ProtectedRoute component={Profile} />}
        />
        <Route
          path="/film/:id"
          element={<ProtectedRoute component={FilmPage} />}
        />{" "}
        {/* FilmPage route */}
        <Route
          path="/person/:person_id"
          element={<ProtectedRoute component={Person} />}
        />{" "}
        {/* Person route */}
        <Route path="/search/:query" element={<SearchPage />} />{" "}
        {/* SearchPage routr */}
      </Routes>
    </Router>
  );
}

export default App;
