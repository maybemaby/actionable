import { StateCreator } from "zustand";
import { WorkflowSlices } from "./WorkflowSlices";
import {
  OnBlock,
  TriggerEvent,
  TriggerConditions,
  OnBlockFilter,
} from "@lib/types/workflow";

export type OnSlice = {
  on?: OnBlock;
  onEventArray: (events: TriggerEvent[]) => void;
  clearTriggers: () => void;
  setTypes: (event: TriggerEvent, eventTypes: string[]) => void;
};

export const createOnSlice: StateCreator<WorkflowSlices, [], [], OnSlice> = (
  set
) => ({
  onEventArray(events) {
    set((state) => {
      const update: { [key in TriggerEvent]?: TriggerConditions | null } = {};
      for (let event of events) {
        if ((state.on && !state.on[event]) || !state.on) {
          update[event] = null;
        } else if (state.on) {
          update[event] = state.on[event];
        }
      }

      return {
        on: update,
      };
    });
  },
  clearTriggers() {
    set(() => ({
      on: undefined,
    }));
  },
  setTypes(event: TriggerEvent, eventTypes: string[]) {
    set((state) => {
      if (eventTypes.length === 0 && state.on) {
        const newOn = { ...state.on };
        newOn[event] = null;
        return { on: newOn };
      }

      if (state.on && Object.keys(state.on).includes(event)) {
        const newOn = { ...state.on };
        const existingTypes = newOn[event]?.types;
        if (existingTypes) {
          if (existingTypes.length > eventTypes.length) {
            // Get a set of unique new types and existing types
            const union = new Set([...existingTypes, ...eventTypes]);
            newOn[event] = {
              ...newOn[event],
              types: Array.from(union),
            };
          } else {
            newOn[event] = {
              ...newOn[event],
              types: eventTypes,
            };
          }
        } else {
          newOn[event] = { ...newOn[event], types: [...eventTypes] };
        }
        return {
          on: newOn,
        };
      }
      return {
        ...state,
      };
    });
  },
  addFilter(event: TriggerEvent, filter: OnBlockFilter, inputs?: string[]) {
    set((state) => {
      if (state.on && Object.keys(state.on).includes(event)) {
        const newOn = { ...state.on };
        const existingFilter = newOn[event]?.[filter];
        if (typeof newOn[event]?.[filter] !== "undefined" && inputs) {
          // Ugly bunch of type assertions because typescript can't infer
          // Already asserted event is a key in newOn using Object.keys(state.on)
          (newOn[event] as TriggerConditions)[filter] = [
            ...((newOn[event] as TriggerConditions)[filter] as string[]),
            ...inputs,
          ];
          return {
            on: newOn,
          };
        } else {
          (newOn[event] as TriggerConditions)[filter] = [];
          if (inputs) {
            (newOn[event] as TriggerConditions)[filter] = [
              ...((newOn[event] as TriggerConditions)[filter] as string[]),
              ...inputs,
            ];
          }
          return {
            on: newOn,
          };
        }
      } else {
        return { ...state };
      }
    });
  },
});
