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
};

export const createOnSlice: StateCreator<WorkflowSlices, [], [], OnSlice> = (
  set
) => ({
  onEventArray(events) {
    set(() => {
      const update: { [key in TriggerEvent]?: TriggerConditions | null } = {};
      for (let event of events) {
        update[event] = null;
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
  addType(event: TriggerEvent, eventType: string) {
    set((state) => {
      if (
        state.on &&
        Object.keys(state.on).includes(event) &&
        !Array.isArray(state.on)
      ) {
        const newOn = { ...state.on };
        const existingTypes = newOn[event]?.types;
        if (existingTypes) {
          newOn[event] = {
            ...newOn[event],
            types: [...existingTypes, eventType],
          };
        } else {
          newOn[event] = { ...newOn[event], types: [eventType] };
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
      if (
        state.on &&
        Object.keys(state.on).includes(event) &&
        !Array.isArray(state.on)
      ) {
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
