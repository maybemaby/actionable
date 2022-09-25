import { Job } from "@lib/types/workflow";
import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import { RunsOn } from "./RunsOn";
import styles from "./JobEditor.module.css";
import { ContinueOnErr } from "@components/OnField/ContinueOnErr";
import { TimeoutMinutes } from "./TimeoutMinutes";
import { StepsEditor } from "@components/StepsEditor/StepsEditor";
import { JobUses } from "./JobUses";
import { JobWith } from "./JobWith";
import { JobEnv } from "./JobEnv";
import { BaseMenu } from "@components/common/Menu";
import { useMemo } from "react";

export const JobEditor = ({ keyName }: { job: Job; keyName: string }) => {
  const { removeJob } = useWorkflowStore();

  const menuOptions = useMemo(
    () => [
      { label: "Delete", value: keyName },
      { label: "Rename", value: keyName },
    ],
    [keyName]
  );

  const onClick = ({ label, value }: { label: string; value: string }) => {
    switch (label) {
      case "Delete":
        removeJob(value);
        break;
      default:
        console.log("Invalid Selection");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleBar}>
        <strong className={styles.keyname}>{keyName}</strong>
        <BaseMenu options={menuOptions} onClick={onClick} />
      </div>
      <div className={styles.editing}>
        <div className={`row gap-20 ${styles.py4} ${styles.forceCol}`}>
          <ContinueOnErr keyName={keyName} />
          <TimeoutMinutes keyName={keyName} />
        </div>
        <RunsOn className={styles.py6} keyName={keyName} />
        <JobUses jobKey={keyName} />
        <JobWith keyName={keyName} />
        <JobEnv keyName={keyName} />
        <StepsEditor jobKey={keyName} />
      </div>
    </div>
  );
};
