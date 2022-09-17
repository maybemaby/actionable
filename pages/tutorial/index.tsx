import { NextPage } from "next";
import Link from "next/link";
import styles from "./tutorial.module.css";

const TutorialPage: NextPage = () => {
  return (
    <div className={styles.page}>
      <h2>Tutorial Mode</h2>
      <p
        style={{
          textAlign: "center",
          marginBottom: "50px",
          maxWidth: "600px",
          fontSize: "1.3rem",
        }}
      >
        Here we&apos;ll walk you through step by step creating a Github Actions
        workflow and explain what each part does.
      </p>
      <div className={styles.row}>
        <Link href={"/tutorial/1"}>
          <a className={`btn-primary ${styles.start}`}>Start</a>
        </Link>
        <Link href={"/"}>
          <a className={`btn-secondary ${styles.secondary}`}>
            I don&apos;t need any explanation
          </a>
        </Link>
      </div>
    </div>
  );
};

export default TutorialPage;
