import { useEffect } from "react";
import { createPortal } from "react-dom";

import { CloseIcon } from "helpers/icons";
import css from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) onClose();
  };

  return createPortal(
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        {children}
        <button
          type="button"
          onClick={() => onClose()}
          className={css["btn-close"]}
        >
          <CloseIcon size={24} />
        </button>
      </div>
    </div>,
    modalRoot
  );
};
