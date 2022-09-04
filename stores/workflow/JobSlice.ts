import { Job, RunsOnOptions } from "@lib/types/workflow";
import { StateCreator } from "zustand";
import { WorkflowSlices } from "./WorkflowSlices";

type SimpleKeyValues = "name" | "id";

export type JobsSlice = {
  jobs?: { [key: string]: Job };
  updateJobKeys: (names: string[]) => void;
  setJobValue: (name: string, key: SimpleKeyValues, value: string) => void;
  removeJob: (name: string) => void;
  setRunsOn: (name: string, selection: RunsOnOptions[] | RunsOnOptions) => void;
};

export const createJobsSlice: StateCreator<
  WorkflowSlices,
  [],
  [],
  JobsSlice
> = (set) => ({
  updateJobKeys(names) {
    set((state) => {
      if (names.length <= 0) {
        return {
          ...state,
          jobs: undefined,
        };
      }
      const newJobs = { ...state.jobs };
      for (let name of names) {
        newJobs[name] = newJobs[name] ?? {};
      }
      return {
        ...state,
        jobs: { ...newJobs },
      };
    });
  },
  removeJob(name: string) {
    set((state) => {
      const newJobs = { ...state.jobs };
      delete newJobs[name];
      return {
        ...state,
        jobs: newJobs,
      };
    });
  },
  setJobValue(name, key, value) {
    set((state) => {
      if (state.jobs?.[name]) {
        return {
          ...state,
          jobs: { ...state.jobs, [name]: { ...state.jobs[key], [key]: value } },
        };
      } else {
        return { ...state };
      }
    });
  },
  setRunsOn(name, selection) {
    set((state) => {
      if (state.jobs?.[name]) {
        return {
          ...state,
          jobs: {
            ...state.jobs,
            [name]: {
              ...state.jobs[name],
              "runs-on": selection,
            },
          },
        };
      } else {
        return { ...state };
      }
    });
  },
});
