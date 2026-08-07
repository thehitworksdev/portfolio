// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Hero from "./components/Hero/Hero";
// import About from "./pages/About";
// import Services from "./pages/Services";
// import Portfolio from "./pages/Portfolio";
// import Contact from "./pages/Contact";
// import Navbar from "./components/Navbar/Navbar"; 
// import Footer from "./components/Footer/Footer"; 

import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";

export default function App() {
  return (
    <BrowserRouter>
      <Home />
      <Blog />
    </BrowserRouter>
  );
}