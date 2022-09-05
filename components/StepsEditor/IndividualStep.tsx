import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import styles from "./IndividualStep.module.css";

interface Props {
  jobKey: string;
  stepName: string;
}

export const IndividualStep = ({ stepName, jobKey }: Props) => {
  const store = useWorkflowStore();

  const step = store.steps.find(
    (step) => step.name === stepName && step.jobKey === jobKey
  );

  const handleDelete = () => {
    store.removeStep(jobKey, stepName);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>{stepName}</div>
      <div className={styles.twoCol}>
        <label>Uses</label>
        <input
          type="text"
          value={step?.uses ?? ""}
          onChange={(e) => store.changeUses(jobKey, stepName, e.target.value)}
        ></input>
      </div>
    </div>
  );
};
