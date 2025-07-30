import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface ErrorType {
    message: string;
}

function GestioneClienti() {
    const [loading, setLoading] = useState(true);
    const [error] = useState<ErrorType | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const openModal = (src: string) => {
        setSelectedImage(src);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    if (loading) {
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                fontSize: "1.5rem",
                color: "#4f46e5",
            }}>
                <div style={{
                    border: "6px solid #e0e7ff",
                    borderTop: "6px solid #4f46e5",
                    borderRadius: "50%",
                    width: "48px",
                    height: "48px",
                    animation: "spin 1s linear infinite",
                    marginBottom: "1rem",
                }} />
                Caricamento in corso...
                <style>
                    {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    `}
                </style>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                textAlign: "center",
                marginTop: "2rem",
                color: "red",
                fontSize: "1.2rem",
            }}>
                Errore: {error.message}
            </div>
        );
    }

    return (
        <div style={{
            padding: "3rem 1rem",
            maxWidth: "900px",
            margin: "0 auto",
            backgroundColor: "#f9fafb",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        }}>
            <h1 style={{
                fontSize: "2.5rem",
                marginBottom: "1rem",
                color: "#1f2937",
                borderBottom: "2px solid #6366f1",
                paddingBottom: "0.5rem",
                fontWeight: "700"
            }}>
                Gestione Clienti & Ordini
            </h1>

            <p style={{
                fontSize: "1.1rem",
                color: "#374151",
                lineHeight: "1.6",
                marginBottom: "1.5rem"
            }}>
                Questo progetto è stato realizzato durante il mio tirocinio di 6 mesi presso <strong>Exprivia</strong>.
                Si tratta di un'applicazione web full-stack per la gestione di clienti, ordini e prodotti,
                con funzionalità avanzate come autenticazione, importazione da Excel, paginazione personalizzata, pagamenti simulati e notifiche in tempo reale.
                Il backend è sviluppato in <strong>ASP.NET Core MVC</strong> con Entity Framework Core,
                mentre il frontend utilizza le <strong>Razor Pages</strong>.
            </p>

            <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: "#4f46e5" }}>
                🛠️ Tecnologie utilizzate
            </h2>
            <ul style={{
                listStyleType: "disc",
                paddingLeft: "1.5rem",
                color: "#374151",
                marginBottom: "1.5rem"
            }}>
                <li>ASP.NET Core MVC (C#) per il backend</li>
                <li>Entity Framework Core con SQL Server</li>
                <li>Razor Pages per il frontend</li>
                <li>Docker per il deploy locale</li>
                <li>ClosedXML per importazione Excel</li>
                <li>Autenticazione con ASP.NET Identity</li>
                <li>Stripe per i pagamenti</li>
                <li>SignalR per notifiche in tempo reale</li>
                <li>Serilog per logging avanzato</li>
                <li>Bogus per la generazione fittizia di clienti ed ordini</li>
                <li>QuestPDF per la generazione e download di PDF</li>
                <li>System.Net.Mail per l'invio di email</li>
            </ul>

            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#4f46e5" }}>
                ✅ Funzionalità principali
            </h2>
            <ul style={{
                listStyleType: "square",
                paddingLeft: "1.5rem",
                color: "#374151",
                marginBottom: "2rem"
            }}>
                <li>Registrazione e login sicuro con Identity</li>
                <li>Gestione CRUD di clienti, prodotti e ordini</li>
                <li>Visualizzazione dettagli ordine con prodotti acquistati</li>
                <li>Importazione massiva clienti/prodotti da Excel</li>
                <li>Paginazione avanzata con salto pagina</li>
                <li>Pagamento simulato con aggiornamento stock in tempo reale</li>
                <li>Notifiche in tempo reale per aggiornamenti ordini</li>
                <li>Generazione PDF per ordini e fatture</li>
            </ul>

            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#4f46e5" }}>
                🖼️ Galleria del progetto
            </h2>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1rem",
                marginBottom: "2rem"
            }}>
                {[
                    { src: "/screenshots/login.png", alt: "Login" },
                    { src: "/screenshots/clienti.png", alt: "Gestione clienti" },
                    { src: "/screenshots/carrello.png", alt: "Pagina carrello" },
                    { src: "/screenshots/dashboard.png", alt: "Dashboard" },
                    { src: "/screenshots/pannello.png", alt: "Pannello Admin" },
                    { src: "/screenshots/newCliente.png", alt: "Nuovo Cliente" },
                    { src: "/screenshots/modCliente.png", alt: "Modifica Cliente" },
                    { src: "/screenshots/catalogo.png", alt: "Catalogo Prodotti" },
                    { src: "/screenshots/pagamento.png", alt: "Pagamento Stripe" }
                ].map((img, index) => (
                    <img
                        key={index}
                        src={img.src}
                        alt={img.alt}
                        style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                            borderRadius: "10px",
                            border: "1px solid #d1d5db",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                            cursor: "pointer"
                        }}
                        onClick={() => openModal(img.src)}
                    />
                ))}
            </div>

            {/* Pulsante GitHub sopra "Torna alla Home" */}
            <a
                href="https://github.com/Scriptor00/GestioneClienti"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    display: "inline-block",
                    padding: "0.75rem 1.5rem",
                    backgroundColor: "#6366f1",
                    color: "#ffffff",
                    borderRadius: "8px",
                    fontWeight: "600",
                    textDecoration: "none",
                    transition: "background-color 0.3s ease",
                    marginBottom: "1rem",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#6366f1")}
            >
                🔍 Guarda il codice su GitHub
            </a>

            <br />

            <Link to="/" style={{
                display: "inline-block",
                backgroundColor: "#4f46e5",
                color: "#fff",
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "600",
                transition: "background-color 0.3s",
            }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3b3bb0")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")}
            >
                Torna alla Home
            </Link>

            {/* Modal per l'ingrandimento dell'immagine */}
            {selectedImage && (
                <div
                    onClick={closeModal}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                        cursor: "pointer",
                    }}
                >
                    <img
                        src={selectedImage}
                        alt="Immagine ingrandita"
                        onClick={e => e.stopPropagation()}
                        style={{
                            maxWidth: "90%",
                            maxHeight: "90%",
                            borderRadius: "10px",
                            boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
                            objectFit: "contain",
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default GestioneClienti;
