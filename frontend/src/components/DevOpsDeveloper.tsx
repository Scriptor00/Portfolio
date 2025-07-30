import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface ErrorType {
    message: string;
}

function DevOpsDeveloper() {
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
            textAlign: "center"
        }}>
            <h1 style={{
                fontSize: "2.5rem",
                marginBottom: "1rem",
                color: "#1f2937",
                borderBottom: "2px solid #6366f1",
                paddingBottom: "0.5rem",
                fontWeight: "700"
            }}>
                DevOps Developer
            </h1>

            <p style={{
                fontSize: "1.125rem",
                lineHeight: "1.8",
                color: "#374151",
                marginBottom: "1rem"
            }}>
                In questa sezione descrivo le competenze acquisite in ambito <strong>DevOps</strong> durante il mio stage presso <strong>Exprivia</strong> e il percorso ITS presso <strong>Digital Maker</strong>, con particolare attenzione a <strong>Docker</strong> e <strong>SQL Server</strong>.
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
                <li><strong>SQL Server</strong> – Progettazione DB relazionali, stored procedure, query avanzate con JOIN, GROUP BY, sottoquery.</li>
                <li><strong>SSMS</strong> – Gestione del database, scripting, manutenzione e debugging.</li>
                <li><strong>Entity Framework Core</strong> – Integrazione in ASP.NET Core, gestione dei dati via LINQ, migrazioni e mapping relazionale.</li>
                <li><strong>Docker</strong> – Creazione e gestione di container per applicazioni full-stack (ASP.NET + SQL Server).</li>
                <li><strong>Dockerfile & Compose</strong> – Scripting per ambienti di sviluppo, gestione volumi e reti.</li>
                <li><strong>Deployment Locale</strong> – Configurazione ambienti containerizzati per test e sviluppo.</li>
            </ul>

            <p style={{
                fontSize: "1.05rem",
                lineHeight: "1.8",
                color: "#374151",
                marginBottom: "2rem"
            }}>
                Ho applicato queste competenze in progetti reali, dockerizzando applicazioni ASP.NET Core MVC con database SQL Server per renderle facilmente distribuibili e scalabili. Queste esperienze mi hanno permesso di comprendere l’importanza della containerizzazione e dell’infrastruttura automatizzata.
            </p>

            <Link
                to="/gestioneClienti"
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
                🔍 Vedi i miei progetti
            </Link>

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
                ← Torna alla Home
            </Link>
        </div>
    );
}

export default DevOpsDeveloper;
