import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import { Modal } from "@components/Modal/Modal";
import styles from "./IndividualStep.module.css";
import { useMemo, useState } from "react";
import { KVWidget } from "@components/KVWidget/KVWidget";

interface Props {
  jobKey: string;
  stepName: string;
}

export const IndividualStep = ({ stepName, jobKey }: Props) => {
  const [withModalOpen, setWithModalOpen] = useState(false);
  const [envModalOpen, setEnvModalOpen] = useState(false);
  const store = useWorkflowStore();

  const initWith = useMemo(() => {
    const step = store.steps.find(
      (step) => step.name === stepName && step.jobKey === jobKey
    );
    return step?.with;
  }, [jobKey, stepName, store.steps]);

  const initEnv = useMemo(() => {
    const step = store.steps.find(
      (step) => step.name === stepName && step.jobKey === jobKey
    );
    return step?.env;
  }, [jobKey, stepName, store.steps]);

  const step = store.steps.find(
    (step) => step.name === stepName && step.jobKey === jobKey
  );

  const handleDelete = () => {
    store.removeStep(jobKey, stepName);
  };

  const onWithUpdate = (kv: Record<string, string>) => {
    store.changeWith(jobKey, stepName, kv);
  };

  const onEnvUpdate = (kv: Record<string, string>) => {
    store.changeEnv(jobKey, stepName, kv);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {stepName}
        <button className="btn-secondary" onClick={() => handleDelete()}>
          Delete
        </button>
      </div>
      <div className={styles.twoCol}>
        <div className={styles.label}>
          Pre-existing workflow to use (Optional)
        </div>
        <input
          type="text"
          value={step?.uses ?? ""}
          onChange={(e) => store.changeUses(jobKey, stepName, e.target.value)}
          placeholder="Example: actions/checkout@v3"
        ></input>
      </div>
      <div className={styles.twoCol}>
        <div className={styles.label}>Run Command (Optional)</div>
        <input
          type="text"
          value={step?.run ?? ""}
          onChange={(e) => store.changeRun(jobKey, stepName, e.target.value)}
          placeholder="Example: npm run test"
        ></input>
      </div>
      <div className={styles.twoCol}>
        <div className={styles.label}>With inputs:</div>
        <button
          className={styles.fillBtn}
          onClick={() => setWithModalOpen(true)}
        >
          Set
        </button>
        <Modal
          title={`${jobKey} - ${stepName}: with`}
          open={withModalOpen}
          onClose={() => setWithModalOpen(false)}
        >
          <div className={styles.kvWidget}>
            <KVWidget onChange={onWithUpdate} initial={initWith} />
          </div>
        </Modal>
      </div>
      <div className={styles.twoCol}>
        <div className={styles.label}>Env variables:</div>
        <button
          className={styles.fillBtn}
          onClick={() => setEnvModalOpen(true)}
        >
          Set
        </button>
        <Modal
          title={`${jobKey} - ${stepName}: with`}
          open={envModalOpen}
          onClose={() => setEnvModalOpen(false)}
        >
          <div className={styles.kvWidget}>
            <KVWidget onChange={onEnvUpdate} initial={initEnv} />
          </div>
        </Modal>
      </div>
    </div>
  );
};
