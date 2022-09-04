import create from "zustand";
import type { Workflow } from "@lib/types";
import { createNameSlice } from "./NameSlice";
import { createOnSlice } from "./OnSlice";
import type { WorkflowSlices } from "./WorkflowSlices";
import { createJobsSlice } from "./JobSlice";

export const useWorkflowStore = create<WorkflowSlices>()((...a) => ({
  ...createNameSlice(...a),
  ...createOnSlice(...a),
  ...createJobsSlice(...a),
}));
