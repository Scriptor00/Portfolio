// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BackendDeveloper from "./components/backendDeveloper";
import FrontendDeveloper from "./components/FrontendDeveloper";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/backend" element={<BackendDeveloper />} />
        <Route path="/frontend" element={<FrontendDeveloper />} />
      </Routes>
    </Router>
  );
}
