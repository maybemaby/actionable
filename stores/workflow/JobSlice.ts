import { Job, RunsOnOptions } from "@lib/types/workflow";
import { StateCreator } from "zustand";
import { WorkflowSlices } from "./WorkflowSlices";

type SimpleKeyValues = "name" | "id";

export type JobsSlice = {
  jobs?: { [key: string]: Job };
  updateJobKeys: (names: string[]) => void;
  setJobValue: (name: string, key: SimpleKeyValues, value: string) => void;
  removeJob: (name: string) => void;
  setUses: (name: string, value?: string[]) => void;
  getUses: (name: string) => string[] | undefined;
  setWith: (name: string, kv: Record<string, string>) => void;
  getWith: (name: string) => Record<string, string> | undefined;
  getEnv: (name: string) => Record<string, string> | undefined;
  setEnv: (name: string, kv: Record<string,string>) => void;
  setRunsOn: (name: string, selection: RunsOnOptions[] | RunsOnOptions) => void;
  setContinueOnErr: (name: string, value: boolean) => void;
  setTimeoutMinutes: (name: string, value?: number) => void;
  buildJobs: () => void;
};

export const createJobsSlice: StateCreator<
  WorkflowSlices,
  [["zustand/persist", unknown]],
  [],
  JobsSlice
> = (set, get) => ({
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
  setUses(name, value) {
    set((state) => {
      if (state.jobs?.[name]) {
        return {
          ...state,
          jobs: {
            ...state.jobs,
            [name]: {
              ...state.jobs[name],
              uses: value,
            },
          },
        };
      }
      return {
        ...state,
      };
    });
  },
  getUses(name) {
      return get().jobs?.[name].uses;
  },
  setWith(name: string, kv: Record<string, string>) {
    set((state) => {
      if (state.jobs?.[name]) {
        return {
          ...state,
          jobs: {
            ...state.jobs,
            [name]: {
              ...state.jobs[name],
              with: kv,
            },
          },
        };
      }
      return { ...state };
    });
  },
  getWith(name) {
    return get().jobs?.[name].with;
  },
  getEnv(name) {
      return get().jobs?.[name].env;
  },
  setEnv(name, kv) {
    set((state) => {
      if (state.jobs?.[name]) {
        return {
          ...state,
          jobs: {
            ...state.jobs,
            [name]: {
              ...state.jobs[name],
              env: kv,
            },
          },
        };
      }
      return { ...state };
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
  buildJobs() {
    set((state) => {
      const newState = { ...state };
      if (newState.jobs) {
        for (let job of Object.keys(newState.jobs)) {
          // For each job in state.jobs, find all steps in state.steps that have that jobKey
          // Remove the step.jobKey property and assign to job.
          newState.jobs[job].steps = state.steps
            .filter((step) => step.jobKey === job)
            .map(({ jobKey, ...step }) => step);
        }
      }
      return {
        ...newState,
      };
    });
  },
});
