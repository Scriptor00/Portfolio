// src/pages/HomePage.tsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./HomePage.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState<string>("hero");
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const observerOptions: IntersectionObserverInit = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animated");
                }
            });
        }, observerOptions);

        document.querySelectorAll(".animate-on-scroll").forEach((el) => {
            observer.observe(el);
        });

        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);

        const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
        anchors.forEach((anchor) => {
            anchor.addEventListener("click", (e) => {
                e.preventDefault();
                const href = anchor.getAttribute("href");
                if (href) {
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                }
            });
        });

        const sections = document.querySelectorAll<HTMLElement>("section[id]");
        const spyObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, {
            root: null,
            rootMargin: "0px",
            threshold: 0.5,
        });

        sections.forEach((section) => spyObserver.observe(section));

        return () => {
            observer.disconnect();
            spyObserver.disconnect();
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleCardClick = () => {
        navigate("/backend");
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <nav className="navbar">
                <ul>
                    <li><a href="#hero" className={activeSection === "hero" ? "active" : ""}>Home</a></li>
                    <li><a href="#skills" className={activeSection === "skills" ? "active" : ""}>Competenze</a></li>
                    <li><a href="#projects" className={activeSection === "projects" ? "active" : ""}>Progetti</a></li>
                    <li><a href="#contact" className={activeSection === "contact" ? "active" : ""}>Contatti</a></li>
                </ul>
            </nav>

            <motion.section className="hero" id="hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <div className="floating-elements">
                    <motion.div className="floating-element" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>💻</motion.div>
                    <motion.div className="floating-element" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}>🚀</motion.div>
                    <motion.div className="floating-element" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}>⚡</motion.div>
                </div>

                <div className="hero-content">
                    <motion.h1 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
                        Ciao, sono <span className="highlight">Carlo Dicuonzo</span>
                    </motion.h1>
                    <motion.p className="subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>Full Stack Developer & Tech Enthusiast</motion.p>
                    <motion.p className="description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                        Appassionato di backend development, specializzato in C#, React e ASP.NET Core<br />
                        Attualmente in stage presso Exprivia | Studente ITS Digital Maker
                    </motion.p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: 'var(--space-xl)' }}> {/* Nuovo div per raggruppare i pulsanti */}
                        <motion.a href="#contact" className="cta-button" whileHover={{ scale: 1.1 }}>
                            <span>📧</span> Contattami
                        </motion.a>
                        <motion.a
                            href="/Carlo_Dicuonzo_CV.pdf" 
                            download="Carlo_Dicuonzo_CV.pdf" 
                            className="cta-button"
                            whileHover={{ scale: 1.1 }}
                        >
                            <span>📄</span> Scarica il CV
                        </motion.a>
                    </div>
                </div>
            </motion.section>

            <section className="skills-section" id="skills">
                <div className="container">
                    <h2 className="section-title">Le mie competenze</h2>
                    <div className="skills-grid">
                        <Link to="/backend" className="skill-card animate-on-scroll" onClick={handleCardClick}>
                            <span className="skill-icon">🧠</span>
                            <h3 className="skill-title">Backend Development</h3>
                            <p className="skill-description">C#, ASP.NET Core MVC/Web API, Entity Framework</p>
                            <span className="btn-go">Vai →</span>
                        </Link>

                        <Link to="/devops"  className="skill-card animate-on-scroll">
                            <span className="skill-icon">⚙️</span>
                            <h3 className="skill-title">DevOps & Database</h3>
                            <p className="skill-description">Docker per containerizzazione e SQL Server per gestione dati</p>
                            <span className="btn-go">Vai →</span>
                        </Link>
                        

                        <Link to="/frontend" className="skill-card animate-on-scroll" onClick={handleCardClick}>
                            <span className="skill-icon">🧩</span>
                            <h3 className="skill-title">Frontend Development</h3>
                            <p className="skill-description">React, Vite, TypeScript, HTML/CSS, Razor Pages</p>
                            <span className="btn-go">Vai →</span>
                        </Link>

                        <Link to="/security" className="skill-card animate-on-scroll">
                            <span className="skill-icon">🔐</span>
                            <h3 className="skill-title">Security & Auth</h3>
                            <p className="skill-description">Autenticazione sicura con JWT e Identity</p>
                            <span className="btn-go">Vai →</span>
                        </Link>
                    </div>
                </div>
            </section>

            <motion.section className="projects-section" id="projects" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <div className="container">
                    <h2 className="section-title">Progetti in evidenza</h2>
                    <div className="projects-grid">
                        <Link to="/gestioneClienti" className="project-card animate-on-scroll">
                            <h3 className="project-title"><span>📊</span> Sistema Gestione Ordini & Clienti</h3>
                            <p className="project-description">Applicazione gestionale con ASP.NET MVC e Razor Pages...</p>
                            <span className="btn-go">Vai →</span>
                        </Link>

                        <Link to="/giochiPreferiti" className="project-card animate-on-scroll">
                            <h3 className="project-title"><span>🎮</span> Collezione personale di videogames</h3>
                            <p className="project-description">Piattaforma web per catalogare e gestire collezioni, sviluppata in .NET Core e React...</p>
                             <span className="btn-go">Vai →</span>
                        </Link>
                        
                        <Link to="/socialMedia" className="project-card animate-on-scroll">
                            <h3 className="project-title"><span>📱</span> Social Media App</h3>
                            <p className="project-description">App responsive simile a Instagram, sviluppata in React Native...</p>
                            <span className="btn-go">Vai →</span>
                        </Link>
                    </div>
                </div>
            </motion.section>

            <motion.section className="contact-section" id="contact" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <div className="container">
                    <div className="contact-content">
                        <h2>Parliamo del prossimo progetto</h2>
                        <p>Contattami per nuove opportunità e collaborazioni!</p>
                        <div className="contact-links">
                            <a href="mailto:carlodicuonzo@yahoo.com" className="contact-email">
                                <i className="fas fa-envelope"></i> carlodicuonzo@yahoo.com
                            </a>
                            <div className="contact-phone-box">
                                <i className="fas fa-phone"></i> +39 389 1691521
                            </div>
                            <div className="social-links">
                                <a href="https://www.linkedin.com/in/carlo-dicuonzo-8b9a26339/" target="_blank" rel="noopener noreferrer" className="social-icon">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                                <a href="https://github.com/Scriptor00" target="_blank" rel="noopener noreferrer" className="social-icon">
                                    <i className="fab fa-github"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {showScrollTop && (
                <button onClick={scrollToTop} className="scroll-to-top" aria-label="Scroll to top">
                    ↑
                </button>
            )}
        </>
    );
};

export default HomePage;