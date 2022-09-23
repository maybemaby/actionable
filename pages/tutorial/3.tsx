import { JobUses } from "@components/JobEditor/JobUses";
import { RunsOn } from "@components/JobEditor/RunsOn";
import { TimeoutMinutes } from "@components/JobEditor/TimeoutMinutes";
import { JobIdForm } from "@components/JobsField/JobIdForm";
import { ContinueOnErr } from "@components/OnField/ContinueOnErr";
import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import { useState } from "react";
import { JobSelect } from "@components/JobSelect.tsx/JobSelect";
import styles from "./tutorial.module.css";

const JobStep = () => {
  const [jobId, setJobId] = useState("");
  const { removeJob } = useWorkflowStore();

  const handleRemove = () => {
    removeJob(jobId);
    setJobId("");
  };

  return (
    <div className={styles.page}>
      <h2>Create Jobs</h2>
      <p className={styles.description}>
        Workflows can have one or more <code>jobs</code>. Jobs are the automated
        actions you setup to respond to events. Detailed documentation on jobs
        can be found{" "}
        <a
          href="https://docs.github.com/en/actions/using-jobs/using-jobs-in-a-workflow"
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>
        .
      </p>
      <p className={styles.description}>
        Jobs start with an id that can be used to identify it and refererence it
        in other jobs.
      </p>
      <JobIdForm onSubmit={(id) => setJobId(id)} />
      <JobSelect onChange={(v) => setJobId(v)} />
      {jobId && (
        <>
          <div className={styles.idBar}>
            <h3>{jobId}</h3>
            <button className="btn-primary" onClick={handleRemove}>
              Delete
            </button>
          </div>
          <p className={styles.description}>
            Jobs can run on a variety of operating systems provided by Github
            specified in the <code>runs-on</code> parameter. More advanced use
            cases can specify self-hosted runners.
          </p>
          <RunsOn keyName={jobId} />
          <p className={styles.description}>
            To handle unexpected situations, you can specify{" "}
            <code>continues-on-error</code> (default: false) and{" "}
            <code>timeout-minutes</code> (default: 360).
          </p>
          <div className={styles.row}>
            <ContinueOnErr keyName={jobId} />
            <TimeoutMinutes keyName={jobId} />
          </div>
          <p className={styles.description}>
            Jobs can use pre-existing workflows as the base for their steps
            specified in the <code>uses</code> parameter. These workflows can do
            things like downloading common programming language requirements,
            cache workflow artifacts, or checking out a Github repository.
            Github has a marketplace for actions{" "}
            <a
              href="https://github.com/marketplace?category=&query=sort%3Apopularity-desc&type=actions&verification="
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
            .
          </p>
          <div>
            <JobUses jobKey={jobId} />
          </div>
        </>
      )}
    </div>
  );
};

export default JobStep;
