import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface ErrorType {
  message: string;
}

function BackendDeveloper() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);

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
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "1.5rem",
        color: "#4f46e5",
      }}>
        Caricamento in corso...
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
        Backend Developer
      </h1>

      <p style={{
        fontSize: "1.125rem",
        lineHeight: "1.8",
        color: "#374151",
        marginBottom: "1rem"
      }}>
        Questa è la pagina dedicata al <strong>backend development</strong>, dove esploro tecnologie come <strong>C#</strong>, <strong>ASP.NET Core</strong> e altro ancora.
      </p>

      <p style={{
        fontSize: "1.125rem",
        lineHeight: "1.8",
        color: "#374151",
        marginBottom: "2rem"
      }}>
        Qui puoi trovare informazioni sui miei <strong>progetti</strong>, le <strong>tecnologie</strong> che utilizzo e le mie <strong>esperienze</strong> nel campo dello sviluppo backend, maturati durante il mio stage presso <strong>Exprivia</strong> e gli studi all'<strong>ITS Digital Maker</strong>.
      </p>

      <Link
        to="/projects"
        style={{
          display: "inline-block",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#6366f1",
          color: "#ffffff",
          borderRadius: "8px",
          fontWeight: "600",
          textDecoration: "none",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#6366f1")}
      >
        🔍 Vedi i miei progetti
      </Link>
    </div>
  );
}

export default BackendDeveloper;
