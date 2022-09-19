import { useState, useMemo, Fragment } from "react";
import { Combobox } from "@headlessui/react";
import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import { MdExpandMore } from "react-icons/md";
import { BsCheck } from "react-icons/bs";
import type { SelectOption } from "@lib/constants";
import { triggerOptions } from "@lib/constants";
import { useHasHydrated } from "@hooks/useHasHydrated";
import styles from "./TriggerSelect.module.css";

interface Props {
  onChange?(events: SelectOption[]): void;
}

/**
 * TriggerSelect is a combobox component that allows user
 * to choose from events specified in constant triggerOptions.
 * State is synced with the global workflow store in the OnSlice.
 */
// Future consideration: Pass state in through props so the component is not as tightly tied to global state.
// Not much reason to use component outside of global state so maybe not necessary however.
export const TriggerSelect = ({ onChange }: Props) => {
  const hasHydrated = useHasHydrated();
  const { on, onEventArray, clearTriggers } = useWorkflowStore();
  const [selected, setSelected] = useState<SelectOption[]>(() => {
    if (!on || Object.keys(on).length <= 0) {
      return [];
    }
    const selections = [];
    for (let key of Object.keys(on)) {
      const opt = triggerOptions.find((o) => o.value === key);
      if (opt) {
        selections.push(opt);
      }
    }
    return selections;
  });

  // Selected events by name
  const onEvents = useMemo(() => {
    if (!on) {
      return [];
    }
    return Object.keys(on);
  }, [on]);

  // Combobox query state
  const [query, setQuery] = useState("");

  const filteredOptions = useMemo(() => {
    return query === ""
      ? triggerOptions
      : triggerOptions.filter((opt) =>
          opt.label.toLowerCase().includes(query.toLowerCase())
        );
  }, [query]);

  const handleUpdate = (update: SelectOption[]) => {
    if (onChange) onChange(update);
    if (update.length > 0) {
      onEventArray(update.map((o) => o.value));
      setSelected(update);
    } else if (hasHydrated && update.length === 0) {
      setSelected(update);
      clearTriggers();
    }
  };

  return (
    <Combobox
      value={selected}
      onChange={handleUpdate}
      multiple
      as={"div"}
      className={`${styles.container} combobox pop-in`}
    >
      <Combobox.Label>What events will trigger the workflow?</Combobox.Label>
      <div className={`combobox-input`}>
        <Combobox.Input
          name="events"
          className={styles.mainInput}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Events: ${onEvents.join(", ")}`}
        />
        <Combobox.Button>
          <MdExpandMore size={25} />
        </Combobox.Button>
      </div>
      <Combobox.Options className={`combobox-options`}>
        {filteredOptions.map((opt) => (
          <Combobox.Option key={opt.value} value={opt} as={Fragment}>
            {({ active, selected }) => {
              return (
                <li
                  className={`combobox-option ${
                    active ? "combobox-option-focus" : ""
                  }`}
                >
                  {selected && <BsCheck size={25} />}
                  {opt.label}
                </li>
              );
            }}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
};
