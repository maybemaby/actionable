import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import { FormEventHandler, useState } from "react";
import { IndividualStep } from "./IndividualStep";
import styles from "./StepsEditor.module.css";

interface Props {
  jobKey: string;
}

export const StepsEditor = ({ jobKey }: Props) => {
  const store = useWorkflowStore();
  const [stepName, setStepName] = useState("");

  const handleNewStep: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (stepName.length > 0) {
      store.createStep(jobKey, stepName);
      setStepName("");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Steps</div>
      <form className={styles.inputRow} onSubmit={handleNewStep}>
        <input
          type="text"
          className={styles.inputText}
          placeholder="Step Name"
          value={stepName}
          onChange={(e) => setStepName(e.target.value)}
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
