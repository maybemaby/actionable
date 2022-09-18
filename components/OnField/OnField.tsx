import { useMemo } from "react";
import { TriggerSelect } from "@components/TriggerSelect/TriggerSelect";
import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import { EventFilter } from "./EventFilter";

export const OnField = () => {
  const { on } = useWorkflowStore();
  const onEvents = useMemo(() => {
    if (!on) {
      return [];
    }
    return Object.keys(on);
  }, [on]);

  return (
    <>
      <TriggerSelect />

      {onEvents.length > 0 && (
        <section>
          <h3>Event Filtering</h3>
          <EventFilter />
        </section>
      )}
    </>
  );
};
