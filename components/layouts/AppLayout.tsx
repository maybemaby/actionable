import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { BiGitMerge } from "react-icons/bi";
import { Drawer } from "@components/Drawer/Drawer";
import { BsCodeSlash } from "react-icons/bs";
import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import styles from "./AppLayout.module.css";

// Dynamically load the YamlPreview since it's not vital on first load.
const DynamicYaml = dynamic(
  () =>
    import("../../components/YamlPreview/YamlPreview").then(
      (mod) => mod.YamlPreview
    ),
  {
    ssr: false,
    loading: () => <pre>Loading</pre>,
  }
);

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { name, on, jobs, steps, buildJobs } = useWorkflowStore();

  useEffect(() => {
    buildJobs();
  }, [steps]);

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
          <div className={styles.preview}>
            <DynamicYaml given={{ name, on, jobs }} />
          </div>
        </Drawer>
      </header>
      <main className={styles.page}>{children}</main>
    </>
  );
};
