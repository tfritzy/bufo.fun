import { Link } from "react-router-dom";

interface BuilderHeaderProps {
  backUrl: string;
}

export function BuilderHeader({ backUrl }: BuilderHeaderProps) {
  return (
    <header className="w-full bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold tracking-tight text-gray-800">
        bufo.fun
      </Link>
      <Link
        to={backUrl}
        className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
        title="Close"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </Link>
    </header>
  );
}
