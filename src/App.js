import './App.css';
import React, { useEffect, useState } from 'react';
import Footer from './components/TopBottom/Footer';
import Header from './components/TopBottom/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Pages/Home/Home';
import About from './components/Pages/About/About';
import Services from './components/Pages/Services/Services';
import Pricing from './components/Pages/Pricing/Pricing';
import Blog from './components/Pages/Blog/Blog';
import Contact from './components/Pages/Contact/Contact';

function App() {
  const [mode, setMode] = useState("dark");

  useEffect(() => {
    document.body.style.backgroundColor = "var(--dark)"; // Proper dark mode color
    document.body.setAttribute("data-theme", "dark"); // Set dark mode by default
  }, []);

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.querySelector("body").setAttribute("data-theme", "dark")
      document.body.style.backgroundColor = "var(--dark)";
    } else {
      setMode("light");
      document.querySelector("body").setAttribute("data-theme", "light")
      document.body.style.backgroundColor = "var(--dark)";
    }
  };

  return (
    <>
      <BrowserRouter>
        <Header mode={mode} toggleMode={toggleMode} />
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/about" element={<About />}/>
          <Route exact path="/services" element={<Services />}/>
          <Route exact path="/pricing" element={<Pricing />}/>
          <Route exact path="/blog" element={<Blog />}/>
          <Route exact path="/contact" element={<Contact />}/>
        </Routes>
      </BrowserRouter>

      <Footer mode={mode} />
    </>
  );
}

export default App;
