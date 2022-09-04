import { FormEvent, useState } from "react";
import { Job } from "@lib/types/workflow";
import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import { useEffect } from "react";
import { JobEditor } from "@components/JobEditor/JobEditor";
import styles from "./JobsField.module.css";

export const JobsField = () => {
  const store = useWorkflowStore();
  const [newInput, setNewInput] = useState("");
  const [jobKeys, setJobKeys] = useState<string[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newInput.length > 0) {
      setJobKeys([...jobKeys, newInput]);
      setNewInput("");
    }
  };

  useEffect(() => {
    store.updateJobKeys(jobKeys);
  }, [jobKeys]);

  useEffect(() => {
    if (store.jobs) setJobKeys(Object.keys(store.jobs));
  }, [store.jobs]);

  return (
    <section className={styles.field}>
      <h3 className={styles.header}>Jobs</h3>
      <label>Add a job</label>
      <form className={styles.create} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={newInput}
          onChange={(e) => setNewInput(e.currentTarget.value)}
        />
        <button className={`btn-primary`} type="submit">
          Create
        </button>
      </form>

      <ul className={styles.jobs}>
        {store.jobs &&
          jobKeys.map((key) => (
            <li key={key}>
              {store.jobs && store.jobs[key] && (
                <JobEditor job={store.jobs[key]} keyName={key} />
              )}
            </li>
          ))}
      </ul>
    </section>
  );
};
