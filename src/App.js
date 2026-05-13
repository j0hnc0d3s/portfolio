import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, Mail, Linkedin, Github, LinkIcon,
  ChevronLeft, ChevronRight, Download, MapPin, Phone, Send, Award,
  ArrowUpRight, GraduationCap, Sparkles, Camera
} from 'lucide-react';

import { images, icons } from './constants';
import './App.css';

const Portfolio = () => {
  // ── State ───────────────────────────────────────────────────────────
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentFeatured, setCurrentFeatured] = useState(0);
  const [isFeaturedHovered, setIsFeaturedHovered] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [filter, setFilter] = useState('app');
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  });

  const observerRef = useRef(null);

  // ── Data ────────────────────────────────────────────────────────────
  const titles = [
    'Software Engineer',
    'Quality Assurance Tester',
    'System Analyst',
    'Frontend Developer',
    'UI/UX Designer',
    'Web and Application Developer'
  ];

  const featuredProjects = [
    {
      title: 'Stack',
      tagline: 'Multi-Tenant Inventory Management System',
      description: 'Production-grade enterprise SaaS approved as the replacement for an MSBM Power Platform pilot. Multi-tenancy enforced through JWT-scoped row-level isolation, designed to license to other Caribbean institutions.',
      tech: ['Flask', 'PostgreSQL', 'React', 'Vite', 'APScheduler'],
      image: images.projectStack,
      liveDemo: '',
      github: '',
      role: 'Founder & Lead Engineer',
      awards: []
    },
    {
      title: 'Aegis',
      tagline: 'AI-Powered Campus Safety Platform',
      description: 'Computer vision–driven safety system with webcam/mobile camera input, real-time monitoring dashboard, and missing-person profile management. Custom liquid-glass dark UI shipped from Figma to production.',
      tech: ['React', 'Node.js', 'Computer Vision', 'Firebase'],
      image: '',
      liveDemo: '',
      github: '',
      role: 'Co-Founder',
      awards: [
        { label: 'Intellibus Social Good Award 2026', link: 'https://www.instagram.com/p/DV95jRkERus/?img_index=2' },
      ]
    },
    {
      title: 'FreshJA',
      tagline: 'Agricultural E-Commerce Platform',
      description: 'Full-stack platform connecting Jamaican farmers directly with consumers. Built for low-bandwidth rural users with vendor onboarding, inventory, and order workflows.',
      tech: ['React', 'Vite', 'Firebase', 'PostgreSQL', 'Vercel'],
      image: images.project14,
      liveDemo: '',
      github: '',
      role: 'Co-Founder & CTO',
      awards: [
        { label: 'Vincent Hosang 2025 — 1st Runner Up', link: 'https://www.mona.uwi.edu/fst/celebrating-excellence-freshja-triumphs-vincent-hosang-uwi-venture-competition-20242025' },
        { label: 'Resolution SVC 2026 Finalist', link: 'https://www.linkedin.com/feed/update/urn:li:activity:7456081771781267456/' }
      ]
    },
    {
      title: 'Ripple',
      tagline: 'Mobile Wellness Companion',
      description: 'Wellness-focused mobile app under 3urek4 — gentle daily rituals over dopamine loops. Soft ocean-teal palette with an axolotl mascot, built end-to-end on React Native.',
      tech: ['React Native', 'Node.js', 'Firebase', 'Figma'],
      image: images.project15,
      liveDemo: '',
      github: '',
      role: 'Founder',
      awards: []
    },
    {
      title: 'Medic',
      tagline: 'Healthcare Queue & Clinic Management',
      description: 'Capstone queue management system scoped to the UHWI Casualty Department. QR-based patient tracking, dual admin/staff interfaces, and role-based access control with Firestore security rules.',
      tech: ['React', 'Firebase', 'Firestore'],
      image: '',
      liveDemo: '',
      github: '',
      role: 'Lead Developer',
      awards: []
    }
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
      role: '2nd Place with Multiple Awards',
      description: 'Created an agricultural e-commerce application to help in the interconnectivity of consumers and farmers with the value proposition being food grading',
      image: images.image5,
    },
    {
      title: 'Hackathon',
      role: 'Participant showcasing Medic App',
      description: 'Built a modern application to help with appointment booking at UWI Hospital and other private entities — allocating priority care and making the waiting process more bearable',
      image: images.image6,
    },
    {
      title: 'Winners Trip to NY, USA',
      role: '2nd Place Representatives',
      description: 'Met with entrepreneurs across the diaspora to showcase our business idea, and learn from our predecessors',
      image: images.image2,
    },
    {
      title: 'Emperor\'s Dinner at Pegasus',
      role: 'Invited as representatives of the Japan Club',
      description: 'In recognition of our exemplary cultural work, and blooming relationship with the Embassy of Japan in Jamaica, we were invited by the Ambassador to the Emperor\'s Dinner',
      image: images.image3,
    },
    {
      title: 'FSTGC Awards',
      role: 'Invited as a member of the 2023/2024 FST Guild Committee',
      description: 'Invited to a night of splendour in recognition of all the members of the guild committee, past and present',
      image: images.image4,
    },
  ];

  const works = [
    { id: 0, title: 'app' },
    { id: 1, title: 'ui' },
    { id: 2, title: 'design' },
  ];

  const projects = [
    { title: 'Movie Renting Web Application', description: 'A web application that shows different movies you can rent.', category: 'web', link: 'https://github.com/j0hnc0d3s/info3180-lab5', image: images.project8 },
    { title: 'Social Media Web App', description: 'A collaborative final project for a web development course.', category: 'web', link: 'https://github.com/j0hnc0d3s/info3180-project2', image: images.project7 },
    { title: 'Property Renting Web App', description: 'An app that showcases various properties and related information with contact capabilities.', category: 'web', link: 'https://github.com/j0hnc0d3s/info3180-project1', image: images.project4 },
    { title: 'Peli-Plan', description: 'A campus navigation application.', category: 'app', link: 'https://drive.google.com/file/d/1q7jiil6SqVr9LAryNveosBgZuSd3t0_L/preview', image: images.project16 },
    { title: 'Jam-Go', description: 'An island-wide transit app that incorporates both taxi and bus transportation.', category: 'app', link: 'https://drive.google.com/file/d/1kGs69HkV7CJ5oby4AgeJBe91JmZTCglD/preview', image: images.projectJamGo },
    { title: 'Club', description: 'A showcase of my designs done during my tenure with the UWI Japan Club.', category: 'design', link: 'https://drive.google.com/drive/folders/1UR8ucK7KTVspJmV4abj89uIeD3guHEoO?usp=sharing', image: images.project9 },
    { title: 'Guild', description: 'A showcase of my designs done during my tenure with the Faculty of Science and Technology Guild.', category: 'design', link: 'https://drive.google.com/drive/folders/1MLvWugbG3cSrIVdehqeZ6FHpCl3rX-gG?usp=drive_link', image: images.project3 },
    { title: 'Companies', description: 'A showcase of my designs done during my tenure across various positions outside the Japan Club and the Faculty Guild.', category: 'design', link: 'https://drive.google.com/drive/folders/1Pb-c6U6GJIFhb6nkDMUa3v5z4hZMRKus?usp=sharing', image: images.project10 },
    { title: 'Crime.net', description: 'A UX/UI concept for a community-driven public safety mobile application.', category: 'ui', link: 'https://www.figma.com/proto/N5SCKacw2dcaCbijAUKca4/Crime.net?node-id=33-508', image: images.projectCrime },
  ];

  const filteredProjects = filter === '' ? projects : projects.filter(p => p.category === filter);

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

  const career = [
    { title: 'Content Strategist', org: 'Faculty of Science and Technology', date: 'Jan 2025 — May 2026' },
    { title: 'Technical Support Intern', org: 'Mona School of Business & Management', date: 'Aug 2025 — Jun 2026' },
    { title: 'Junior Software Engineer Intern', org: 'Push Technology Limited', date: 'Jun 2025 — Aug 2025' },
    { title: 'System Analyst Intern', org: 'Port Authority of Jamaica', date: 'Jun 2023 — Aug 2023' },
  ];

  const positions = [
    { title: 'Secretary', org: 'The UWI Japan Club', date: 'Sep 2024 — May 2025' },
    { title: 'Assistant Vice President', org: 'The UWI Japan Club', date: 'Feb 2022 — May 2025' },
    { title: 'Public Relations Officer', org: 'The UWI Japan Club', date: 'Nov 2022 — May 2025' },
    { title: 'Publications Chairman', org: 'Faculty of Science and Technology Guild', date: 'Jun 2023 — Jun 2024' },
  ];

  const contacts = [
    { icon: Linkedin, title: 'LinkedIn', content: 'Josiah-John Green', link: 'https://www.linkedin.com/in/josiah-john-green/' },
    { icon: Mail,  title: 'Email', content: 'josiahjohngreen@gmail.com', link: 'mailto:josiahjohngreen@gmail.com' },
    { icon: MapPin, title: 'Based', content: 'Kingston, Jamaica', link: null }
  ];

  const socials = [
    { icon: LinkIcon, link: 'https://3urek4.vercel.app/', label: '3urek4' },
    { icon: Linkedin, link: 'https://www.linkedin.com/in/josiah-john-green/', label: 'LinkedIn' },
    { icon: Github,   link: 'https://github.com/j0hnc0d3s', label: 'GitHub' }
  ];

  const information = [
    { label: 'Name',  value: 'Josiah-John Green' },
    { label: 'Age',   value: '23' },
    { label: 'Based', value: 'Kingston, Jamaica' },
    { label: 'Email', value: 'josiahjohngreen@gmail.com' }
  ];

  const navigation = [
    { id: 'about',    label: 'About' },
    { id: 'featured', label: 'Work' },
    { id: 'contact',  label: 'Contact' }
  ];

  // ── Effects ─────────────────────────────────────────────────────────

  // Typing animation
  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];
    const typingSpeed = isDeleting ? 45 : 95;
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

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = ['about', 'featured', 'works', 'carousel', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 120;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const { offsetTop, offsetHeight } = el;
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

  // Featured auto-cycle
  useEffect(() => {
    if (isFeaturedHovered) return;
    const interval = setInterval(() => {
      setCurrentFeatured((prev) => (prev + 1) % featuredProjects.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isFeaturedHovered, currentFeatured, featuredProjects.length]);

  // Fade-in observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('animate-in');
      }),
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
    );
    document.querySelectorAll('.fade-in-section').forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  // ── Handlers ────────────────────────────────────────────────────────
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const nextSlide     = () => setCurrentSlide((p) => (p + 1) % carouselItems.length);
  const prevSlide     = () => setCurrentSlide((p) => (p - 1 + carouselItems.length) % carouselItems.length);
  const nextFeatured  = () => setCurrentFeatured((p) => (p + 1) % featuredProjects.length);
  const prevFeatured  = () => setCurrentFeatured((p) => (p - 1 + featuredProjects.length) % featuredProjects.length);

  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://formspree.io/f/xayzgepq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Message sent — I\'ll be in touch soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch {
      alert('Couldn\'t send. Try again, or email me directly.');
    }
  };

  // ── Render ──────────────────────────────────────────────────────────
  return (
    <div className="App relative min-h-screen">

      {/* ═════ Nav ═════ */}
      <nav className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        scrollY > 40 ? 'top-4' : 'top-6'
      }`}
        style={{ width: 'min(720px, calc(100% - 2rem))' }}
      >
        <div className="glass-nav rounded-full px-5 py-2.5 flex items-center justify-between gap-4">
          <a href="#about"
             onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
             className="display text-xl"
             style={{ fontWeight: 500, letterSpacing: '-0.02em' }}
          >
            John<em style={{ fontStyle: 'italic', color: 'var(--sage-deep)' }}>.</em>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navigation.map(({ id, label }) => {
              const active = activeSection === id;
              return (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="px-3.5 py-1.5 rounded-full text-sm transition-all duration-300"
                  style={{
                    background: active ? 'var(--sage)' : 'transparent',
                    color: active ? 'var(--cream)' : 'var(--ink-muted)',
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-1.5 rounded-full transition-colors"
            style={{ color: 'var(--ink)' }}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-2 glass-cream rounded-2xl p-3">
            {navigation.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="block w-full text-left px-4 py-3 rounded-xl text-sm transition-colors"
                style={{ color: 'var(--ink)', background: 'transparent' }}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ═════ Hero / About ═════ */}
      <section id="about" className="pt-32 pb-24 relative">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center relative z-10">

          <div className="mono-label inline-flex items-center gap-2 mb-10" style={{ animation: 'fadeIn 0.8s ease' }}>
            <span className="sage-dot"></span>
            <span>Hello, world — based in Kingston</span>
          </div>

          <h1 className="display-light mb-2"
              style={{ fontSize: 'clamp(2.5rem, 6.5vw, 4.75rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            Hi, I'm John <span style={{ color: 'var(--ink-soft)' }}>—</span>
          </h1>
          <h2 className="display-light"
              style={{ fontSize: 'clamp(2.5rem, 6.5vw, 4.75rem)', letterSpacing: '-0.03em', lineHeight: 1.05, fontStyle: 'italic', fontWeight: 350 }}>
            a <span className="typing-caret">{displayedText}</span>
          </h2>

          <p className="mt-8 mx-auto" style={{ maxWidth: '32rem', color: 'var(--ink-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Building user-centric digital experiences through UI/UX, graphic design, and full-stack development — interfaces and applications that prioritise the people who use them.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 mt-10">
            <a
              href="https://docs.google.com/document/d/1pjocSQGxeevWRXKuAU8ghHsOZDAWojXl0N76VvMpI4Y/edit?tab=t.zhqluw9cyc1o/export?format=pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ink"
            >
              <Download size={16} />
              Download CV
            </a>

            <div className="flex items-center gap-3 pl-2">
              {socials.map((s, i) => (
                <a key={i} href={s.link} target="_blank" rel="noopener noreferrer"
                   aria-label={s.label}
                   className="p-2 rounded-full transition-all duration-300"
                   style={{ color: 'var(--ink-muted)' }}
                   onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ink)'}
                   onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ink-muted)'}
                >
                  <s.icon size={20} />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/*         
        <div className="hero-stage relative mt-16 mx-auto px-6" style={{ maxWidth: '720px' }}>
          <div className="hero-card hero-card-tl">
            <div className="hero-card-label flex items-center gap-1.5">
              <Sparkles size={11} />
              <span>Now</span>
            </div>
            <div className="hero-card-value">Shipping Stack at MSBM</div>
          </div>

          <div className="hero-card hero-card-tr">
            <div className="hero-card-label flex items-center gap-1.5">
              <Award size={11} />
              <span>Recent</span>
            </div>
            <div className="hero-card-value">Intellibus Social Good 2026</div>
          </div>

          <div className="hero-card hero-card-bl">
            <div className="hero-card-label flex items-center gap-1.5">
              <GraduationCap size={11} />
              <span>Studying</span>
            </div>
            <div className="hero-card-value">SWE — UWI Mona</div>
          </div>
        </div> 
        */}
      </section>

      {/* ═════ 01 — Selected work (Featured) ═════ */}
      <section id="featured" className="py-24 fade-in-section relative">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">

          <div className="section-marker">
            <span className="num">01</span>
            <span className="rule"></span>
            <span className="mono-label">Selected work</span>
          </div>

          <h2 className="display-light mb-12" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', maxWidth: '20ch' }}>
            Things I'm <em>most</em> proud of building.
          </h2>

          <div
            className="relative"
            onMouseEnter={() => setIsFeaturedHovered(true)}
            onMouseLeave={() => setIsFeaturedHovered(false)}
          >
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentFeatured * 100}%)` }}
              >
                {featuredProjects.map((project, idx) => (
                  <div key={idx} className="min-w-full">
                    <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">

                      {/* Visual side — 3/5 */}
                      <div className="lg:col-span-3 relative">
                        <div className="card-paper relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                          {project.image ? (
                            <img src={project.image} alt={project.title}
                                 className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center"
                                 style={{ background: 'linear-gradient(135deg, var(--sage) 0%, var(--sage-deep) 100%)' }}>
                              <span className="display" style={{ fontSize: '3rem', fontWeight: 350, color: 'var(--cream)', opacity: 0.7 }}>
                                {project.title}
                              </span>
                            </div>
                          )}
                          <div className="absolute top-5 left-5">
                            <span className="tag tag-cream">{project.role}</span>
                          </div>
                        </div>
                      </div>

                      {/* Content side — 2/5 */}
                      <div className="lg:col-span-2 space-y-5">
                        <div>
                          <h3 className="display-light mb-1.5" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)' }}>
                            {project.title}
                          </h3>
                          <p className="serif-italic" style={{ fontSize: '1.15rem', color: 'var(--sage-deep)' }}>
                            {project.tagline}
                          </p>
                        </div>

                        <p style={{ color: 'var(--ink-muted)', lineHeight: 1.65, fontSize: '0.95rem' }}>
                          {project.description}
                        </p>

                        {project.awards && project.awards.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {project.awards.map((award, i) => {
                              const awardLabel = typeof award === 'string' ? award : award.label;
                              const awardLink = typeof award === 'string' ? '' : award.link;

                              const Tag = awardLink ? 'a' : 'span';

                              return (
                                <Tag
                                  key={i}
                                  {...(awardLink ? { href: awardLink, target: '_blank', rel: 'noopener noreferrer' } : {})}
                                  className="tag tag-amber inline-flex items-center gap-1.5"
                                >
                                  <Award size={11} />
                                  {awardLabel}
                                </Tag>
                              );
                            })}
                          </div>
                        )}

                        <div className="pt-2">
                          <div className="mono-label mb-2.5">Built with</div>
                          <div className="flex flex-wrap gap-1.5">
                            {project.tech.map((t, i) => (
                              <span key={i} className="tag tag-sage">{t}</span>
                            ))}
                          </div>
                        </div>

                        {(project.liveDemo || project.github) && (
                          <div className="flex flex-wrap gap-3 pt-2">
                            {project.liveDemo && (
                              <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="btn btn-ink">
                                View live <ArrowUpRight size={15} />
                              </a>
                            )}
                            {project.github && (
                              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                                <Github size={15} /> Code
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-10">
              <div className="flex items-center gap-2">
                {featuredProjects.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to project ${i + 1}`}
                    onClick={() => setCurrentFeatured(i)}
                    className={`dot ${i === currentFeatured ? 'dot-active' : ''}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="mono-label mr-3">
                  {String(currentFeatured + 1).padStart(2, '0')} / {String(featuredProjects.length).padStart(2, '0')}
                </span>
                <button onClick={prevFeatured} className="arrow-btn" aria-label="Previous">
                  <ChevronLeft size={18} />
                </button>
                <button onClick={nextFeatured} className="arrow-btn" aria-label="Next">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ═════ 02 — Also worth showing (Works grid) ═════ */}
      <section id="works" className="py-24 fade-in-section relative">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">

          <div className="section-marker">
            <span className="num">02</span>
            <span className="rule"></span>
            <span className="mono-label">Other things</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-6">
            <h2 className="display-light" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', maxWidth: '18ch' }}>
              A wider <em>look</em> at what I've made.
            </h2>

            <div className="flex flex-wrap gap-2">
              {works.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setFilter(c.title)}
                  className={`pill ${filter === c.title ? 'pill-active' : ''}`}
                  style={{ textTransform: 'capitalize' }}
                >
                  {c.title}
                </button>
              ))}
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <p className="lede" style={{ fontSize: '1.1rem' }}>Nothing here yet — check back.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
              {filteredProjects.map((project, idx) => (
                <a
                  key={idx}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card-paper"
                  onClick={(e) => {
                    if (project.category === 'app') {
                      e.preventDefault();
                      setSelectedProject(project);
                      setShowModal(true);
                    }
                  }}
                >
                  <div className="thumb">
                    {project.image && <img src={project.image} alt={project.title} />}
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="display" style={{ fontSize: '1.2rem', fontWeight: 500, lineHeight: 1.2 }}>
                        {project.title}
                      </h3>
                      <ArrowUpRight size={18} style={{ color: 'var(--ink-soft)', flexShrink: 0, marginTop: '2px' }} />
                    </div>
                    <p className="text-sm mb-3" style={{ color: 'var(--ink-muted)', lineHeight: 1.5 }}>
                      {project.description}
                    </p>
                    <span className="tag tag-sage">{project.category}</span>
                  </div>
                </a>
              ))}
            </div>
          )}

          {showModal && selectedProject?.category === 'app' && selectedProject && (
            <div className="modal-overlay" onClick={() => setShowModal(false)}>
              <div className="modal-box" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
                <iframe
                  src={selectedProject.link}
                  allow="autoplay"
                  allowFullScreen
                />
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ═════ 03 — Some moments along the way (Experiences) ═════ */}
      <section id="carousel" className="py-24 fade-in-section relative">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">

          <div className="section-marker">
            <span className="num">03</span>
            <span className="rule"></span>
            <span className="mono-label">The journey</span>
          </div>

          <h2 className="display-light mb-12" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', maxWidth: '22ch' }}>
            A few <em>moments</em> from the way here.
          </h2>

          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {carouselItems.map((item, idx) => (
                  <div key={idx} className="min-w-full">
                    <div className="grid md:grid-cols-2 gap-10 items-center py-6">
                      <div className="space-y-4">
                        <div className="mono-label">{String(idx + 1).padStart(2, '0')}</div>
                        <h3 className="display-light" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
                          {item.title}
                        </h3>
                        <p className="serif-italic" style={{ fontSize: '1.1rem', color: 'var(--sage-deep)' }}>
                          {item.role}
                        </p>
                        <p style={{ color: 'var(--ink-muted)', lineHeight: 1.65 }}>
                          {item.description}
                        </p>
                      </div>

                      <div className="relative">
                        <div className="card-paper overflow-hidden" style={{ aspectRatio: '4/3' }}>
                          {item.image && (
                            <img src={item.image} alt={item.title}
                                 className="w-full h-full object-cover mask-fade-radial"
                                 style={{ opacity: 0.85 }} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mt-8">
              <div className="flex items-center gap-2">
                {carouselItems.map((_, i) => (
                  <button key={i}
                          onClick={() => setCurrentSlide(i)}
                          aria-label={`Slide ${i + 1}`}
                          className={`dot ${i === currentSlide ? 'dot-active' : ''}`} />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button onClick={prevSlide} className="arrow-btn" aria-label="Previous">
                  <ChevronLeft size={18} />
                </button>

                <button onClick={nextSlide} className="arrow-btn" aria-label="Next">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ═════ 05 — Stack (Skills marquee) ═════ */}
      <section id="skills" className="py-24 fade-in-section relative">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 mb-10">

          <div className="section-marker">
            <span className="num">04</span>
            <span className="rule"></span>
            <span className="mono-label">Stack</span>
          </div>

          <h2 className="display-light" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', maxWidth: '20ch' }}>
            What I <em>build</em> with, day to day.
          </h2>
        </div>

        <div className="space-y-6 mask-fade-x">
          <div className="overflow-hidden py-4">
            <div className="marquee-container">
              <div className="marquee-left flex gap-4">
                {[...frontendSkills, ...frontendSkills, ...frontendSkills].map((skill, idx) => (
                  <div 
                    key={idx} 
                    className="skill-pill"
                  >
                    <img src={skill.icon} alt="" />
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-hidden py-4">
            <div className="marquee-container">
              <div className="marquee-right flex gap-4">
                {[...backendSkills, ...backendSkills, ...backendSkills].map((skill, idx) => (
                  <div key={idx} className="skill-pill">
                    <img src={skill.icon} alt="" />
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════ 06 — Get in touch (Contact) ═════ */}
      <section id="contact" className="py-24 fade-in-section relative">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">

          <div className="section-marker">
            <span className="num">05</span>
            <span className="rule"></span>
            <span className="mono-label">Get in touch</span>
          </div>

          <div className="grid md:grid-cols-5 gap-12 lg:gap-20">

            {/* Left: invitation + contact info */}
            <div className="md:col-span-2 space-y-10">
              <div>
                <h2 className="display-light mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>
                  Let's <em>build</em> something.
                </h2>
                <p className="lede" style={{ fontSize: '1.1rem' }}>
                  Got a project, a question, or just want to say hello? Drop a line — I read everything.
                </p>
              </div>

              <div className="space-y-5">
                {contacts.map((c, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1" style={{ color: 'var(--sage-deep)' }}>
                      <c.icon size={18} />
                    </div>
                    
                    <div>
                      <div className="mono-label mb-1">{c.title}</div>
                      {c.link ? (
                        <a href={c.link}
                           className="display"
                           style={{ fontSize: '1.05rem', color: 'var(--ink)', transition: 'color 0.25s' }}
                           onMouseEnter={(e) => e.currentTarget.style.color = 'var(--sage-deep)'}
                           onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ink)'}
                        >
                          {c.content}
                        </a>
                      ) : (
                        <p className="display" style={{ fontSize: '1.05rem' }}>{c.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div className="md:col-span-3">
              <div className="card-cream p-7 sm:p-9 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="mono-label block mb-2">Name</label>
                    <input
                      type="text" name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="input-paper"
                    />
                  </div>
                  <div>
                    <label className="mono-label block mb-2">Email</label>
                    <input
                      type="email" name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="input-paper"
                    />
                  </div>
                </div>
                <div>
                  <label className="mono-label block mb-2">Subject</label>
                  <input
                    type="text" name="subject"
                    placeholder="What's it about?"
                    value={formData.subject}
                    onChange={handleFormChange}
                    required
                    className="input-paper"
                  />
                </div>
                <div>
                  <label className="mono-label block mb-2">Message</label>
                  <textarea
                    name="message"
                    placeholder="Tell me a little about what you have in mind."
                    rows="6"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    className="input-paper"
                    style={{ resize: 'vertical', fontFamily: 'var(--font-body)' }}
                  />
                </div>
                <button onClick={handleSubmit} className="btn btn-ink w-full justify-center">
                  <Send size={15} />
                  Send message
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═════ Footer ═════ */}
      <footer className="py-12 relative" style={{ borderTop: '1px solid var(--rule)' }}>
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">

            <div className="flex items-center gap-3">
              <span className="display" style={{ fontSize: '1.05rem', fontWeight: 500 }}>
                John<em style={{ fontStyle: 'italic', color: 'var(--sage-deep)' }}>.</em>
              </span>
              <span className="mono-label">© 2026 · Josiah-John Green</span>
            </div>

            <div className="flex items-center gap-5">
              {socials.map((s, i) => (
                <a key={i} href={s.link} target="_blank" rel="noopener noreferrer"
                   aria-label={s.label}
                   style={{ color: 'var(--ink-muted)', transition: 'color 0.25s' }}
                   onMouseEnter={(e) => e.currentTarget.style.color = 'var(--sage-deep)'}
                   onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ink-muted)'}
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>

          </div>
        </div>
      </footer>

    </div>
  );
};

export default Portfolio;