import { useMemo, Fragment } from "react";
import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import { JobEditor } from "@components/JobEditor/JobEditor";
import styles from "./JobsField.module.css";
import { JobIdForm } from "./JobIdForm";

export const JobsField = () => {
  const { jobs } = useWorkflowStore();
  const jobKeys = useMemo(() => {
    return Object.keys(jobs ?? {});
  }, [jobs]);

  return (
    <section className={styles.field}>
      <h3 className={styles.header}>Jobs</h3>
      <label>Add a job</label>
      <JobIdForm />

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
