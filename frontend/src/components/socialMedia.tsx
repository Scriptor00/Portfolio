import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface ErrorType {
    message: string;
}

function SocialMedia() {
    const [loading, setLoading] = useState(true);
    const [error] = useState<ErrorType | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

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
            textAlign: "center",
        }}>
            <h1 style={{
                fontSize: "2.5rem",
                marginBottom: "1rem",
                color: "#1f2937",
                borderBottom: "2px solid #6366f1",
                paddingBottom: "0.5rem",
                fontWeight: "700"
            }}>
                Social Media App
            </h1>

            <p style={{
                fontSize: "1.125rem",
                lineHeight: "1.8",
                color: "#374151",
                marginBottom: "1rem"
            }}>
                Un'app mobile sviluppata in <strong>React Native</strong>, ispirata a Instagram, realizzata durante il mio percorso ITS. Utilizza <strong>useContext</strong>, <strong>useState</strong> e <strong>useEffect</strong> per la gestione dello stato e delle interazioni utente.
            </p>

            <ul style={{
                paddingLeft: "1.5rem",
                fontSize: "1.05rem",
                lineHeight: "1.8",
                color: "#374151",
                marginBottom: "2rem",
                textAlign: "left",
                maxWidth: "600px",
                marginLeft: "auto",
                marginRight: "auto",
            }}>
                <li><strong>Home Feed</strong> – Visualizzazione dei post pubblicati dagli utenti</li>
                <li><strong>Profilo personale</strong> – Pagina dedicata al proprio profilo con post e informazioni</li>
                <li><strong>Aggiunta post</strong> – Possibilità di caricare immagini e descrizioni</li>
                <li><strong>Like</strong> – Interazione con i post tramite "Mi piace"</li>
                <li><strong>useContext</strong> – Gestione centralizzata dell'utente autenticato</li>
                <li><strong>useEffect & useState</strong> – Per fetch, aggiornamenti UI e gestione eventi</li>
            </ul>

            <p style={{
                fontSize: "1.05rem",
                lineHeight: "1.8",
                color: "#374151",
                marginBottom: "2rem"
            }}>
                Questo progetto mi ha permesso di esplorare la logica delle app mobile moderne, consolidare le conoscenze su React Native e approfondire la gestione dello stato globale e locale.
            </p>

            {/* Pulsante GitHub */}
            <a
                href="https://github.com/Scriptor00/istragram" 
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
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#4f46e5")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#6366f1")}
            >
                🔍 Visualizza il codice su GitHub
            </a>

            <br />

            <Link
                to="/"
                style={{
                    display: "inline-block",
                    padding: "0.75rem 1.5rem",
                    backgroundColor: "#4f46e5",
                    color: "#ffffff",
                    borderRadius: "8px",
                    fontWeight: "600",
                    textDecoration: "none",
                    transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3b3bb0")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")}
            >
                Torna alla Home
            </Link>
        </div>
    );
}

export default SocialMedia;
