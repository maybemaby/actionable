import { Listbox } from "@headlessui/react";
import { MdExpandMore } from "react-icons/md";
import { BsCheck } from "react-icons/bs";
import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import { Fragment, useMemo, useState } from "react";
import styles from "./JobSelect.module.css";

interface Props {
  className?: string;
  onChange: (value: string) => void;
}

export const JobSelect = ({ className, onChange }: Props) => {
  const { jobs } = useWorkflowStore();
  const jobList = useMemo(() => {
    return Object.keys(jobs || {});
  }, [jobs]);
  const [selected, setSelected] = useState("");

  const handleChange = (value: string) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <Listbox
      value={selected}
      onChange={handleChange}
      className={`combobox pop-in ${styles.listbox}`}
      as="div"
    >
      <div className={`${className} ${styles.container}`}>
        <Listbox.Label className={styles.label}>Jobs:</Listbox.Label>
        <Listbox.Button className={`listbox-input ${styles.input}`}>
          {selected}
          <MdExpandMore size={25} />
        </Listbox.Button>
      </div>
      <Listbox.Options className={`combobox-options ${styles.options}`}>
        {jobList.map((job) => (
          <Listbox.Option key={job} value={job} as={Fragment}>
            {({ active, selected }) => {
              return (
                <li
                  className={`combobox-option ${
                    active ? "combobox-option-focus" : ""
                  }`}
                >
                  {selected && <BsCheck size={25} />}
                  {job}
                </li>
              );
            }}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};
