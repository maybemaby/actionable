import { KVWidget } from "@components/KVWidget/KVWidget";
import { Modal } from "@components/Modal/Modal";
import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import { useMemo, useState } from "react";
import styles from "./JobEditor.module.css";

export const JobEnv = ({ keyName }: { keyName: string }) => {
  const { jobs, getEnv, setEnv } = useWorkflowStore();
  const [open, setOpen] = useState(false);
  const initEnv = useMemo(() => {
    return getEnv(keyName);
  }, [keyName, getEnv, jobs]);

  return (
    <div className={`${styles.uses} ${styles.py2}`}>
      <Modal open={open} onClose={() => setOpen(false)}>
        {initEnv ? (
          <KVWidget initial={initEnv} onChange={(kv) => setEnv(keyName, kv)} />
        ) : (
          <KVWidget onChange={(kv) => setEnv(keyName, kv)} />
        )}
      </Modal>
      <label htmlFor="job-env">Environment Variables:</label>
      <button
        className="btn-primary"
        id="job-with"
        name="job-with"
        onClick={() => setOpen(true)}
      >
        Set Variables
      </button>
    </div>
  );
};
