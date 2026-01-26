import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { BuilderListPage } from "./pages/BuilderListPage";
import { BuilderEditorPage } from "./pages/BuilderEditorPage";

export function App() {
  return (
    <div className="flex flex-col min-h-screen max-h-screen bg-gray-100">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/builder" element={<BuilderListPage />} />
        <Route path="/builder/:id" element={<BuilderEditorPage />} />
      </Routes>
    </div>
  );
}

export default App;
