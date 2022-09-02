import { StateCreator } from "zustand";
import { WorkflowSlices } from "./WorkflowSlices";
import { OnBlock, TriggerEvent, Workflow } from "@lib/types/workflow";

export type OnSlice = {
  on: OnBlock | null;
  onEventArray: (events: TriggerEvent[]) => void;
};

export const createOnSlice: StateCreator<WorkflowSlices, [], [], OnSlice> = (
  set
) => ({
  onEventArray(events) {
    set(() => ({
      on: events,
    }));
  },
  on: null,
});
