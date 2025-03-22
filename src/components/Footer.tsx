
import React from 'react';
import { Github, Linkedin, Mail, Twitter, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 border-t border-white/10">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold gradient-text mb-4">Gundeep Marwah</h3>
            <p className="text-white/70 mb-6 max-w-md">
              A passionate web developer creating beautiful, responsive websites 
              and exceptional digital experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/80 hover:text-primary1 transition-colors">
                <Github size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/80 hover:text-primary1 transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/80 hover:text-primary1 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/80 hover:text-primary1 transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#hero" className="text-white/70 hover:text-primary1 transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="text-white/70 hover:text-primary1 transition-colors">About</a>
              </li>
              <li>
                <a href="#skills" className="text-white/70 hover:text-primary1 transition-colors">Skills</a>
              </li>
              <li>
                <a href="#work" className="text-white/70 hover:text-primary1 transition-colors">Projects</a>
              </li>
              <li>
                <a href="#contact" className="text-white/70 hover:text-primary1 transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Info</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-white/70">
                <Mail size={16} className="mr-2" />
                <span>gundeep.marwah@example.com</span>
              </li>
              <li className="flex items-center text-white/70">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="mr-2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center text-white/70">
                <MapPin size={16} className="mr-2" />
                <span>Bangalore, India</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 mb-4 md:mb-0">
            &copy; {currentYear} Gundeep Marwah. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <a href="#" className="text-white/60 hover:text-primary1 transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-white/60 hover:text-primary1 transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-white/60 hover:text-primary1 transition-colors text-sm">Cookies Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
