import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Home, User, Briefcase, Settings, Mail, Instagram, Linkedin, Github, ChevronLeft, ChevronRight, BriefcaseBusiness, Award, Download, Cpu, Layers, Zap, Globe, Smartphone, Link, Share2, MapPin, Phone, Send } from 'lucide-react';

import {images, icons} from './constants';

import './App.css';
import cvFile from './assets/files/Josiah-John Green - CV.pdf';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [activeSkill, setActiveSkill] = useState('frontend');
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [displayedText, setDisplayedText] = useState('');
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const observerRef = useRef(null);

  const [contactMousePos, setContactMousePos] = useState({ x: 0, y: 0 });

  const handleContactMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setContactMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };


  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = ['home', 'about', 'carousel', 'qualification', 'services', 'skills', 'works', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);

        if (element) {
          const { offsetTop, offsetHeight } = element;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    document.querySelectorAll('.fade-in-section').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const getScatterPosition = (index) => {
    const positions = [
      { x: -50, y: -30, rotate: -15 },
      { x: 40, y: -30, rotate: -120 },
      { x: -50, y: 80, rotate: 175 },
      { x: -40, y: 60, rotate: -75 }
    ];
    return positions[index % positions.length];
  };

  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseBeforeDelete = 2000;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentTitle.length) {
          setDisplayedText(currentTitle.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentTitleIndex]);

  const titles = [
    'Software Engineer',
    'Quality Assurance Tester',
    'System Analyst',
    'Frontend Developer',
    'UI/UX Designer',
    'Web and Application Developer'
  ];

  const frontendSkills = [
    { name: 'HTML5', icon: icons.html },
    { name: 'CSS3', icon: icons.css },
    { name: 'JavaScript', icon: icons.js },
    { name: 'React', icon: icons.react },
    { name: 'VueJS', icon: icons.vue },
    { name: 'Tailwind', icon: icons.tailwind },
  ];

  const backendSkills = [
    { name: 'Python', icon: icons.python },
    { name: 'Java', icon: icons.java },
    { name: 'PHP', icon: icons.php },
    { name: 'MySQL', icon: icons.mysql },
    { name: 'PostgreSQL', icon: icons.postgre },
    { name: 'Flask', icon: icons.flask },
  ];

  const carouselItems = [
    {
      title: 'UWI Student Awards',
      role: 'In Honour of the Work for Japan Club',
      description: 'Awarded for astounding work in cultural events and managing club communications',
      image: images.image1,
    },
    {
      title: 'Vincent Hosang Competition',
      role: '2nd Place w Mutliple Awards',
      description: 'Created an agricultural e-commerce application to help in the interconnectivity of consumers and farmers with the value proposition being food grading',
      image: images.image5,
    },
    {
      title: 'Hackathon',
      role: 'Participant showcasing Medic App',
      description: 'Built a modern application to help with appointment booking at UWI Hospital, and other private entities, to help in allocating priotity care, and speeding up the waiting process/making it more bareable',
      image: images.image6,
    },
    {
      title: 'Winners Trip to NY, USA',
      role: '2nd Place Representatives',
      description: 'Meet with entrepeneurs across the diaspora to showcase our business idea, and learn from our predecessors',
      image: images.image2,
    },
    {
      title: 'Emperor`s Dinner at Pegasus',
      role: 'Invited as representatives of the Japan Club',
      description: 'In recognition of our exemplary cultural work, and blooming relationship with the Embassy of Japan in Jamaica, we were invited by the Embassador to the Emperor`s Dinner',
      image: images.image3,
    },
    {
      title: 'FSTGC Awards',
      role: 'Invited as a member of the 2023/2024 FST Guild Committee',
      description: 'Invited to a night of splendor in recognition of all the members of the guild committee past, and present',
      image: images.image4,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const projects = [
    { 
      title: 'Movie Renting Web Application', 
      description: 'A web application that shows different movies you can rent.', 
      category: 'web', 
      link: 'https://github.com/j0hnc0d3s/medic.git',
      image: images.project8,  
    },
    { 
      title: 'Faculty Guild Website', 
      description: 'A collobrative project with the guild.', 
      category: 'web', 
      link: 'https://uwimonafstgc.wixsite.com/fstgc',
      image: images.project2, 
    },
    { 
      title: 'Social Media Web App', 
      description: 'A colloborative final project for a web development course.', 
      category: 'web', 
      link: 'https://github.com/j0hnc0d3s/info3180-project2.git',
      image: images.project7,  
    },
    { 
      title: 'Property Renting Web App', 
      description: 'A app that showcases various properties and related information with contact capabilities.', 
      category: 'web', 
      link: 'https://github.com/j0hnc0d3s/info3180-project1.git',
      image: images.project4,  
    },
    { 
      title: 'Superhero Search Web App', 
      description: 'A search directory that showcases various superhereos in the marvel universe, and related information.',
      category: 'web', 
      link: 'https://github.com/j0hnc0d3s/info2180-lab4.git',
      image: images.project5,  
    },
    { 
      title: 'Country/City Search Web App', 
      description: 'A search directory that showcases the countries of the world and their capitals.', 
      category: 'web', 
      link: 'https://github.com/j0hnc0d3s/info2180-lab5.git',
      image: images.project6,  
    },
    { 
      title: 'Employee Management Web App', 
      description: 'A directory that shows various movies and related information.', 
      category: 'web', 
      link: 'https://github.com/j0hnc0d3s/info3180-lab5.git',
      image: images.project1,  
    },
    { 
      title: 'Language Club Graphics', 
      description: 'A showcase of my designs done during my tenure with the UWI Japan Club.', 
      category: 'design', 
      link: 'https://drive.google.com/drive/folders/1smfef621_ovkp1saDy_xWQ4jjMt21Ewu?usp=sharing',
      image: images.project9,  
    },
    { 
      title: 'Faculty Graphics', 
      description: 'A showcase of my designs done during my tenure with the Faculty of Science and Technology Guild.', 
      category: 'design',
      link: 'https://mymonauwi-my.sharepoint.com/:f:/g/personal/josiahjohn_green_mymona_uwi_edu/EtkHsLvbYe1EhVZtDtH8td4BRzpFYwKxModweavNwrj4jA?e=8Zf112',
      image: images.project3,  
    },
  ];

  const [filter, setFilter] = useState('all');
  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://formspree.io/f/xayzgepq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      alert('Error sending message. Please try again.');
    }
  };

  const navigation = [
    { 
      id: 'about', 
      label: 'About'
    },
    { 
      id: 'works', 
      label: 'Works'
    },
    { 
      id: 'contact', 
      label: 'Contact'
    }
  ];

  const contacts = [
    { 
      icon: Phone, 
      title: 'Call Me', 
      content: '+1 (876)-208-2517',
      link: 'tel:+18762082517'
    },
    { 
      icon: Mail, 
      title: 'Email Me', 
      content: 'josiahjohngreen@gmail.com',
      link: 'mailto:josiahjohngreen@gmail.com'
    },
    { 
      icon: MapPin, 
      title: 'Location', 
      content: 'Kingston, Jamaica',
      link: null
    }
  ];

  const positions = [
    { 
      title: 'Secretary', 
      org: 'The UWI Japan Club', 
      date: 'September 2024 - May 2025' 
    },
    { 
      title: 'Assistant Vice President', 
      org: 'The UWI Japan Club',
      date: 'February 2022 - May 2025' 
    },
    { 
      title: 'Public Relations Officer', 
      org: 'The UWI Japan Club', 
      date: 'November 2022 - May 2025' 
    },
    { 
      title: 'Publications Chairman',
      org: 'Faculty of Science and Technology Guild', 
      date: 'June 2023 - June 2024' 
    },
  ];

  const career = [
    { 
      title: 'Content Strategist', 
      org: 'Faculty of Science and Technology', 
      date: 'January 2025 - December 2025' 
    },
    { 
      title: 'Technical Support Intern', 
      org: 'Mona School of Business & Management', 
      date: 'August 2025 - December 2025' 
    },
    { 
      title: 'Junior Software Engineer', 
      org: 'Push Technology Limited',
      date: 'June 2025 - September 2025' 
    },
    { 
      title: 'Full Stack Developer', 
      org: 'Janexco Limited', 
      date: 'July 2024 - August 2025' 
    },
  ];

  const socials = [
    { 
      icon: Instagram, 
      link: 'https://www.instagram.com/3ur.k4/' 
    },
    { 
      icon: Linkedin, 
      link: 'https://www.linkedin.com/in/josiah-john-green/' 
    },
    { 
      icon: Github, 
      link: 'https://github.com/j0hnc0d3s' 
    }
  ];

  const information = [
    { 
      label: 'Name', 
      value: 'Josiah-John Green' 
    },
    { 
      label: 'Age', 
      value: '23 Years' 
    },
    { 
      label: 'From', 
      value: 'Kingston, Jamaica' 
    },
    { 
      label: 'Email', 
      value: 'josiahjohngreen@gmail.com' 
    }
  ];

  const skills = {
    frontend: [
      { 
        name: 'HTML', 
        level: 80
      },
      { 
        name: 'CSS', 
        level: 80 
      },
      { 
        name: 'JavaScript',
        level: 70 
      }
    ],
    webapp: [
      { 
        name: 'React', 
        level: 90 
      },
      { 
        name: 'VueJS', 
        level: 70 
      },
      { 
        name: 'Flask', 
        level: 70 
      }
    ],
    design: [
      { 
        name: 'Canva', 
        level: 90 
      },
      { 
        name: 'Photoshop', 
        level: 90 
      }
    ],
    backend: [
      { 
        name: 'Python', 
        level: 70 
      },
      { 
        name: 'Java', 
        level: 60 
      },
      {
        name: 'PHP', 
        level: 60 
      },
      { 
        name: 'MySQL', 
        level: 70 
      },
      { 
        name: 'PostgreSQL', 
        level: 80 
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 text-gray-100 font-sans overflow-x-hidden">

      <nav className="glass-nav fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="#home" className="text-3xl font-bold">
              <span className="text-gradient">John</span>
            </a>
            
            <div className="hidden md:flex space-x-8">
              {navigation.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`flex items-center space-x-2 transition-all duration-300 ${
                    activeSection === id 
                      ? 'text-blue-400 scale-110' 
                      : 'text-gray-300 hover:text-white hover:scale-105'
                  }`}
                >
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-blue-400 hover:text-blue-300 transition-colors"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden glass-effect border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="flex items-center space-x-3 w-full px-3 py-2 text-blue-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  <span>
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <section 
        id="about" 
        className="min-h-screen flex items-center pt-20 relative overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
        
        <div 
          className="absolute w-96 h-96 rounded-full pointer-events-none transition-opacity duration-300"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(168, 85, 247, 0.2) 30%, transparent 70%)',
            filter: 'blur(50px)',
            opacity: mousePosition.x === 0 && mousePosition.y === 0 ? 0 : 1
          }}
        />
          
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-lg text-blue-400 font-bold">Hello</p>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="text-gradient hover-glow inline-block">I'm John</span>
              </h1>

              <p className="text-xl md:text-2xl font-light">
                <span className="text-white typing-cursor">A {displayedText}</span>
              </p>

              <p className="text-gray-400 leading-relaxed max-w-xl font-medium">
                I create user-centric digital experiences through UI/UX design, graphic design, and full-stack development. 
                Specialized in building intuitive interfaces and scalable web and mobile applications that prioritize user engagement and satisfaction.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-4">
                <a 
                  href={cvFile} 
                  download="Josiah-John Green - CV.pdf"
                  className="glass-effect-2 px-8 py-3 text-white rounded-full transition-all duration-300 font-semibold hover:bg-white/20 inline-flex items-center gap-2"
                >
                  <Download size={20} />
                  Download CV
                </a>
                
                <div className="flex items-center gap-4">
                  {socials.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-100 hover:text-blue-400 transition-all duration-300 hover:scale-125"
                    >
                      <social.icon size={24} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div 
              className="space-y-6"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="grid grid-cols-2 gap-6 py-6">
                {information.map((item, idx) => {
                  const position = getScatterPosition(idx);

                  return (
                    <div
                      key={idx}
                      className="scatter-item glass-effect-2 p-3 rounded-xl"
                      style={{
                        transform: isHovered 
                          ? `translate(${position.x}px, ${position.y}px) rotate(${position.rotate}deg)`
                          : 'translate(0, 0) rotate(0deg)'
                      }}
                    >
                      <h3 className="text-blue-500 font-semibold mb-1 text-sm">
                        {item.label}
                      </h3>

                      <p className="text-white text-xs font-regular">
                        {item.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section 
        id="carousel" 
        className="py-24 fade-in-section relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-2">My Journey</p>
            <h2 className="text-4xl font-bold text-white">Experiences & Achievements</h2>
          </div>
          
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <div 
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {carouselItems.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="min-w-full px-4"
                  >
                    <div>
                      <div className="grid md:grid-cols-2 gap-8 p-12">
                        <div className="flex flex-col justify-center space-y-6">
                          <h3 className="text-3xl font-bold text-white">
                            {item.title}
                          </h3>

                          <p className="text-lrg text-blue-400 font-medium">
                            {item.role}
                          </p>

                          <p className="text-gray-100 text-base font-regular">
                            {item.description}
                          </p>
                        </div>

                        <img 
                          src={item.image} 
                          className="h-100 w-50 rounded-3xl opacity-30 mask-fade-all overflow-hidden"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 glass-effect p-4 rounded-full hover:bg-white/20 transition-all"
            >
              <ChevronLeft 
                size={24} 
                className="text-white"
              />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 glass-effect p-4 rounded-full hover:bg-white/20 transition-all"
            >
              <ChevronRight 
                size={24} 
                className="text-white" 
              />
            </button>

            <div className="flex justify-center gap-3 mt-8">
              {carouselItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentSlide 
                      ? 'w-12 bg-gradient-to-r from-blue-500 to-blue-600' 
                      : 'w-2 bg-gray-100 hover:bg-white-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section 
        id="qualification" 
        className="py-24 fade-in-section"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-2">My Journey</p>
            <h2 className="text-4xl font-bold text-white">Qualifications</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="glass-effect rounded-3xl p-8 card-hover">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <BriefcaseBusiness size={24} />
                </div>

                Experience
              </h3>

              <div className="space-y-8">
                {career.map((position, idx) => (
                  <div 
                    key={idx} 
                    className="relative"
                  >
                    <h4 className="text-lg font-regular text-white">
                      {position.title}
                    </h4>
                    
                    <p className="text-gray-300 font-regular text-sm">
                      {position.org}
                    </p>

                    <p className="text-blue-400 text-sm mt-1 font-medium">
                      {position.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-effect rounded-3xl p-8 card-hover">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <Award size={24} />
                </div>

                Positions
              </h3>

              <div className="space-y-8">
                {positions.map((position, idx) => (
                  <div 
                    key={idx} 
                    className="relative"
                  >
                    <h4 className="text-lg font-regular text-white">
                      {position.title}
                    </h4>
                    
                    <p className="text-gray-300 font-regular text-sm">
                      {position.org}
                    </p>

                    <p className="text-blue-400 text-sm mt-1 font-medium">
                      {position.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section 
        id="works" 
        className="py-24 fade-in-section"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-blue-400 text-sm font-semibold uppercase mb-2">
              My Portfolio
            </p>

            <h2 className="text-4xl font-bold text-white">Recent Work</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {['all', 'app', 'web', 'ui', 'design'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-lg capitalize transition-all ${
                  filter === category
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                    : 'glass-effect-2 text-gray-300 hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg font-regular">
                No projects here yet, or none I can show here (hehe) 😜
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, idx) => (
                <a
                  key={idx}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card group relative overflow-hidden rounded-2xl"
                >
                  <div className={`h-48 bg-gradient-to-r from-blue-800 to-blue-500 `}>
                    <img src={project.image} className="w-full h-full"/>
                  </div>
                  
                  <div className="project-overlay absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center p-6 text-center">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {project.title}
                    </h3>

                    <p className="text-gray-300 text-sm font-regular">
                      {project.description}
                    </p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-800 to-blue-300">
                    <h3 className="text-lg font-semibold text-white">
                      {project.title}
                    </h3>

                    <span className="inline-block mt-2 px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full font-regular">
                      {project.category}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      <section 
        id="skills" 
        className="py-24 fade-in-section"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
                 
          <div className="text-center mb-16">
            <p className="text-blue-400 text-sm font-semibold uppercase mb-2">
              My Talents
            </p>

            <h2 className="text-4xl font-bold text-white">
              Professional Skills
            </h2>

          </div>

          <div className="space-y-8">
            <div className="relative overflow-hidden py-8">
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-transparent to-transparent z-10"></div>

              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-transparent to-transparent z-10"></div>
              
              <div className="marquee-container flex">
                <div className="marquee-left flex gap-8">
                  {[...frontendSkills, ...frontendSkills].map((skill, idx) => (
                    <div
                      key={idx}
                      className="skill-item glass-effect px-10 py-4 rounded-2xl flex items-center gap-4"
                    >
                      <img className="w-10 h-5" src={skill.icon} />

                      <span className="text-base font-regular">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden py-8">
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-transparent to-transparent z-10"></div>
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-transparent to-transparent z-10"></div>
              
              <div className="marquee-container flex">
                <div className="marquee-right flex gap-8">
                  {[...backendSkills, ...backendSkills].map((skill, idx) => (
                    <div
                      key={idx}
                      className="skill-item glass-effect px-10 py-4 rounded-2xl flex items-center gap-4"
                    >
                      <img className="w-5 h-5" src={skill.icon} />

                      <span className="text-base font-regular">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      <section 
        id="contact" 
        className="py-24 relative overflow-hidden"
        onMouseMove={handleContactMouseMove}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-pink-600/5 to-blue-600/5"></div>
        
        {/* Cursor glow effect */}
        <div 
          className="absolute w-96 h-96 rounded-full pointer-events-none transition-opacity duration-300"
          style={{
            left: `${contactMousePos.x}px`,
            top: `${contactMousePos.y}px`,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(168, 85, 247, 0.2) 30%, transparent 70%)',
            filter: 'blur(50px)',
            opacity: contactMousePos.x === 0 && contactMousePos.y === 0 ? 0 : 1
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <p className="text-blue-400 text-sm font-bold uppercase tracking-wider mb-2">Get in touch</p>
            <h2 className="text-5xl font-bold text-white">Let's Work Together</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Have a project in mind? Let's create something amazing together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              {contacts.map((item, idx) => (
                <div 
                  key={idx}
                  className="glass-effect-2 p-6 rounded-2xl hover:bg-white/5 transition-all duration-300 group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-blue-400 mt-1 group-hover:scale-110 transition-transform duration-300">
                      <item.icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                      {item.link ? (
                        <a 
                          href={item.link}
                          className="text-gray-400 hover:text-blue-400 transition-colors"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-gray-400">{item.content}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="glass-effect-2 p-8 rounded-2xl space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-gray-800 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-gray-800 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400 font-medium">Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-gray-800 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400 font-medium">Message</label>
                <textarea
                  name="message"
                  placeholder="Tell me about your project..."
                  rows="6"
                  value={formData.message}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-gray-800 resize-none transition-all"
                ></textarea>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 inline-flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Send size={20} />
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="glass-effect py-8 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-100 font-regular">2025 © Josiah-John Green. All Right Reserved</p>
            
            <div className="flex items-center space-x-6">
              <a href="https://www.instagram.com/3ur.k4" target="_blank" rel="noopener noreferrer" className="text-gray-100 hover:text-blue-500 transition-colors">
                <Instagram size={20} />
              </a>
            
              <a href="https://www.linkedin.com/in/josiah-john-green/" target="_blank" rel="noopener noreferrer" className="text-gray-100 hover:text-blue-500 transition-colors">
                <Linkedin size={20} />
              </a>
            
              <a href="https://github.com/j0hnc0d3s" target="_blank" rel="noopener noreferrer" className="text-gray-100 hover:text-blue-500 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;