import { Popover } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { Portal } from "@components/Portal/Portal";
import styles from "./Drawer.module.css";
import { ReactNode } from "react";

// Map keys from props.position to styles
const posMap = {
  right: styles.right,
  left: styles.left,
  top: styles.top,
  bottom: styles.bottom,
};

interface DrawerProps {
  position: "top" | "right" | "bottom" | "left";
  children: ReactNode;
  // Optionally replace how the button is rendered. Default to hamburger icon
  buttonAs?: ReactNode;
  // Optionally add a different label to bottom of the open button icon.
  buttonLabel?: string;
}

export const Drawer = ({
  position,
  children,
  buttonAs,
  buttonLabel,
}: DrawerProps) => {
  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button className={styles.openBtn} data-label={buttonLabel}>
            {buttonAs ?? <GiHamburgerMenu size={30} />}
          </Popover.Button>
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
