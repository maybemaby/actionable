import { Fragment, useState } from "react";
import { Listbox } from "@headlessui/react";
import { BsCheck } from "react-icons/bs";
import styles from "./EventFilter.module.css";
import { SelectOption } from "./OnField";
import { MdExpandMore } from "react-icons/md";
import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import { useEffect } from "react";

interface EventFilterProps {
  selectedEvents: SelectOption[];
}

export const EventFilter = ({ selectedEvents }: EventFilterProps) => {
  const [chosen, setChosen] = useState<SelectOption>(selectedEvents[0]);
  const [selectedTypes, setSelectedTypes] = useState<SelectOption["types"]>([]);
  const [selectedFilters, setSelectedFilters] = useState<
    SelectOption["filters"]
  >([]);

  const store = useWorkflowStore();

  useEffect(() => {
    setSelectedTypes([]);
    if (store.on?.[chosen.value]) {
      setSelectedTypes(store.on[chosen.value]?.types);
    }
  }, [chosen]);

  useEffect(() => {
    if (selectedTypes) {
      store.setTypes(chosen.value, selectedTypes);
    }
  }, [selectedTypes]);

  return (
    <div className={styles.container}>
      {/* Select an Event to add filters to */}
      <span className={styles.columnItem}>
        <strong className={styles.columnLabel}>Event</strong>
        <Listbox
          value={chosen}
          onChange={setChosen}
          as={"div"}
          className={"combobox pop-in"}
        >
          <Listbox.Button className={`listbox-input ${styles.colInput}`}>
            {chosen.label}
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
      {chosen.types && (
        <span className={styles.columnItem}>
          <strong className={styles.columnLabel}>Types</strong>
          <Listbox
            value={selectedTypes}
            onChange={setSelectedTypes}
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
      {chosen.filters && (
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
