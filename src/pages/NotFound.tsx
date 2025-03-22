
import React from 'react';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="glass p-12 rounded-xl text-center max-w-md mx-4">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <div className="w-16 h-1 bg-primary1 mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-white/70 mb-8">
          The page you are looking for might have been removed, had its name 
          changed, or is temporarily unavailable.
        </p>
        <a 
          href="/" 
          className="btn-primary inline-flex"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
