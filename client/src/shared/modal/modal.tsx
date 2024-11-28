import React, { FC } from "react";
import ReactDOM from "react-dom";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { useTypedSelector } from "../../types";
const modalsContainer = document.querySelector("#modals") as HTMLElement;

interface IModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: FC<IModalProps> = ({ children, onClose }) => {
  const isFadingOut = useTypedSelector((state) => state.user.isFadingOut);

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
      <div className={`modal ${isFadingOut ? "fade-out" : ""}`}>{children}</div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalsContainer
  );
};

export default Modal;
