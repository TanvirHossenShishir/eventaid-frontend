import React from "react";
import Navbar from "./Components/Navigation/Navbar"
import LandingPage from "./Components/Pages/LandingPage";
import Footer from "./Components/Footer/Footer";
import Dashboard from "./Components/Profile/Dashboard"
import { Route, Routes } from "react-router-dom";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>    
    {/* <Dashboard/>   */}
      <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route exact path="/browse" element={<Dashboard/>} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
