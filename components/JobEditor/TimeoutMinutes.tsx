import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import { ChangeEvent } from "react";

interface Props {
  className?: string;
  keyName: string;
}

export const TimeoutMinutes = ({ className, keyName }: Props) => {
  const store = useWorkflowStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.valueAsNumber) {
      store.setTimeoutMinutes(keyName, undefined);
    } else {
      store.setTimeoutMinutes(keyName, e.target.valueAsNumber);
    }
  };

  return (
    <div className={`row ${className}`}>
      <span>Timeout after:</span>
      <input
        type="number"
        min={"1"}
        placeholder={"360"}
        value={store?.jobs?.[keyName]["timeout-minutes"]}
        onChange={handleChange}
      />
      <span>Minutes</span>
    </div>
  );
};
