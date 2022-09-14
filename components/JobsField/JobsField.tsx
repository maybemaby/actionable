import { FormEvent, useMemo, useState, useId, Fragment } from "react";
import { Job } from "@lib/types/workflow";
import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import { useEffect } from "react";
import { JobEditor } from "@components/JobEditor/JobEditor";
import styles from "./JobsField.module.css";

export const JobsField = () => {
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
        {jobs &&
          jobKeys &&
          jobKeys.map((key, idx) => (
            <Fragment key={`${key}-${idx}`}>
              <li>
                {jobs && jobs[key] && (
                  <JobEditor job={jobs[key]} keyName={key} />
                )}
              </li>
              <hr />
            </Fragment>
          ))}
      </ul>
    </section>
  );
};
