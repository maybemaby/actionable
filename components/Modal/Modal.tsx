import { Dialog } from "@headlessui/react";
import { createContext, ReactNode } from "react";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./Modal.module.css";

interface ModalProps {
  open: boolean;
  onClose(): void;
  children?: ReactNode;
  className?: string;
  title?: string;
}

interface ModalStore {
  open: boolean;
  onClose(): void;
}

export const Modal = ({
  open,
  onClose,
  title,
  children,
  className,
}: ModalProps) => {
  return (
    <Dialog open={open} onClose={() => onClose()}>
      <div id="modal-backdrop" className={styles.backdrop}>
        <Dialog.Panel className={`${className} ${styles.panel}`}>
          {title && (
            <Dialog.Title className={styles.title}>{title}</Dialog.Title>
          )}
          <button onClick={() => onClose()} className={styles.closeBtn}>
            <AiOutlineClose size={30} />
          </button>
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
