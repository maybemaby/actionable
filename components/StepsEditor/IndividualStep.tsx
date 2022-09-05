import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import styles from "./IndividualStep.module.css";

interface Props {
  stepName: string;
}

export const IndividualStep = ({ stepName }: Props) => {
  const store = useWorkflowStore();

  return (
    <div className={styles.container}>
      <div className={styles.header}>{stepName}</div>
    </div>
  );
};
