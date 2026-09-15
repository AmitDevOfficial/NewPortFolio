import './App.css';
import { useEffect, useState } from 'react';
import Footer from './components/TopBottom/Footer';
import Header from './components/TopBottom/Header';
import Home from './components/Pages/Home/Home';
import AdminDashboard from './components/Admin/AdminDashboard';
import WhatsAppButton from './components/TopBottom/WhatsAppButton';
import ScrollFollowLines from './components/TopBottom/ScrollFollowLines';

function App() {
  const [mode, setMode] = useState("dark");

  useEffect(() => {
    document.body.style.backgroundColor = "var(--dark)";
    document.body.setAttribute("data-theme", "dark");
  }, []);

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.setAttribute("data-theme", "dark");
      document.body.style.backgroundColor = "var(--dark)";
    } else {
      setMode("light");
      document.body.setAttribute("data-theme", "light");
      document.body.style.backgroundColor = "var(--dark)";
    }
  };

  const isAdminRoute = window.location.pathname.replace(/\/$/, "") === "/admin";

  if (isAdminRoute) {
    return <AdminDashboard />;
  }

  return (
    <>
      <Header mode={mode} toggleMode={toggleMode} />
      <Home />
      <Footer />
      <WhatsAppButton />
      <ScrollFollowLines />
    </>
  );
}

export default App;
