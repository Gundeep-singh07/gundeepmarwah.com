
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
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#hero" className="text-2xl font-bold gradient-text">Portfolio</a>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#about" className="text-foreground hover:text-primary1 transition-colors">About</a>
          <a href="#skills" className="text-foreground hover:text-primary1 transition-colors">Skills</a>
          <a href="#work" className="text-foreground hover:text-primary1 transition-colors">Work</a>
          <a href="#experience" className="text-foreground hover:text-primary1 transition-colors">Experience</a>
          <a href="#certifications" className="text-foreground hover:text-primary1 transition-colors">Certifications</a>
          <a href="#contact" className="text-foreground hover:text-primary1 transition-colors">Contact</a>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleTeddyClick} 
            className="w-10 h-10 rounded-full bg-primary1 flex items-center justify-center overflow-hidden"
          >
            <span className={`text-xl ${isTeddyWaving ? 'animate-wave' : ''}`}>🧸</span>
          </button>
          
          <button 
            onClick={toggleSidebar}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-primary1"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
