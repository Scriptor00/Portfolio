// src/pages/HomePage.tsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState<string>("hero");

    useEffect(() => {
        // IntersectionObserver per animazioni (già esistente)
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

        // Hover effetto sulle card (già esistente)
        const cards = document.querySelectorAll<HTMLElement>(".skill-card, .project-card");
        cards.forEach((card) => {
            card.addEventListener("mouseenter", () => {
                card.style.transform = card.classList.contains("project-card")
                    ? "scale(1.02)"
                    : "translateY(-10px)";
            });
            card.addEventListener("mouseleave", () => {
                card.style.transform = "none";
            });
        });

        // Smooth scroll (già esistente)
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

        // ScrollSpy: osserva le sezioni per cambiare link attivo
        const sections = document.querySelectorAll<HTMLElement>(
            "section[id]"
        );

        const handleScrollSpy = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const spyObserver = new IntersectionObserver(handleScrollSpy, {
            root: null,
            rootMargin: "0px",
            threshold: 0.5, // almeno il 50% visibile
        });

        sections.forEach((section) => spyObserver.observe(section));

        return () => {
            observer.disconnect();
            spyObserver.disconnect();
            // Rimuovere event listeners da cards e anchors se vuoi
        };
    }, []);

    const handleCardClick = () => {
        navigate("/backend");
    };

    return (
        <>
            <nav className="navbar">
                <ul>
                    <li>
                        <a
                            href="#hero"
                            className={activeSection === "hero" ? "active" : ""}
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            href="#skills"
                            className={activeSection === "skills" ? "active" : ""}
                        >
                            Competenze
                        </a>
                    </li>
                    <li>
                        <a
                            href="#projects"
                            className={activeSection === "projects" ? "active" : ""}
                        >
                            Progetti
                        </a>
                    </li>
                    <li>
                        <a
                            href="#contact"
                            className={activeSection === "contact" ? "active" : ""}
                        >
                            Contatti
                        </a>
                    </li>
                </ul>
            </nav>

            <section className="hero" id="hero">
                <div className="floating-elements">
                    <div className="floating-element">💻</div>
                    <div className="floating-element">🚀</div>
                    <div className="floating-element">⚡</div>
                </div>

                <div className="hero-content">
                    <h1>
                        Ciao, sono <span className="highlight">Carlo Dicuonzo</span>
                    </h1>
                    <p className="subtitle">Full Stack Developer & Tech Enthusiast</p>
                    <p className="description">
                        Appassionato di backend development, specializzato in C#, React e ASP.NET Core
                        <br />
                        Attualmente in stage presso Exprivia | Studente ITS Digital Maker
                    </p>
                    <a href="#contact" className="cta-button">
                        <span>📧</span> Contattami
                    </a>
                </div>
            </section>

            <section className="skills-section" id="skills">
                <div className="container">
                    <h2 className="section-title">Le mie competenze</h2>

                    <div className="skills-grid">
                        <Link
                            to="/backend"
                            className="skill-card animate-on-scroll"
                            role="button"
                            tabIndex={0}
                            onClick={handleCardClick}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleCardClick();
                            }}
                        >
                            <span className="skill-icon">🧠</span>
                            <h3 className="skill-title">Backend Development</h3>
                            <p className="skill-description">
                                C#, ASP.NET Core MVC/Web API, Entity Framework per applicazioni robuste e scalabili
                            </p>
                            <span className="btn-go">Vai →</span>
                        </Link>

                        <div className="skill-card animate-on-scroll">
                            <span className="skill-icon">⚙️</span>
                            <h3 className="skill-title">DevOps & Database</h3>
                            <p className="skill-description">
                                Docker per containerizzazione e SQL Server per gestione dati enterprise-level
                            </p>
                        </div>

                        <div className="skill-card animate-on-scroll">
                            <span className="skill-icon">🧩</span>
                            <h3 className="skill-title">Frontend Development</h3>
                            <p className="skill-description">
                                React, Vite, TypeScript, HTML/CSS, Razor Pages per interfacce moderne e responsive
                            </p>
                        </div>

                        <div className="skill-card animate-on-scroll">
                            <span className="skill-icon">🔐</span>
                            <h3 className="skill-title">Security & Auth</h3>
                            <p className="skill-description">
                                Implementazione di sistemi di autenticazione sicuri con JWT e Identity
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="projects-section" id="projects">
                <div className="container">
                    <h2 className="section-title">Progetti in evidenza</h2>
                    <div className="projects-grid">
                        <div className="project-card animate-on-scroll">
                            <h3 className="project-title">
                                <span>📊</span> Sistema Gestione Ordini & Clienti
                            </h3>
                            <p className="project-description">
                                Applicazione gestionale sviluppata con ASP.NET MVC e Razor Pages...
                            </p>
                        </div>

                        <div className="project-card animate-on-scroll">
                            <h3 className="project-title">
                                <span>🎮</span> Collezione personale di videogames
                            </h3>
                            <p className="project-description">
                                Piattaforma web per catalogare e gestire collezioni di videogiochi...
                            </p>
                        </div>

                        <div className="project-card animate-on-scroll">
                            <h3 className="project-title">
                                <span>📱</span> Social Media App
                            </h3>
                            <p className="project-description">
                                App mobile responsive simile ad Instagram, sviluppata in React.js...
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="contact-section" id="contact">
                <div className="container">
                    <div className="contact-content">
                        <h2>Parliamo del prossimo progetto</h2>
                        <p>Sono sempre interessato a nuove opportunità e collaborazioni. Contattami!</p>

                        <div className="contact-links">
                            <a href="mailto:carlodicuonzo@yahoo.com" className="contact-email">
                                <i className="fas fa-envelope"></i> carlodicuonzo@yahoo.com
                            </a>
                            <div className="contact-phone-box">
                                <i className="fas fa-phone"></i> +39 389 1691621
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
            </section>
        </>
    );
};

export default HomePage;