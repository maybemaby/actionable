import { KVWidget } from "@components/KVWidget/KVWidget";
import { Modal } from "@components/Modal/Modal";
import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import { useMemo, useState } from "react";
import styles from "./JobEditor.module.css";

export const JobWith = ({ keyName }: { keyName: string }) => {
  const [open, setOpen] = useState(false);
  const { setWith, getWith, jobs } = useWorkflowStore();
  const initWith = useMemo(() => {
    return getWith(keyName);
  }, [keyName, getWith, jobs]);

  return (
    <div className={`${styles.uses} ${styles.py2}`}>
      <Modal open={open} onClose={() => setOpen(false)}>
        {initWith ? (
          <KVWidget
            initial={initWith}
            onChange={(kv) => setWith(keyName, kv)}
          />
        ) : (
          <KVWidget onChange={(kv) => setWith(keyName, kv)} />
        )}
      </Modal>
      <label htmlFor="job-with">With Inputs:</label>
      <button
        className="btn-primary"
        id="job-with"
        name="job-with"
        onClick={() => setOpen(true)}
      >
        Set Inputs
      </button>
    </div>
  );
};
