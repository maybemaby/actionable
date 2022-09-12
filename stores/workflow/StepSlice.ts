import { Step } from "@lib/types/workflow";
import { StateCreator } from "zustand";
import { WorkflowSlices } from "./WorkflowSlices";

type KeyedStep = Step & {
  jobKey: string;
};

export type StepSlice = {
  steps: KeyedStep[];
  createStep: (jobName: string, stepName: string) => void;
  removeStep: (jobName: string, stepName: string) => void;
  changeUses: (jobName: string, stepName: string, uses: string) => void;
  changeRun: (jobName: string, stepName: string, uses: string) => void;
  setStepSimpleKv: (
    jobName: string,
    stepName: string,
    key: keyof Step,
    value: string
  ) => void;
};

export const createStepSlice: StateCreator<
  WorkflowSlices,
  [["zustand/persist", unknown]],
  [],
  StepSlice
> = (set, get) => ({
  steps: [],
  createStep(jobName, stepName) {
    set((state) => {
      const newSteps = state.steps;
      return {
        ...state,
        steps: [...newSteps, { name: stepName, jobKey: jobName }],
      };
    });
  },
  removeStep(jobName, stepName) {
    set((state) => {
      const newSteps = state.steps.filter(
        (step) => step.name !== stepName && step.jobKey !== jobName
      );

      return {
        ...state,
        steps: newSteps,
      };
    });
  },
  changeUses(jobName, stepName, uses) {
    get().setStepSimpleKv(jobName, stepName, "uses", uses);
  },
  changeRun(jobName, stepName, run) {
    get().setStepSimpleKv(jobName, stepName, "run", run);
  },
  // Wrapper for setting simple string key values in steps
  setStepSimpleKv(jobName, stepName, key, value) {
    set((state) => {
      return {
        ...state,
        steps: state.steps.map((step) => {
          if (step.jobKey === jobName && step.name === stepName) {
            if (value.length > 0) {
              return { ...step, [key]: value };
            }
            return { ...step, [key]: undefined };
          }
          return { ...step };
        }),
      };
    });
  },
});
