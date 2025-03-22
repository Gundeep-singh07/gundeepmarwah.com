
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Work from '@/components/Work';
import Experience from '@/components/Experience';
import Certifications from '@/components/Certifications';
import Newsletter from '@/components/Newsletter';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Simulate loading 
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Close sidebar when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarOpen]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="relative w-16 sm:w-20 h-16 sm:h-20">
            <div className="absolute inset-0 rounded-full border-4 border-primary1/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-primary1 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          </div>
          <h2 className="gradient-text mt-6 text-xl sm:text-2xl font-bold">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-background min-h-screen">
      {/* Background gradient effects */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-primary1/20 rounded-full filter blur-[100px] opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-primary2/20 rounded-full filter blur-[100px] opacity-30"></div>
        <div className="absolute top-1/3 right-1/3 w-48 sm:w-64 h-48 sm:h-64 bg-highlight/10 rounded-full filter blur-[80px] opacity-20"></div>
      </div>
      
      <div className="relative z-10">
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
        
        <main>
          <Hero />
          <About />
          <Skills />
          <Work />
          <Experience />
          <Certifications />
          <Newsletter />
          <Contact />
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Index;
