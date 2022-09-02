import { useWorkflowStore } from "./WorkflowStore";
import actualCreate from "zustand";

describe("Workflow Store", () => {
  describe("NameSlice Tests", () => {
    const store = useWorkflowStore();
    const init = store.name;
    store.changeName("Barry");
    const final = store.name;

    expect(init).toBeNull();
    expect(final).toEqual("Barry");
  });
});
