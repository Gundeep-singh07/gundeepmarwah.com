import React, { useEffect, useRef } from "react";
import { Download, Mail, Github, Linkedin, Twitter } from "lucide-react";
import resume from "../assets/Gundeep's Resume.pdf";

const About: React.FC = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

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
            Hi, I'm Gundeep Marwah, a second-year BCA student at Christ
            University, currently building real-world projects, passionate about
            technology and software development. I combine technical skills with
            creative problem-solving to build modern and accessible web
            applications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="glass rounded-2xl p-8 animate-fade-in-left animate-delay-100">
            <h3 className="text-2xl font-bold mb-6 text-primary1">
              My Journey
            </h3>
            <div className="space-y-4 text-white/80">
              <p>
                Over the years, I have gained proficiency in various programming
                languages and tools, including React, NodeJS, MongoDB,
                ExpressJS, C, C++, AI/ML, Java, JavaScript, Python, MySQL, HTML,
                CSS, Figma and Bootstrap.
              </p>
              <p>
                My experience is combined with hands-on projects that equipped
                me with a solid foundation in software development. I am eager
                to further develop my skills, contribute to innovative projects,
                and collaborate with like-minded individuals in the tech
                industry.
              </p>
              <p>
                I am always looking for opportunities to learn and grow, and I
                am excited about the future of technology and my place within
                it. Let's connect and explore how we can work together to create
                impactful solutions!
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <a href={resume} target="_blank" className="btn-primary">
                <Download size={18} className="mr-2" />
                Download Resume
              </a>
              <a href="#contact" className="btn-secondary">
                <Mail size={18} className="mr-2" />
                Contact Me
              </a>
            </div>
          </div>

          <div className="space-y-8 animate-fade-in-right animate-delay-200">
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-4 text-primary1">
                Personal Details
              </h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-white/70">Name:</span>
                  <span className="font-medium">Gundeep Marwah</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/70">Email:</span>
                  <span className="font-medium">work.gundeep@gmail.com</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/70">Education:</span>
                  <span className="font-medium">BCA, Christ University</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/70">Location:</span>
                  <span className="font-medium">Delhi, India</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/70">Interests:</span>
                  <span className="font-medium">Full-Stack Development</span>
                </li>
              </ul>
            </div>

            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-4 text-primary1">
                Connect With Me
              </h3>
              <div className="flex justify-around">
                <a
                  href="https://github.com/Gundeep-singh07"
                  target="_blank"
                  className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/80 hover:text-primary1 transition-colors"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/gundeep-marwah/"
                  target="_blank"
                  className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/80 hover:text-primary1 transition-colors"
                >
                  <Linkedin size={20} />
                </a>

                <a
                  href="mailto:work.gundeep@gmail.com"
                  target="_blank"
                  className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/80 hover:text-primary1 transition-colors"
                >
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
