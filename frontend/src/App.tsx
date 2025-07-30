// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BackendDeveloper from "./components/backendDeveloper";
import FrontendDeveloper from "./components/FrontendDeveloper";
import DevOpsDeveloper from "./components/DevOpsDeveloper";
import SicurezzaAutenticazione from "./components/security";
import GestioneClienti from "./components/gestioneClienti";
import GiochiPreferiti from "./components/giochiPreferiti";
import SocialMedia from "./components/socialMedia";
import ConsoleApp from "./components/consoleApp";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/backend" element={<BackendDeveloper />} />
        <Route path="/frontend" element={<FrontendDeveloper />} />
        <Route path="/devops" element={<DevOpsDeveloper />} />
        <Route path="/security" element={<SicurezzaAutenticazione />} />
        <Route path="/gestioneClienti" element={<GestioneClienti />} />
        <Route path="/giochiPreferiti" element={<GiochiPreferiti />} />
        <Route path="/socialMedia" element={<SocialMedia />} />
        <Route path="/consoleApp" element={<ConsoleApp />} />
      </Routes>
    </Router>
  );
}
