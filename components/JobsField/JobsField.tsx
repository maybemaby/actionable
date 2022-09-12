import { FormEvent, useMemo, useState, useId } from "react";
import { Job } from "@lib/types/workflow";
import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import { useEffect } from "react";
import { JobEditor } from "@components/JobEditor/JobEditor";
import styles from "./JobsField.module.css";

export const JobsField = () => {
  const store = useWorkflowStore();
  const [newInput, setNewInput] = useState("");
  const jobKeys = useMemo(() => {
    return Object.keys(store.jobs ?? {});
  }, [store.jobs]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newInput.length > 0) {
      setNewInput("");
      store.updateJobKeys([...jobKeys, newInput.trim()]);
    }
  };

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
          jobKeys &&
          jobKeys.map((key, idx) => (
            <>
              <li key={`${key}-${idx}`}>
                {store.jobs && store.jobs[key] && (
                  <JobEditor job={store.jobs[key]} keyName={key} />
                )}
              </li>
              <hr />
            </>
          ))}
      </ul>
    </section>
  );
};
