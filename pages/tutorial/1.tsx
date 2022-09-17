import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import Link from "next/link";
import styles from "./tutorial.module.css";

const NameStep = () => {
  const { name, changeName } = useWorkflowStore();

  return (
    <div className={styles.page}>
      <h2>Name your workflow</h2>
      <input
        id="name"
        type="text"
        placeholder="Enter a name for your workflow"
        value={name ?? ""}
        onChange={(e) => changeName(e.currentTarget.value)}
      />
      {name ? (
        <Link href={"/tutorial/2"}>
          <a className={`btn-primary ${styles.start} ${styles.spaced}`}>Next</a>
        </Link>
      ) : (
        <button
          className={`btn-primary ${styles.start} ${styles.spaced}`}
          disabled
        >
          Next
        </button>
      )}
    </div>
  );
};

export default NameStep;
