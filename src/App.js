import React from "react";
import Navbar from "./Components/Navigation/Navbar";
import LandingPage from "./Components/Pages/LandingPage";
import Footer from "./Components/Footer/Footer";
import Dashboard from "./Components/Dashboard/Dashboard";
import ViewProfile from "./Components/Profile/ViewProfile";
import EditProfile from "./Components/Profile/EditProfile";
import { Route, Routes } from "react-router-dom";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      {/* <Dashboard/>   */}
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/view" element={<ViewProfile />} />
        <Route exact path="/edit" element={<EditProfile />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
