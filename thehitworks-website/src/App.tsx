import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import CursorLight from "./components/Common/CursorLight";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Process from "./pages/Process";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import Faq from "./components/FAQ/FAQ";
import Solutions from "./pages/Solutions";
import CaseStudies from "./pages/CaseStudies";
import TechnologiesPage from "./components/Technologies/Technologies";

import CharacterWidget from "./character/CharacterWidget";
import ScrollToTop from "./components/Common/ScrollToTop";


function AppContent() {
  const location = useLocation();
  const isContactPage =
    location.pathname === "/contact" ||
    location.pathname.startsWith("/contact/");

  return (
    <>
      <ScrollToTop />
      <CursorLight />
      <Navbar />
      {!isContactPage && <CharacterWidget />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route
          path="/technologies"
          element={<TechnologiesPage />}
        />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/case-studies"
          element={<CaseStudies />}
        />
        <Route path="/process" element={<Process />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/blog" element={<Blog />} />
        <Route
          path="*"element={
            <div className="min-h-screen flex items-center justify-center">
              <h1>404 — Page not found</h1>
            </div>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}


export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}