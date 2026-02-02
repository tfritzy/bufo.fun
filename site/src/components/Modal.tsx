import { ReactNode, useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/[0.13]"
    >
      <div onClick={(e) => e.stopPropagation()}>
        {isMobile ? (
          <div className="fixed bottom-0 left-0 w-screen bg-white rounded">
            {children}
          </div>
        ) : (
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg drop-shadow-xl max-w-96">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
