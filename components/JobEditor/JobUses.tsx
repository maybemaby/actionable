import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import { ChangeEvent, useState } from "react";
import styles from "./JobEditor.module.css";

export const JobUses = ({ jobKey }: { jobKey: string }) => {
  const { setUses } = useWorkflowStore();
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setValue(input);
    if (input.length > 0) {
      setUses(jobKey, input);
    } else {
      setUses(jobKey, undefined);
    }
  };

  return (
    <div className={`row ${styles.uses}`}>
      <label htmlFor={`${jobKey}-uses`}>Job Uses:</label>
      <input
        id={`${jobKey}-uses`}
        type="text"
        placeholder="Enter Workflow Name"
        value={value}
        onChange={handleChange}
      ></input>
    </div>
  );
};