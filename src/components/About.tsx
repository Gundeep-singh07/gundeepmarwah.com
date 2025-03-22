
import React, { useEffect, useRef } from 'react';
import { Download, Mail, Github, Linkedin, Twitter } from 'lucide-react';

const About: React.FC = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0');
        }
      },
      { threshold: 0.1 }
    );
    
    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }
    
    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="about" 
      ref={aboutRef}
      className="py-20 transition-opacity duration-700 opacity-0"
    >
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="gradient-text mb-6">About Me</h2>
          <div className="w-20 h-1 bg-primary1 mx-auto mb-8"></div>
          <p className="text-lg text-white/80">
            As a passionate web developer studying Bachelor of Computer Applications, I'm dedicated to creating 
            pixel-perfect, functional websites that provide exceptional user experiences. I combine technical skills 
            with creative problem-solving to build modern and accessible web applications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="glass rounded-2xl p-8 animate-fade-in-left animate-delay-100">
            <h3 className="text-2xl font-bold mb-6 text-primary1">My Journey</h3>
            <div className="space-y-4 text-white/80">
              <p>
                My fascination with web development began when I created my first HTML page. Since then, 
                I've been on a continuous learning journey, exploring new technologies and refining my skills.
              </p>
              <p>
                As a first-year BCA student at Christ University, I'm building a strong foundation in computer science 
                while working on real-world projects that challenge me to grow as a developer.
              </p>
              <p>
                I believe in clean code, intuitive design, and creating web experiences that are accessible to everyone. 
                My goal is to contribute to innovative projects that make a positive impact.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <a href="#" className="btn-primary">
                <Download size={18} className="mr-2" />
                Download CV
              </a>
              <a href="#contact" className="btn-secondary">
                <Mail size={18} className="mr-2" />
                Contact Me
              </a>
            </div>
          </div>
          
          <div className="space-y-8 animate-fade-in-right animate-delay-200">
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-4 text-primary1">Personal Details</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-white/70">Name:</span>
                  <span className="font-medium">Gundeep Marwah</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/70">Education:</span>
                  <span className="font-medium">BCA, Christ University</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/70">Location:</span>
                  <span className="font-medium">India</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/70">Interests:</span>
                  <span className="font-medium">Web Development, Design, Technology</span>
                </li>
              </ul>
            </div>
            
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-4 text-primary1">Connect With Me</h3>
              <div className="flex justify-around">
                <a href="#" className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/80 hover:text-primary1 transition-colors">
                  <Github size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/80 hover:text-primary1 transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/80 hover:text-primary1 transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/80 hover:text-primary1 transition-colors">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
