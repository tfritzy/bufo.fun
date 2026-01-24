import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="h-24 p-2 pt-3 flex justify-between items-start w-full">
      <div className="flex flex-col">
        <h1 className="text-bufo-500 text-2xl font-semibold">bufo.fun</h1>
        <p className="text-bufo-300 text-sm">Quite a few bufos</p>
      </div>
      <nav className="flex gap-4 items-center">
        <Link to="/" className="text-bufo-600 hover:text-bufo-500 transition-colors">
          Home
        </Link>
        <Link to="/builder" className="text-bufo-600 hover:text-bufo-500 transition-colors">
          Builder
        </Link>
        <Link to="/about" className="text-bufo-600 hover:text-bufo-500 transition-colors">
          About
        </Link>
        <a 
          href="https://github.com/tfritzy/bufo.fun" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-bufo-600 hover:text-bufo-500 transition-colors"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}
