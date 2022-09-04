import { MdDelete } from "react-icons/md";
import { Job } from "@lib/types/workflow";
import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import { RunsOn } from "./RunsOn";
import styles from "./JobEditor.module.css";
import { ContinueOnErr } from "@components/OnField/ContinueOnErr";

export const JobEditor = ({ job, keyName }: { job: Job; keyName: string }) => {
  const store = useWorkflowStore();

  return (
    <div className={styles.container}>
      <div className={styles.titleBar}>
        <strong className={styles.keyname}>{keyName}</strong>
        <button
          className={`icon-btn ${styles.deleteBtn}`}
          onClick={() => store.removeJob(keyName)}
        >
          <MdDelete size={25} />
          Delete
        </button>
      </div>
      <ContinueOnErr className={styles.py4} keyName={keyName} />
      <RunsOn className={styles.py4} keyName={keyName} />
    </div>
  );
};
