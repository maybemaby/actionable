import React from "react";
import { BiGitMerge } from "react-icons/bi";
import styles from "./AppLayout.module.css";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <>
      <header className={`${styles.appbar} ${styles.page}`}>
        <BiGitMerge size={35} />
        <h1>Actionable</h1>
      </header>
      <main className={styles.page}>{children}</main>
    </>
  );
};
