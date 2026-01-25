import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`bg-bufo-400 text-white rounded-md border border-bufo-500 hover:bg-bufo-500 focus:outline-none focus:ring-2 focus:ring-bufo-200 transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
