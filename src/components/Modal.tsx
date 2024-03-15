import React from "react";

const DesktopModal = (props: ModalProps) => {
  return (
    <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg ">
      <div className="">{props.children}</div>
    </div>
  );
};

const MobileModal = (props: ModalProps) => {
  return (
    <div className="fixed bottom-0 left-0 w-screen transform bg-white rounded">
      <div className="">{props.children}</div>
    </div>
  );
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal = (props: ModalProps) => {
  const isMobile = window.innerWidth < 640;

  return (
    <div className="absolute left-0 w-screen h-screen bg-[#00000033]">
      {isMobile ? <MobileModal {...props} /> : <DesktopModal {...props} />}
    </div>
  );
};
