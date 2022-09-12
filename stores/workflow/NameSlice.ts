import { StateCreator } from "zustand";
import { WorkflowSlices } from "./WorkflowSlices";

export interface NameSlice {
  name: string | null;
  changeName: (name: string) => void;
}

export const createNameSlice: StateCreator<
  WorkflowSlices,
  [["zustand/persist", unknown]],
  [],
  NameSlice
> = (set) => ({
  name: null,
  changeName(name) {
    set((state) => ({
      name,
    }));
  },
});
