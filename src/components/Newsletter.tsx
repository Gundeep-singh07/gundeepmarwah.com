
import React, { useEffect, useRef, useState } from 'react';
import { Check, Send, X } from 'lucide-react';

const Newsletter: React.FC = () => {
  const newsletterRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isValid, setIsValid] = useState(true);
  
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
    
    if (newsletterRef.current) {
      observer.observe(newsletterRef.current);
    }
    
    return () => {
      if (newsletterRef.current) {
        observer.unobserve(newsletterRef.current);
      }
    };
  }, []);

  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsValid(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setIsValid(false);
      return;
    }
    
    setSubmitStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      // 10% chance of error for demo purposes
      if (Math.random() < 0.1) {
        setSubmitStatus('error');
      } else {
        setSubmitStatus('success');
        // Would normally send a thank you email here via backend
        console.log('Subscription successful for:', email);
      }
    }, 1500);
  };

  const handleRetry = () => {
    setSubmitStatus('idle');
  };

  return (
    <section 
      id="newsletter" 
      ref={newsletterRef}
      className="py-20 transition-opacity duration-700 opacity-0"
      style={{ 
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(97, 218, 251, 0.1) 0%, rgba(100, 108, 255, 0.05) 50%, rgba(0, 0, 0, 0) 100%)'
      }}
    >
      <div className="section-container">
        <div className="max-w-3xl mx-auto glass rounded-2xl p-8 md:p-12 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center mb-8">
            <div className="mb-6 md:mb-0 md:mr-8">
              <div className="w-16 h-16 rounded-full bg-primary1/30 flex items-center justify-center mx-auto md:mx-0">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-primary1">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">Subscribe to My Newsletter</h2>
              <p className="text-white/80">
                Stay updated with my latest projects, blog posts, and professional insights. 
                I promise not to spam your inbox!
              </p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  disabled={submitStatus === 'loading' || submitStatus === 'success'}
                  className={`w-full px-6 py-4 bg-white/5 rounded-full outline-none border ${
                    !isValid ? 'border-red-500' : 'border-white/10 focus:border-primary1'
                  } transition-colors`}
                />
                {!isValid && (
                  <p className="text-red-500 text-sm mt-1 ml-4">Please enter a valid email address</p>
                )}
              </div>
              
              <div>
                {submitStatus === 'idle' && (
                  <button 
                    type="submit" 
                    className="w-full md:w-auto px-8 py-4 bg-primary1 hover:bg-primary2 text-white rounded-full transition-colors flex items-center justify-center"
                  >
                    <span className="mr-2">Subscribe</span>
                    <Send size={18} />
                  </button>
                )}
                
                {submitStatus === 'loading' && (
                  <button 
                    disabled
                    className="w-full md:w-auto px-8 py-4 bg-primary1/70 text-white rounded-full flex items-center justify-center"
                  >
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span>Subscribing...</span>
                  </button>
                )}
                
                {submitStatus === 'success' && (
                  <div className="w-full md:w-auto px-8 py-4 bg-green-500 text-white rounded-full flex items-center justify-center animate-scale">
                    <div className="relative w-5 h-5 mr-2">
                      <div className="absolute inset-0 rounded-full bg-white animate-success-circle"></div>
                      <svg 
                        viewBox="0 0 24 24"
                        className="absolute inset-0 w-5 h-5 stroke-green-500"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          d="M5 13l4 4L19 7" 
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="animate-checkmark"
                          style={{ strokeDasharray: '100', strokeDashoffset: '100' }}
                        />
                      </svg>
                    </div>
                    <span>Thank you!</span>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <button 
                    onClick={handleRetry}
                    className="w-full md:w-auto px-8 py-4 bg-red-500 text-white rounded-full flex items-center justify-center animate-scale"
                  >
                    <div className="relative w-5 h-5 mr-2">
                      <div className="absolute inset-0 rounded-full bg-white animate-success-circle"></div>
                      <X size={20} className="absolute inset-0 text-red-500" />
                    </div>
                    <span>Retry</span>
                  </button>
                )}
              </div>
            </div>
          </form>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass rounded-xl p-6 text-center">
              <div className="mb-4 flex justify-center">
                <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4e8.svg" alt="Weekly Updates" className="w-12 h-12" />
              </div>
              <h3 className="text-lg font-bold mb-2">Weekly Updates</h3>
              <p className="text-sm text-white/70">
                Receive curated content about the latest in web development
              </p>
            </div>
            
            <div className="glass rounded-xl p-6 text-center">
              <div className="mb-4 flex justify-center">
                <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f50d.svg" alt="Exclusive Insights" className="w-12 h-12" />
              </div>
              <h3 className="text-lg font-bold mb-2">Exclusive Insights</h3>
              <p className="text-sm text-white/70">
                Get behind-the-scenes details about my projects and process
              </p>
            </div>
            
            <div className="glass rounded-xl p-6 text-center">
              <div className="mb-4 flex justify-center">
                <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f680.svg" alt="Early Access" className="w-12 h-12" />
              </div>
              <h3 className="text-lg font-bold mb-2">Early Access</h3>
              <p className="text-sm text-white/70">
                Be the first to know about new projects and opportunities
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
