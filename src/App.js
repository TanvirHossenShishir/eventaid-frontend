import React from "react";
import Navbar from "./Components/Navigation/Navbar";
import LandingPage from "./Components/Pages/LandingPage";
import Error from "./Components/Pages/Error"
import Footer from "./Components/Footer/Footer";
import Dashboard from "./Components/Dashboard/Dashboard";
import ViewProfile from "./Components/Profile/ViewProfile";
import EditProfile from "./Components/Profile/EditProfile";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            window.localStorage.getItem("isAuthenticated") ? (
              <Dashboard />
            ) : (
              <LandingPage />
            )
          }
        />
        <Route exact path="/landing" element={<LandingPage />} />
        <Route exact path="/view" element={<ViewProfile />} />
        <Route exact path="/edit" element={<EditProfile />} />
        <Route path="*" element={<Error/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
