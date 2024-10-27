import React, { FC } from "react";
import ReactDOM from "react-dom";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
const modalsContainer = document.querySelector("#modals") as HTMLElement;

interface IModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: FC<IModalProps> = ({ children, onClose }) => {
  React.useEffect(() => {
    document.addEventListener("keydown", handleEscKeydown);
    return () => {
      document.removeEventListener("keydown", handleEscKeydown);
    };
  }, []);

  React.useEffect(() => {
    const darkTheme = "dark-theme";
    const currentTheme = localStorage.getItem("selected-theme");
    if (currentTheme === "dark") {
      document.querySelector(".modal")?.classList.add(darkTheme);
    }
  }, []);

  const handleEscKeydown = (e: { key: string }) => {
    e.key === "Escape" && onClose();
  };

  return ReactDOM.createPortal(
    <>
      <div className={`modal`}>
        <div className={`modal__button_type_close`}>
          {/* <CloseIcon type="primary" onClick={onClose} /> */}
          <i className="eva-close" onClick={onClose} />
        </div>
        {children}
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalsContainer
  );
};

export default Modal;
