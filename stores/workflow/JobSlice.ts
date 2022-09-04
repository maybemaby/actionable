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
  setContinueOnErr: (name: string, value: boolean) => void;
  setTimeoutMinutes: (name: string, value?: number) => void;
};

export const createJobsSlice: StateCreator<
  WorkflowSlices,
  [],
  [],
  JobsSlice
> = (set) => ({
  // adds new keys on top of existing keys
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
  // removes key from state.jobs
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
  // For keys within state.jobs that only require a simple key e.g name and id
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
  // Just sets jobs.[jobname]."runs-on" with selection
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
  setContinueOnErr(name, val) {
    set((state) => {
      if (state.jobs?.[name]) {
        return {
          ...state,
          jobs: {
            ...state.jobs,
            [name]: {
              ...state.jobs[name],
              // Set undefined instead of false since that will hide the key entirely
              "continue-on-error": val === true ? true : undefined,
            },
          },
        };
      } else {
        return { ...state };
      }
    });
  },
  setTimeoutMinutes(name, value) {
    set((state) => {
      if (state.jobs?.[name]) {
        return {
          ...state,
          jobs: {
            ...state.jobs,
            [name]: {
              ...state.jobs[name],
              "timeout-miutes": value,
            },
          },
        };
      } else {
        return { ...state };
      }
    });
  },
});
