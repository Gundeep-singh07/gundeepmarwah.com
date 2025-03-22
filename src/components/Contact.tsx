
import React, { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';

const Contact: React.FC = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
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
    
    if (contactRef.current) {
      observer.observe(contactRef.current);
    }
    
    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: false }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {
      name: !formData.name,
      email: !formData.email || !validateEmail(formData.email),
      subject: !formData.subject,
      message: !formData.message
    };
    
    setFormErrors(newErrors);
    
    if (Object.values(newErrors).some(error => error)) {
      return;
    }
    
    setSubmitStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setSubmitStatus('success');
      // Would normally send a thank you email here via backend
      console.log('Contact form submitted:', formData);
    }, 1500);
  };

  return (
    <section 
      id="contact" 
      ref={contactRef}
      className="py-20 transition-opacity duration-700 opacity-0"
    >
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="gradient-text mb-6">Contact Me</h2>
          <div className="w-20 h-1 bg-primary1 mx-auto mb-8"></div>
          <p className="text-lg text-white/80">
            Have a project in mind or just want to connect? Feel free to reach out to me.
            I'm always open to discussing new projects, creative ideas, and opportunities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="space-y-6 animate-fade-in-left">
              <div className="glass p-6 rounded-xl hover:translate-y-[-4px] transition-transform duration-300">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-primary1 mb-4">
                  <Mail size={20} />
                </div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-white/80">gundeep.marwah@example.com</p>
                <a 
                  href="mailto:gundeep.marwah@example.com" 
                  className="text-primary1 inline-block mt-2 hover:underline"
                >
                  Send a message
                </a>
              </div>
              
              <div className="glass p-6 rounded-xl hover:translate-y-[-4px] transition-transform duration-300">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-primary1 mb-4">
                  <Phone size={20} />
                </div>
                <h3 className="text-xl font-bold mb-2">Phone</h3>
                <p className="text-white/80">+91 98765 43210</p>
                <a 
                  href="tel:+919876543210" 
                  className="text-primary1 inline-block mt-2 hover:underline"
                >
                  Call me
                </a>
              </div>
              
              <div className="glass p-6 rounded-xl hover:translate-y-[-4px] transition-transform duration-300">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-primary1 mb-4">
                  <MapPin size={20} />
                </div>
                <h3 className="text-xl font-bold mb-2">Location</h3>
                <p className="text-white/80">Bangalore, India</p>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary1 inline-block mt-2 hover:underline"
                >
                  View on map
                </a>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 animate-fade-in-right">
            <div className="glass p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
              
              {submitStatus === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full glass flex items-center justify-center text-green-500 mx-auto mb-6">
                    <Check size={32} />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                  <p className="text-white/80 mb-6">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <button 
                    onClick={() => {
                      setSubmitStatus('idle');
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="btn-primary mx-auto"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-white/80 mb-2">Name</label>
                      <input 
                        type="text" 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white/5 rounded-lg outline-none border ${
                          formErrors.name ? 'border-red-500' : 'border-white/10 focus:border-primary1'
                        } transition-colors`}
                        disabled={submitStatus === 'loading'}
                      />
                      {formErrors.name && (
                        <p className="text-red-500 text-sm mt-1">Name is required</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-white/80 mb-2">Email</label>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white/5 rounded-lg outline-none border ${
                          formErrors.email ? 'border-red-500' : 'border-white/10 focus:border-primary1'
                        } transition-colors`}
                        disabled={submitStatus === 'loading'}
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-sm mt-1">Valid email is required</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-white/80 mb-2">Subject</label>
                    <input 
                      type="text" 
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/5 rounded-lg outline-none border ${
                        formErrors.subject ? 'border-red-500' : 'border-white/10 focus:border-primary1'
                      } transition-colors`}
                      disabled={submitStatus === 'loading'}
                    />
                    {formErrors.subject && (
                      <p className="text-red-500 text-sm mt-1">Subject is required</p>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-white/80 mb-2">Message</label>
                    <textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-3 bg-white/5 rounded-lg outline-none border ${
                        formErrors.message ? 'border-red-500' : 'border-white/10 focus:border-primary1'
                      } transition-colors resize-none`}
                      disabled={submitStatus === 'loading'}
                    ></textarea>
                    {formErrors.message && (
                      <p className="text-red-500 text-sm mt-1">Message is required</p>
                    )}
                  </div>
                  
                  <div>
                    {submitStatus === 'idle' && (
                      <button 
                        type="submit" 
                        className="btn-primary w-full md:w-auto"
                      >
                        <span className="mr-2">Send Message</span>
                        <Send size={18} />
                      </button>
                    )}
                    
                    {submitStatus === 'loading' && (
                      <button 
                        disabled
                        className="w-full md:w-auto px-6 py-3 bg-primary1/70 text-white rounded-full flex items-center justify-center"
                      >
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        <span>Sending...</span>
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
