import { Fragment, useState, useMemo } from "react";
import { Listbox } from "@headlessui/react";
import { BsCheck } from "react-icons/bs";
import styles from "./EventFilter.module.css";
import { SelectOption } from "@lib/constants";
import { MdExpandMore } from "react-icons/md";
import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import { triggerOptions } from "@lib/constants";

export const EventFilter = () => {
  const { on, setTypes } = useWorkflowStore();

  const selectedEvents = useMemo<SelectOption[]>(() => {
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
  }, [on]);
  const [chosen, setChosen] = useState<SelectOption | null>(
    selectedEvents[0] ?? null
  );
  const [selectedTypes, setSelectedTypes] = useState<SelectOption["types"]>([]);
  const [selectedFilters, setSelectedFilters] = useState<
    SelectOption["filters"]
  >([]);

  const handleChange = (change: SelectOption) => {
    setChosen(change);
    setSelectedTypes([]);
    if (chosen && on?.[change.value]) {
      console.log("test", on?.[change.value]);
      setSelectedTypes(on[change.value]?.types);
    }
  };

  const handleTypesChange = (change: SelectOption["types"]) => {
    setSelectedTypes(change);
    if (chosen && change && selectedTypes && selectedTypes.length > 0) {
      setTypes(chosen.value, change);
    }
  };

  return (
    <div className={styles.container}>
      {/* Select an Event to add filters to */}
      <span className={styles.columnItem}>
        <strong className={styles.columnLabel}>Event</strong>
        <Listbox
          value={chosen}
          onChange={handleChange}
          as={"div"}
          className={"combobox pop-in"}
        >
          <Listbox.Button className={`listbox-input ${styles.colInput}`}>
            {chosen && chosen.label}
            <MdExpandMore size={30} />
          </Listbox.Button>
          <Listbox.Options className={"combobox-options"}>
            {selectedEvents.map((event) => (
              <Listbox.Option key={event.value} value={event} as={Fragment}>
                {({ active, selected }) => {
                  return (
                    <li
                      className={`combobox-option ${
                        active ? "combobox-option-focus" : ""
                      }`}
                    >
                      {selected && <BsCheck size={25} />}
                      {event.label}
                    </li>
                  );
                }}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </span>

      {/* If chosen event has available types to add, show a selector */}
      {chosen && chosen.types && (
        <span className={styles.columnItem}>
          <strong className={styles.columnLabel}>Types</strong>
          <Listbox
            value={selectedTypes}
            onChange={handleTypesChange}
            as={"div"}
            className={"combobox pop-in"}
            multiple
          >
            <Listbox.Button className={`listbox-input ${styles.colInput}`}>
              Types: {selectedTypes?.length ?? 0}
              <MdExpandMore size={30} />
            </Listbox.Button>
            <Listbox.Options className={"combobox-options"}>
              {chosen.types.map((type) => (
                <Listbox.Option key={type} value={type} as={Fragment}>
                  {({ active, selected }) => {
                    return (
                      <li
                        className={`combobox-option ${
                          active ? "combobox-option-focus" : ""
                        }`}
                      >
                        {selected && <BsCheck size={25} />}
                        {type}
                      </li>
                    );
                  }}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </span>
      )}

      {/* Show selector for filters if it has any */}
      {chosen && chosen.filters && (
        <span className={styles.columnItem}>
          <strong className={styles.columnLabel}>Filters</strong>
          <Listbox
            value={selectedFilters}
            onChange={setSelectedFilters}
            as={"div"}
            className={"combobox pop-in"}
            multiple
          >
            <Listbox.Button className={`listbox-input ${styles.colInput}`}>
              Filters {selectedFilters?.length ?? 0}
              <MdExpandMore size={30} />
            </Listbox.Button>
            <Listbox.Options className={"combobox-options"}>
              {chosen.filters.map((filter) => (
                <Listbox.Option key={filter} value={filter} as={Fragment}>
                  {({ active, selected }) => {
                    return (
                      <li
                        className={`combobox-option ${
                          active ? "combobox-option-focus" : ""
                        }`}
                      >
                        {selected && <BsCheck size={25} />}
                        {filter}
                      </li>
                    );
                  }}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </span>
      )}
    </div>
  );
};
