import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface ErrorType {
  message: string;
}

const SicurezzaAutenticazione = () => {
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
        Sicurezza ed Autenticazione
      </h1>

      <p style={{
        fontSize: "1.125rem",
        lineHeight: "1.8",
        color: "#374151",
        marginBottom: "1rem"
      }}>
        In questa sezione esploro le tecnologie e le pratiche che utilizzo per garantire la sicurezza delle applicazioni web, con un focus particolare su autenticazione, autorizzazione e protezione dei dati.
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
        <li><strong>ASP.NET Core Identity</strong> – Gestione completa degli utenti: registrazione, login, logout, gestione password.</li>
        <li><strong>Claim-based Authorization</strong> – Autorizzazione basata su <em>claim personalizzati</em> per assegnare ruoli e privilegi specifici.</li>
        <li><strong>Gestione dei ruoli</strong> – Creazione e assegnazione dinamica di ruoli agli utenti tramite Identity.</li>
        <li><strong>Token JWT</strong> – Implementazione dell’autenticazione stateless tramite <em>JSON Web Token</em>.</li>
        <li><strong>Blocco account</strong> – Sistema di sicurezza che blocca l’utente dopo 5 tentativi di login falliti consecutivi.</li>
        <li><strong>Reset password via email</strong> – Invio automatico del link di recupero con token sicuro e scadenza.</li>
        <li><strong>Protezione CSRF/XSS</strong> – Utilizzo dei middleware ASP.NET Core per mitigare attacchi comuni.</li>
        <li><strong>UI/UX migliorata</strong> – Spinner animato durante la fase di login per feedback visivo e controllo della richiesta.</li>
      </ul>

      <p style={{
        fontSize: "1.05rem",
        lineHeight: "1.8",
        color: "#374151",
        marginBottom: "2rem"
      }}>
        Ho applicato queste tecnologie in progetti sviluppati durante il mio stage presso <strong>Exprivia</strong> e il mio percorso ITS presso <strong>Digital Maker</strong>. Alcune funzionalità, come il blocco account e lo spinner durante il login, sono state sviluppate su mia iniziativa per migliorare sicurezza ed esperienza utente.
        Puoi esplorarle nella sezione dedicata.
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
};

export default SicurezzaAutenticazione;
