import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ConsoleApp() {
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [error] = useState<Error | null>(null);

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
            <div style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>
                Errore: {error.message}
            </div>
        );
    }

    const images = [
        { src: "/screenshots/console.png", alt: "Menu principale dell'app console" },
        { src: "/screenshots/esempio1.png", alt: "Lista clienti visualizzata nell'app console" },
        { src: "/screenshots/esempio2.png", alt: "Dettaglio ordine nell'app console" },
        { src: "/screenshots/esempio3.png", alt: "Backup dati nell'app console" },
    ];

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
                App Console Gestione Ordini & Clienti
            </h1>

            <p style={{ fontSize: "1.125rem", lineHeight: "1.8", color: "#374151", marginBottom: "1rem" }}>
                Applicazione console in <strong>C#</strong> sviluppata per la gestione di ordini e clienti in contesti aziendali simulati.
                È un progetto focalizzato sulla logica, la struttura dei dati e l'interazione tramite interfaccia testuale.
            </p>

            <ul style={{ paddingLeft: "1.5rem", fontSize: "1.05rem", lineHeight: "1.8", color: "#374151", marginBottom: "2rem" }}>
                <li>Architettura a classi separate per moduli (Clienti, Ordini)</li>
                <li>Uso di <strong>liste, dizionari</strong> e <strong>file system</strong> per la persistenza dei dati</li>
                <li>Funzionalità CRUD su clienti e ordini</li>
                <li>Menu navigabile e input utente con validazioni</li>
                <li>Paginazione tabellare</li>
                <li>Gestione degli errori e validazione input</li>
                <li>Interfaccia testuale semplice e intuitiva</li>
                <li>Bogus per generazione fittizia clienti/ordini</li>
                <li>Possibilità di effettuare backup del DB</li>
                <li>LogManager per il salvataggio in una cartella dei log</li>
            </ul>

            <p style={{ fontSize: "1.05rem", lineHeight: "1.8", color: "#374151", marginBottom: "2rem" }}>
                Questo progetto rappresenta un esercizio di buona progettazione ad oggetti, gestione degli errori e struttura del codice senza dipendenze UI.
                Realizzato durante il percorso in stage ad Exprivia ed usato per approfondire la logica applicativa.
            </p>

            {/* Sezione immagini */}
            <div style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1.5rem", color: "#1f2937", marginBottom: "1rem" }}>Screenshot dell'app</h2>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
                    {images.map((img, i) => (
                        <img
                            key={i}
                            src={img.src}
                            alt={img.alt}
                            style={{
                                maxWidth: "280px",
                                borderRadius: "8px",
                                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                                cursor: "pointer"
                            }}
                            onClick={() => openModal(img.src)}
                        />
                    ))}
                </div>
            </div>

            {/* Link GitHub sopra il bottone Home */}
            <a
                href="https://github.com/Scriptor00/AppConsole"
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

            <Link
                to="/"
                style={{
                    padding: "0.75rem 1.5rem",
                    backgroundColor: "#4f46e5",
                    color: "#ffffff",
                    borderRadius: "8px",
                    fontWeight: "600",
                    textDecoration: "none",
                    transition: "background-color 0.3s ease",
                    display: "inline-block",
                    textAlign: "center",
                    minWidth: "140px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3b3bb0")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")}
            >
                ← Torna alla Home
            </Link>

            {/* Modal immagine */}
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
                        cursor: "pointer"
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

export default ConsoleApp;
