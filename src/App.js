import React from "react";
import Navbar from "./Components/Navigation/Navbar"
import LandingPage from "./Components/Pages/LandingPage";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>      
      <Navbar/>
      <LandingPage/>
    </>
  );
}

export default App;
