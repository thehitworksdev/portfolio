import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import Faq from "./components/FAQ/FAQ";
import Solutions from "./pages/Solutions";
import CaseStudies from "./pages/CaseStudies";
import TechnologiesPage from "./components/Technologies/Technologies";
import CharacterWidget from "./character/CharacterWidget"; // <-- added

export default function App() {
  return (
    <BrowserRouter>
      <CursorLight />
      <CharacterWidget /> {/* <-- added: sibling to Routes, so it persists across every page */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/technologies" element={<TechnologiesPage />} />
          <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/process" element={<Process />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="*" element={<div className="p-10 text-center font-term text-xl">Page not found — check your routes.</div>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
