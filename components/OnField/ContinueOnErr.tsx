import styles from "./ContinueOnErr.module.css";
import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import { ChangeEvent } from "react";

interface ContinueOnErrProps {
  keyName: string;
  className?: string;
}

export const ContinueOnErr = ({ keyName, className }: ContinueOnErrProps) => {
  const store = useWorkflowStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    store.setContinueOnErr(keyName, e.target.checked);
  };

  return (
    <div className={`row ${className}`}>
      <label className={`small ${styles.label}`} htmlFor="continue-on-err">
        Continue on errors:
      </label>
      <input
        className={styles.checkbox}
        type="checkbox"
        id="continue-on-err"
        checked={store?.jobs?.[keyName]["continue-on-error"] ?? false}
        onChange={handleChange}
      />
    </div>
  );
};
