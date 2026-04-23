import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Login from './components/Login';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Benefits from './components/Benefits';
import Destinations from './components/Destinations';
import Magazine from './components/Magazine';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const authStatus = localStorage.getItem('fc_travel_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (status: boolean) => {
    setIsAuthenticated(status);
    if (status) {
      localStorage.setItem('fc_travel_auth', 'true');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('fc_travel_auth');
  };

  if (!isAuthenticated) {
    return (
      <AnimatePresence mode="wait">
        <Login onLogin={handleLogin} />
      </AnimatePresence>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] selection:bg-brand-accent selection:text-white">
      <Navigation onLogout={handleLogout} activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main>
        <div id="inicio">
          <Hero />
        </div>

        <div className="py-20 lg:py-32">
          <Destinations />
        </div>
        
        <div id="nosotros" className="py-20 lg:py-32">
          <About />
        </div>

        <div id="beneficios" className="py-20 lg:py-32 bg-white">
          <Benefits />
        </div>

        <div id="revista" className="py-20 lg:py-32 bg-brand-primary text-white">
          <Magazine />
        </div>

        <div id="contacto" className="py-20 lg:py-32">
          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  );
}

