import { FC } from "react";

interface IModalOverlayProps {
  onClick: () => void;
}

export const ModalOverlay: FC<IModalOverlayProps> = ({ onClick }) => {
  return <div className={`overlay`} onClick={onClick} />;
};
