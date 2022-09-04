import React from "react";
import { BiGitMerge } from "react-icons/bi";
import { Drawer } from "@components/Drawer/Drawer";
import { BsCodeSlash } from "react-icons/bs";
import { YamlPreview } from "@components/YamlPreview/YamlPreview";
import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import styles from "./AppLayout.module.css";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { name, on, jobs } = useWorkflowStore();

  return (
    <>
      <header className={`${styles.appbar} ${styles.page}`}>
        <span className="row">
          <BiGitMerge size={35} />
          <h1>Actionable</h1>
        </span>
        <Drawer
          position="right"
          buttonAs={<BsCodeSlash size={30} />}
          buttonLabel={"Preview Workflow"}
        >
          <YamlPreview given={{ on, name, jobs }} />
        </Drawer>
      </header>
      <main className={styles.page}>{children}</main>
    </>
  );
};
