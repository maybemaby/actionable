import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { BiGitMerge } from "react-icons/bi";
import { Drawer } from "@components/Drawer/Drawer";
import { BsCodeSlash } from "react-icons/bs";
import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import styles from "./AppLayout.module.css";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

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
  const router = useRouter();

  useEffect(() => {
    buildJobs();
  }, [steps]);

  return (
    <>
      <Head>
        <title>Actionable</title>
        <meta
          name="description"
          content="Tool for generating Github Actions workflows."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={`${styles.appbar} ${styles.page}`}>
        <span className="row">
          <BiGitMerge size={35} />
          <h1>Actionable</h1>
        </span>
        <span className="row" style={{ gap: "40px" }}>
          {router.route.includes("tutorial") ? (
            <Link href="/">
              <a className="btn-primary">Back to Form</a>
            </Link>
          ) : (
            <Link href="/tutorial">
              <a className="btn-primary">Tutorial Mode</a>
            </Link>
          )}
          <Drawer position="right" buttonAs={<BsCodeSlash size={30} />}>
            <div className={styles.preview}>
              <DynamicYaml given={{ name, on, jobs }} />
            </div>
          </Drawer>
        </span>
      </header>
      <main className={styles.page}>{children}</main>
    </>
  );
};
