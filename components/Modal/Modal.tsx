"use client";

import { MouseEvent, ReactNode } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

type Props = {
  children?: ReactNode;
  onClose: () => void;
};

export default function Modal({ children, onClose }: Props) {
  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body
  );
}
