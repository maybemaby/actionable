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
};

export const createStepSlice: StateCreator<
  WorkflowSlices,
  [],
  [],
  StepSlice
> = (set) => ({
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
    set((state) => {
      return {
        ...state,
        steps: state.steps.map((step) => {
          if (step.jobKey === jobName && step.name === stepName) {
            if (uses.length > 0) {
              return { ...step, uses: uses };
            }
            return { ...step, uses: undefined };
          }
          return { ...step };
        }),
      };
    });
  },
});
