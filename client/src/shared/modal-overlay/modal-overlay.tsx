import { FC } from "react";
import { useTypedDispatch, useTypedSelector } from "../../types";
import { setIsFadingOut } from "../../store/reducers/userReducer";

interface IModalOverlayProps {
  onClick: () => void;
}

export const ModalOverlay: FC<IModalOverlayProps> = ({ onClick }) => {
  const dispatch = useTypedDispatch();
  const isFadingOut = useTypedSelector((state) => state.user.isFadingOut);

  const handleClose = () => {
    dispatch(setIsFadingOut(true));
    setTimeout(() => {
      onClick();
      dispatch(setIsFadingOut(false));
    }, 300);
  };

  return (
    <div
      className={`overlay ${isFadingOut ? "fade-out" : ""}`}
      onClick={handleClose}
    />
  );
};
