import { MdDelete } from "react-icons/md";
import { Job } from "@lib/types/workflow";
import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import { RunsOn } from "./RunsOn";
import styles from "./JobEditor.module.css";
import { ContinueOnErr } from "@components/OnField/ContinueOnErr";
import { TimeoutMinutes } from "./TimeoutMinutes";
import { StepsEditor } from "@components/StepsEditor/StepsEditor";
import { JobUses } from "./JobUses";
import { JobWith } from "./JobWith";

export const JobEditor = ({ keyName }: { job: Job; keyName: string }) => {
  const { removeJob } = useWorkflowStore();

  return (
    <div className={styles.container}>
      <div className={styles.titleBar}>
        <strong className={styles.keyname}>{keyName}</strong>
        <button
          className={`icon-btn ${styles.deleteBtn}`}
          onClick={() => removeJob(keyName)}
        >
          <MdDelete size={25} />
          Delete
        </button>
      </div>
      <div className={styles.editing}>
        <div className={`row gap-20 ${styles.py4} ${styles.forceCol}`}>
          <ContinueOnErr keyName={keyName} />
          <TimeoutMinutes keyName={keyName} />
        </div>
        <RunsOn className={styles.py6} keyName={keyName} />
        <JobUses jobKey={keyName} />
        <JobWith keyName={keyName} />
        <StepsEditor jobKey={keyName} />
      </div>
    </div>
  );
};
