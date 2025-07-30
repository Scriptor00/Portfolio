import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface ErrorType {
    message: string;
}

function BackendDeveloper() {
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
                Backend Developer
            </h1>

            <p style={{
                fontSize: "1.125rem",
                lineHeight: "1.8",
                color: "#374151",
                marginBottom: "1rem"
            }}>
                Mi occupo dello sviluppo lato server utilizzando <strong>C#</strong> e <strong>ASP.NET Core</strong>.
                In questa sezione trovi una panoramica delle tecnologie e librerie che uso quotidianamente.
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
                <li><strong>ASP.NET Core</strong> – Web API, MVC, Dependency Injection</li>
                <li><strong>Entity Framework Core</strong> – Code First, Migrations, LINQ</li>
                <li><strong>Autenticazione</strong> – ASP.NET Identity, JWT, gestione ruoli e claim</li>
                <li><strong>Database</strong> – SQL Server, stored procedure, relazioni</li>
                <li><strong>Docker</strong> – Container per app e database (in fase di integrazione)</li>
                <li><strong>Altre librerie</strong> – AutoMapper, Stripe, SignalR, Bogus, ClosedXML, Serilog, Swagger</li>
            </ul>

            <p style={{
                fontSize: "1.05rem",
                lineHeight: "1.8",
                color: "#374151",
                marginBottom: "2rem"
            }}>
                Ho applicato queste tecnologie in progetti sviluppati durante il mio stage presso <strong>Exprivia</strong> e il mio percorso ITS presso <strong>Digital Maker</strong>.
                Puoi esplorarli nella sezione dedicata.
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

export default BackendDeveloper;
