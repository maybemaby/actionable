import { FormEvent, useState, useMemo } from "react";
import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import styles from "./JobsField.module.css";

interface Props {
  onSubmit?(id: string): void;
}

export const JobIdForm = ({ onSubmit }: Props) => {
  const { jobs, updateJobKeys } = useWorkflowStore();
  const [newInput, setNewInput] = useState("");
  const jobKeys = useMemo(() => {
    return Object.keys(jobs ?? {});
  }, [jobs]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newInput.length > 0) {
      setNewInput("");
      updateJobKeys([...jobKeys, newInput.trim()]);
      if (onSubmit) onSubmit(newInput.trim());
    }
  };

  return (
    <form className={styles.create} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter new Job ID"
        value={newInput}
        onChange={(e) => setNewInput(e.currentTarget.value)}
      />
      <button className={`btn-primary`} type="submit">
        Create
      </button>
    </form>
  );
};
