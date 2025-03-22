
import React, { useState, useEffect } from 'react';
import { CheckCircle, Menu, Moon, Send, X, XCircle } from 'lucide-react';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isTeddyWaving, setIsTeddyWaving] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTeddyClick = () => {
    setIsTeddyWaving(true);
    setTimeout(() => setIsTeddyWaving(false), 2000);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-3 glass' : 'py-6 bg-transparent'}`}>
      <div className="max-w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex justify-between items-center">
        <a href="#hero" className="text-xl sm:text-2xl font-bold gradient-text">Portfolio</a>
        
        <div className="hidden md:flex items-center space-x-2 lg:space-x-6">
          <a href="#about" className="text-foreground hover:text-primary1 transition-colors text-xs lg:text-base whitespace-nowrap px-2">About</a>
          <a href="#skills" className="text-foreground hover:text-primary1 transition-colors text-xs lg:text-base whitespace-nowrap px-2">Skills</a>
          <a href="#work" className="text-foreground hover:text-primary1 transition-colors text-xs lg:text-base whitespace-nowrap px-2">Work</a>
          <a href="#experience" className="text-foreground hover:text-primary1 transition-colors text-xs lg:text-base whitespace-nowrap px-2">Experience</a>
          <a href="#certifications" className="text-foreground hover:text-primary1 transition-colors text-xs lg:text-base whitespace-nowrap px-2">Certifications</a>
          <a href="#contact" className="text-foreground hover:text-primary1 transition-colors text-xs lg:text-base whitespace-nowrap px-2">Contact</a>
        </div>
        
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button 
            onClick={handleTeddyClick} 
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary1 flex items-center justify-center overflow-hidden"
          >
            <span className={`text-lg sm:text-xl ${isTeddyWaving ? 'animate-wave' : ''}`}>🧸</span>
          </button>
          
          <button 
            onClick={toggleSidebar}
            className="md:hidden flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary1"
          >
            <Menu size={16} className="sm:size-18" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
