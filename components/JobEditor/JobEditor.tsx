import { MdDelete } from "react-icons/md";
import { Job } from "@lib/types/workflow";
import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import styles from "./JobEditor.module.css";

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
    </div>
  );
};
