import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="flex justify-between items-start w-full">
      <div className="flex flex-col">
        <h1 className="text-[#6B7456] text-2xl font-normal">bufo.fun</h1>
        <p className="text-[#9CA383] text-sm">Quite a few bufos</p>
      </div>
      <nav className="flex gap-6 items-center">
        <Link to="/" className="text-gray-800 hover:text-black transition-colors">
          Home
        </Link>
        <Link to="/builder" className="text-gray-800 hover:text-black transition-colors">
          Builder
        </Link>
        <Link to="/about" className="text-gray-800 hover:text-black transition-colors">
          About
        </Link>
        <a 
          href="https://github.com/tfritzy/bufo.fun" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-800 hover:text-black transition-colors"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}
