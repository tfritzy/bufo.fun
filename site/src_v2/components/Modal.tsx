import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  const isMobile = window.innerWidth < 640;

  return (
    <div
      onClick={onClose}
      className="fixed left-0 top-0 w-full h-full bg-[#00000022] z-50"
    >
      <div onClick={(e) => e.stopPropagation()}>
        {isMobile ? (
          <div className="fixed bottom-0 left-0 w-screen transform bg-white rounded">
            {children}
          </div>
        ) : (
          <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg drop-shadow-xl max-w-96">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
