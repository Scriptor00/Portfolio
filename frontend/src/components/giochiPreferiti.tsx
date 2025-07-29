import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface ErrorType {
    message: string;
}

function ClassificatoreGiochi() {
    const [loading, setLoading] = useState(true);
    const [error] = useState<ErrorType | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const openModal = (src: string) => setSelectedImage(src);
    const closeModal = () => setSelectedImage(null);

    if (loading) {
        return (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", fontSize: "1.5rem", color: "#4f46e5" }}>
                <div style={{ border: "6px solid #e0e7ff", borderTop: "6px solid #4f46e5", borderRadius: "50%", width: "48px", height: "48px", animation: "spin 1s linear infinite", marginBottom: "1rem" }} />
                Caricamento in corso...
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    if (error) {
        return <div style={{ textAlign: "center", marginTop: "2rem", color: "red", fontSize: "1.2rem" }}>Errore: {error.message}</div>;
    }

    return (
        <div style={{ padding: "3rem 1rem", maxWidth: "900px", margin: "0 auto", backgroundColor: "#f9fafb", borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
            <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#1f2937", borderBottom: "2px solid #6366f1", paddingBottom: "0.5rem", fontWeight: "700" }}>
                Classificatore di Videogiochi
            </h1>

            <p style={{ fontSize: "1.1rem", color: "#374151", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                Un progetto personale sviluppato per tenere traccia dei videogiochi che ho giocato, sto giocando o voglio giocare. L'app consente di creare una libreria personalizzata con stato, voto, commenti e copertina dei giochi. 
                È stata realizzata con <strong>React</strong> per il frontend e <strong>.NET Core</strong> per il backend, con salvataggio dati su <strong>SQL Server</strong>.
            </p>

            <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: "#4f46e5" }}>🛠️ Tecnologie utilizzate</h2>
            <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem", color: "#374151", marginBottom: "1.5rem" }}>
                <li>React con TypeScript</li>
                <li>.NET Core Web API</li>
                <li>Entity Framework Core + SQL Server</li>
                <li>Tailwind CSS per lo styling</li>
                <li>Swagger per le chiamate API</li>
            </ul>

            <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: "#4f46e5" }}>✅ Funzionalità principali</h2>
            <ul style={{ listStyleType: "square", paddingLeft: "1.5rem", color: "#374151", marginBottom: "2rem" }}>
                <li>Aggiunta manuale di giochi con cover, stato e commenti, con inserimento nel DB tramite API o tramite interfaccia grafica</li>
                <li>Visualizzazione dettagli gioco con commento personale</li>
                <li>Possibilità di modificare dettagli gioco</li>
                <li>Classificazione per: Giocato / In Corso / Da Giocare</li>
                <li>Possibilità di modificare il gioco da "Da giocare" a "Giocato"</li>
                <li>Filtro e ricerca giochi per nome, genere, data di pubblicazione</li>
                <li>UI responsive per dispositivi mobili</li>
            </ul>

            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#4f46e5" }}>🖼️ Galleria del progetto</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
                {["/screenshots/home.png", "/screenshots/completati.png", "/screenshots/dettaglio.png", "/screenshots/aggiungi.png"].map((src, i) => (
                    <img
                        key={i}
                        src={src}
                        alt={`Screenshot ${i + 1}`}
                        style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px", border: "1px solid #d1d5db", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)", cursor: "pointer" }}
                        onClick={() => openModal(src)}
                    />
                ))}
            </div>

            <Link to="/" style={{ display: "inline-block", backgroundColor: "#4f46e5", color: "#fff", padding: "0.75rem 1.5rem", borderRadius: "8px", textDecoration: "none", fontWeight: "600", transition: "background-color 0.3s" }}>
                Torna alla Home
            </Link>

            {selectedImage && (
                <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.8)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }} onClick={closeModal}>
                    <img
                        src={selectedImage}
                        alt="Immagine ingrandita"
                        style={{ maxWidth: "90%", maxHeight: "90%", borderRadius: "10px", boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)", objectFit: "contain" }}
                    />
                </div>
            )}
        </div>
    );
}

export default ClassificatoreGiochi;