import { motion } from 'motion/react';
import { LogOut, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
// Importamos tu logo desde la carpeta assets
import logoImage from '../assets/LOGO.png';

interface NavigationProps {
  onLogout: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navigation({ onLogout, activeSection, setActiveSection }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'nosotros', label: 'Nosotros' },
    { id: 'beneficios', label: 'Beneficios' },
    { id: 'revista', label: 'Revista' },
    { id: 'contacto', label: 'Contacto' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-lg py-3 shadow-sm' 
            : 'bg-transparent py-4 md:py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Contenedor del Logo: Ajustado para mostrar color original siempre */}
            <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('inicio')}>
              <img 
                src={logoImage} 
                alt="FC TRAVEL Logo" 
                className="h-15 w-auto md:h-19 transition-all duration-300" 
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative text-xs font-bold uppercase tracking-widest transition-colors ${
                    isScrolled 
                      ? activeSection === item.id ? 'text-brand-accent' : 'text-brand-primary/60 hover:text-brand-primary' 
                      : activeSection === item.id ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div 
                      layoutId="nav-underline"
                      className={`absolute -bottom-1 left-0 right-0 h-px ${isScrolled ? 'bg-brand-accent' : 'bg-white'}`}
                    />
                  )}
                </button>
              ))}
              
              <button 
                onClick={onLogout}
                className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all ${
                  isScrolled 
                    ? 'border-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white' 
                    : 'border-white/20 text-white hover:bg-white hover:text-brand-primary'
                }`}
              >
                Cerrar Sesión
                <LogOut className="h-3 w-3" />
              </button>
            </div>

            {/* Mobile Toggle */}
            <button 
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className={`h-6 w-6 ${isScrolled ? 'text-brand-primary' : 'text-white'}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={isMobileMenuOpen ? { x: 0 } : { x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-50 lg:hidden bg-brand-primary text-white"
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center">
              <img 
                src={logoImage} 
                alt="FC TRAVEL Logo" 
                className="h-10 w-auto" 
              />
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <X className="h-8 w-8 text-white" />
            </button>
          </div>

          <div className="flex flex-col gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-3xl serif font-light text-left ${activeSection === item.id ? 'text-brand-accent' : 'text-white'}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-auto">
            <button 
              onClick={onLogout}
              className="flex items-center gap-4 text-xl font-light text-white/60"
            >
              <LogOut className="h-6 w-6" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}