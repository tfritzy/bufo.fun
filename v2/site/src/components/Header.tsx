import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="flex justify-between items-start w-full pb-2">
      <div className="flex flex-col">
        <h1 className="text-bufo-500 text-2xl font-semibold">bufo.fun</h1>
        <p className="text-bufo-300 text-sm">Quite a few bufos</p>
      </div>
      <nav className="flex gap-6 items-center pt-1">
        <Link to="/" className="text-gray-600 hover:text-bufo-500 transition-colors font-medium">
          Home
        </Link>
        <Link to="/builder" className="text-gray-600 hover:text-bufo-500 transition-colors font-medium">
          Builder
        </Link>
        <Link to="/about" className="text-gray-600 hover:text-bufo-500 transition-colors font-medium">
          About
        </Link>
        <a 
          href="https://github.com/tfritzy/bufo.fun" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-bufo-500 transition-colors font-medium"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}
