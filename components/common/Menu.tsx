import { Menu } from "@headlessui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import styles from "./Menu.module.css";

interface Props<T> {
  options: { label: string; value: T }[];
  onClick: ({ label, value }: { label: string; value: T }) => void;
}

export function BaseMenu<T>({ options, onClick }: Props<T>) {
  return (
    <Menu as="div" className={styles.menu}>
      <Menu.Button className={`icon-btn ${styles.btn}`}>
        <BsThreeDotsVertical size={25} />
      </Menu.Button>
      <Menu.Items className={styles.items}>
        {options.map((opt) => {
          return (
            <Menu.Item key={opt.label}>
              {({ active }) => {
                return (
                  <button
                    onClick={() => onClick(opt)}
                    className={`${active && styles.active} ${styles.item}`}
                    name={opt.label}
                  >
                    {opt.label}
                  </button>
                );
              }}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
}
