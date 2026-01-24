import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="flex justify-between items-center w-full pb-4">
      <div className="flex flex-col">
        <h1 className="text-bufo-500 text-2xl font-bold">bufo.fun</h1>
        <p className="text-gray-500 text-sm">Quite a few bufos</p>
      </div>
      <nav className="flex gap-8 items-center">
        <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
          Home
        </Link>
        <Link to="/builder" className="text-gray-600 hover:text-gray-900 transition-colors">
          Builder
        </Link>
        <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
          About
        </Link>
        <a 
          href="https://github.com/tfritzy/bufo.fun" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}
