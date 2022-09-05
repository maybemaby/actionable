import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import { FormEventHandler } from "react";
import { IndividualStep } from "./IndividualStep";
import styles from "./StepsEditor.module.css";

interface Props {
  jobKey: string;
}

export const StepsEditor = ({ jobKey }: Props) => {
  const store = useWorkflowStore();

  const handleNewStep: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Steps</div>
      <form className={styles.inputRow} onSubmit={handleNewStep}>
        <input
          type="text"
          className={styles.inputText}
          placeholder="Step Name"
        />
        <button type="submit" className={styles.inputSubmit}>
          Add Step
        </button>
      </form>
      <div>
        {typeof store?.jobs?.[jobKey]?.steps !== "undefined" &&
          store.jobs[jobKey].steps?.map((step) => {
            return <IndividualStep key={step.name} stepName={step.name} />;
          })}
      </div>
    </div>
  );
};
