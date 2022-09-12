import create from "zustand";
import { persist } from "zustand/middleware";
import { createNameSlice } from "./NameSlice";
import { createOnSlice } from "./OnSlice";
import type { WorkflowSlices } from "./WorkflowSlices";
import { createJobsSlice } from "./JobSlice";
import { createStepSlice } from "./StepSlice";

export const useWorkflowStore = create<WorkflowSlices>()(
  persist(
    (...a) => ({
      ...createNameSlice(...a),
      ...createOnSlice(...a),
      ...createJobsSlice(...a),
      ...createStepSlice(...a),
    }),
    {
      name: "workflow-store",
      getStorage: () => sessionStorage,
    }
  )
);
