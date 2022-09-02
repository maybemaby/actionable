import { TriggerEvent } from "@lib/types";
import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import { useEffect } from "react";
import { ChangeEvent, useState } from "react";

export const OnField = () => {
  const store = useWorkflowStore();
  const [selected, setSelected] = useState<TriggerEvent[]>([]);

  useEffect(() => {
    if (selected.length > 0) {
      store.onEventArray(selected);
    } else {
      store.clearTriggers();
    }
  }, [selected]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selectedOpts = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedOpts.push(options[i].value);
      }
      setSelected(selectedOpts as TriggerEvent[]);
    }
  };

  return (
    <select multiple onChange={handleChange}>
      <option value={"push"}>Push</option>
      <option value={"pull"}>Pull</option>
    </select>
  );
};
