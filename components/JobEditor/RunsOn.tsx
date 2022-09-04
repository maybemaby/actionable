import { Listbox } from "@headlessui/react";
import { RunsOnOptions } from "@lib/types/workflow";
import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import { Fragment, useMemo } from "react";
import { BsCheck } from "react-icons/bs";
import { MdExpandMore } from "react-icons/md";
import styles from "./RunsOn.module.css";

const options: RunsOnOptions[] = [
  "ubuntu-22.04",
  "ubuntu-20.04",
  "ubuntu-18.04",
  "ubuntu-latest",
  "macos-12",
  "macos-11",
  "macos-10.15",
  "windows-latest",
  "windows-2019",
];

export const RunsOn = ({
  keyName,
  className,
}: {
  keyName: string;
  className?: string;
}) => {
  const store = useWorkflowStore();
  const selectedLength = useMemo(() => {
    return store?.jobs?.[keyName]["runs-on"]?.length ?? 0;
  }, [store.jobs, keyName]);

  const handleChange = (value: RunsOnOptions[]) => {
    store.setRunsOn(keyName, value);
  };

  return (
    <Listbox
      value={store?.jobs?.[keyName]["runs-on"] ?? []}
      onChange={handleChange}
      as="div"
      className={`combobox pop-in ${styles.listbox}`}
      multiple
    >
      <div className={`${className} ${styles.container}`}>
        <Listbox.Label className={styles.label}>
          Platforms to run workflow on:
        </Listbox.Label>
        <Listbox.Button className={`listbox-input ${styles.input}`}>
          Platforms: {selectedLength}
          <MdExpandMore size={25} />
        </Listbox.Button>
      </div>

      <Listbox.Options className={`combobox-options ${styles.options}`}>
        {options.map((opt) => (
          <Listbox.Option key={opt} value={opt} as={Fragment}>
            {({ active, selected }) => {
              return (
                <li
                  className={`combobox-option ${
                    active ? "combobox-option-focus" : ""
                  }`}
                >
                  {selected && <BsCheck size={25} />}
                  {opt}
                </li>
              );
            }}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};
