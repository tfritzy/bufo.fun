import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  const isMobile = window.innerWidth < 640;

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 transition-colors duration-300 ${
        isOpen ? "bg-black/[0.13]" : "bg-black/0 pointer-events-none invisible"
      }`}
    >
      <div onClick={(e) => e.stopPropagation()} className={isOpen ? "" : "pointer-events-none"}>
        {isMobile ? (
          <div
            className={`fixed bottom-0 left-0 w-screen bg-white rounded transition-transform duration-300 ease-out ${
              isOpen ? "translate-y-0" : "translate-y-full"
            }`}
          >
            {children}
          </div>
        ) : (
          <div
            className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg drop-shadow-xl max-w-96 transition-all duration-300 ease-out ${
              isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
