
import React, { useRef, useEffect } from 'react';
import { X, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggle }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        toggle();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, toggle]);

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const sidebarWidth = isMobile ? '85vw' : '300px';

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggle}
      />
      
      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        style={{ width: isOpen ? sidebarWidth : '0', maxWidth: '100vw' }}
        className={`fixed top-0 right-0 h-full z-50 glass transform transition-all duration-300 ease-in-out overflow-hidden`}
      >
        <div className="p-4 sm:p-6 h-full flex flex-col overflow-y-auto">
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-bold gradient-text">Menu</h2>
            <button 
              onClick={toggle}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary1 flex items-center justify-center"
            >
              <X size={16} className="sm:size-18" />
            </button>
          </div>
          
          <div className="flex flex-col space-y-4 sm:space-y-6 text-base sm:text-lg">
            <a 
              href="#hero" 
              className="hover:text-primary1 transition-colors pb-2 border-b border-white/10"
              onClick={toggle}
            >
              Home
            </a>
            <a 
              href="#about" 
              className="hover:text-primary1 transition-colors pb-2 border-b border-white/10"
              onClick={toggle}
            >
              About
            </a>
            <a 
              href="#skills" 
              className="hover:text-primary1 transition-colors pb-2 border-b border-white/10"
              onClick={toggle}
            >
              Skills
            </a>
            <a 
              href="#work" 
              className="hover:text-primary1 transition-colors pb-2 border-b border-white/10"
              onClick={toggle}
            >
              Work
            </a>
            <a 
              href="#experience" 
              className="hover:text-primary1 transition-colors pb-2 border-b border-white/10"
              onClick={toggle}
            >
              Experience
            </a>
            <a 
              href="#certifications" 
              className="hover:text-primary1 transition-colors pb-2 border-b border-white/10"
              onClick={toggle}
            >
              Certifications
            </a>
            <a 
              href="#newsletter" 
              className="hover:text-primary1 transition-colors pb-2 border-b border-white/10"
              onClick={toggle}
            >
              Newsletter
            </a>
            <a 
              href="#contact" 
              className="hover:text-primary1 transition-colors"
              onClick={toggle}
            >
              Contact
            </a>
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/10 flex justify-center space-x-4">
            <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full glass flex items-center justify-center text-white/80 hover:text-primary1 transition-colors">
              <Github size={16} className="sm:size-18" />
            </a>
            <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full glass flex items-center justify-center text-white/80 hover:text-primary1 transition-colors">
              <Linkedin size={16} className="sm:size-18" />
            </a>
            <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full glass flex items-center justify-center text-white/80 hover:text-primary1 transition-colors">
              <Twitter size={16} className="sm:size-18" />
            </a>
            <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full glass flex items-center justify-center text-white/80 hover:text-primary1 transition-colors">
              <Mail size={16} className="sm:size-18" />
            </a>
          </div>
          
          <div className="mt-auto fancy-border-gradient p-3 sm:p-4 rounded-lg">
            <p className="text-xs sm:text-sm text-white/80">
              Let's work together to build something amazing! Reach out to me for collaboration opportunities.
            </p>
            <a 
              href="#contact"
              onClick={toggle}
              className="btn-primary mt-3 sm:mt-4 w-full text-sm"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
