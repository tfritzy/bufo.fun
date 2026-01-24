import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { BuilderPage } from "./pages/BuilderPage";
import { AboutPage } from "./pages/AboutPage";

export function App() {
  return (
    <div className="overflow-y-scroll min-h-screen max-h-screen bg-gray-100">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/builder" element={<BuilderPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  );
}

export default App;
