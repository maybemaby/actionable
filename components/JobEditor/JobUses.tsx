import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { BiTrashAlt } from "react-icons/bi";
import styles from "./JobEditor.module.css";

export const JobUses = ({ jobKey }: { jobKey: string }) => {
  const { setUses, getUses } = useWorkflowStore();
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setValue(input);
  };

  const handleSubmit = () => {
    const uses = getUses(jobKey);
    if (uses?.includes(value)) {
      return;
    }
    if (value.length > 0 && uses) {
      setUses(jobKey, [...uses, value]);
    } else if (value.length > 0 && !uses) {
      setUses(jobKey, [value]);
    } else {
      setUses(jobKey, undefined);
    }
    setValue("");
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const removeUse = (use: string) => {
    const uses = getUses(jobKey);
    if (uses) {
      const newUses = uses.filter((name) => name !== use);
      newUses.length > 0
        ? setUses(jobKey, newUses)
        : setUses(jobKey, undefined);
    }
  };

  return (
    <>
      <div className={`row ${styles.uses}`}>
        <label htmlFor={`${jobKey}-uses`}>Job Uses:</label>
        <input
          id={`${jobKey}-uses`}
          type="text"
          placeholder="Enter Workflow Name"
          value={value}
          onChange={handleChange}
          onKeyDown={handleEnter}
        ></input>
        <button className="btn-primary" onClick={() => handleSubmit()}>
          Add
        </button>
      </div>
      <div>
        <ul className={styles.useList}>
          {getUses(jobKey)?.map((use) => {
            return (
              <li key={use}>
                {use}
                <button className="icon-btn" onClick={() => removeUse(use)}>
                  <BiTrashAlt size={20} color={"inherit"} />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
