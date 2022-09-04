import { Popover } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import { Portal } from "@components/Portal/Portal";
import styles from "./Drawer.module.css";
import { Fragment, ReactNode } from "react";
import { Transition } from "@headlessui/react";

const posMap = {
  right: styles.right,
  left: styles.left,
  top: styles.top,
  bottom: styles.bottom,
};

interface DrawerProps {
  position: "top" | "right" | "bottom" | "left";
  children: ReactNode;
}

export const Drawer = ({ position, children }: DrawerProps) => {
  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button>Open</Popover.Button>
          {open && (
            <Portal
              className={styles.overlay}
              target={document.body}
              lockBodyScroll={true}
            >
              <Popover.Panel
                className={`${styles.container} ${posMap[position]}`}
                focus
              >
                <Popover.Button className={styles.closeBtn} tabIndex={1}>
                  <AiOutlineClose size={30} />
                </Popover.Button>
                {children}
              </Popover.Panel>
            </Portal>
          )}
        </>
      )}
    </Popover>
  );
};
