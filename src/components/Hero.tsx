import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import photo from "../assets/image.png";

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100");
          entry.target.classList.remove("opacity-0");
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen pt-20 flex items-center transition-opacity duration-700 opacity-0"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-1 bg-primary1"></div>
              <p className="text-xl text-white/80">Welcome to my Portfolio</p>
            </div>

            <h1 className="font-bold">
              Hi, I'm <span className="gradient-text">Gundeep Marwah</span>
            </h1>

            <h2 className="text-3xl font-bold text-primary1 animate-fade-in animate-delay-100">
              App & Web Developer
            </h2>

            <p className="text-lg text-white/80 max-w-xl animate-fade-in animate-delay-200">
              I'm a second-year BCA student at Christ University, passionate
              about creating beautiful, responsive Applications & websites with
              modern technologies and building exceptional digital experiences.
            </p>

            <div className="flex flex-wrap gap-4 pt-4 animate-fade-in animate-delay-300">
              <a href="#contact" className="btn-primary group">
                Let's Connect
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={18}
                />
              </a>
              {/* <a href="#work" className="btn-secondary group">
                View Projects
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={18}
                />
              </a> */}
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end animate-fade-in-right">
            <div className="relative w-full max-w-md">
              {/* Background glow effects */}
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary1 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary2 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>

              {/* Profile image */}
              <div className="relative z-10 rounded-2xl overflow-hidden fancy-border-gradient">
                <img
                  src={photo}
                  alt="Gundeep Marwah"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Decorative element */}
              <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border-4 border-dashed border-white/10 animate-spin-slow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
