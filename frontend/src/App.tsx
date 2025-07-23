// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BackendDeveloper from "./components/backendDeveloper";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/backend" element={<BackendDeveloper />} />
      </Routes>
    </Router>
  );
}
