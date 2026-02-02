import { ReactNode, useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const TRANSITION_DURATION = 150;

export function Modal({ isOpen, onClose, children }: ModalProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), TRANSITION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 transition-colors duration-150 ${
        isOpen ? "bg-black/[0.13]" : "bg-black/0 pointer-events-none"
      }`}
    >
      <div onClick={(e) => e.stopPropagation()} className={isOpen ? "" : "pointer-events-none"}>
        {isMobile ? (
          <div
            className={`fixed bottom-0 left-0 w-screen bg-white rounded transition-transform duration-150 ease-out ${
              isOpen ? "translate-y-0" : "translate-y-full"
            }`}
          >
            {children}
          </div>
        ) : (
          <div
            className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg drop-shadow-xl max-w-96 transition-opacity duration-150 ease-out ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
