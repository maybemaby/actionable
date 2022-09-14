import { Fragment, useMemo } from "react";
import { Combobox } from "@headlessui/react";
import { MdExpandMore } from "react-icons/md";
import { BsCheck } from "react-icons/bs";
import { TriggerEvent } from "@lib/types";
import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import { useState } from "react";
import styles from "./OnField.module.css";
import { EventFilter } from "./EventFilter";
import { useHasHydrated } from "@hooks/useHasHydrated";

export interface SelectOption {
  label: string;
  value: TriggerEvent;
  filters?: string[];
  types?: string[];
}

const options: SelectOption[] = [
  {
    label: "Push",
    value: "push",
    filters: [
      "branches",
      "branches-ignore",
      "paths",
      "paths-ignore",
      "tags",
      "tags-ignore",
    ],
  },
  {
    label: "Pull Request",
    value: "pull_request",
    types: [
      "assigned",
      "unassigned",
      "labeled",
      "unlabeled",
      "opened",
      "edited",
      "closed",
      "reopened",
      "synchronize",
      "converted_to_draft",
      "ready_for_review",
      "locked",
      "unlocked",
      "review_requested",
      "review_request_removed",
      "auto_merge_enabled",
      "auto_merge_disabled",
    ],
    filters: ["branches", "paths", "paths-ignore", "branches-ignore"],
  },
  { label: "Create", value: "create" },
  { label: "Delete", value: "delete" },
  { label: "Fork", value: "fork" },
  {
    label: "Release",
    value: "release",
    types: [
      "published",
      "unpublished",
      "created",
      "edited",
      "deleted",
      "prereleased",
      "released",
    ],
  },
  {
    label: "Issue Creation/Modification",
    value: "issues",
    types: [
      "opened",
      "edited",
      "deleted",
      "transferred",
      "pinned",
      "unpinned",
      "closed",
      "reopened",
      "assigned",
      "unassigned",
      "labeled",
      "unlabeled",
      "locked",
      "unlocked",
      "milestoned",
      "demilestoned",
    ],
  },
  {
    label: "Issue Comment",
    value: "issue_comment",
    types: ["created", "edited", "deleted"],
  },
  {
    label: "Discussion",
    value: "discussion",
    types: [
      "created",
      "edited",
      "deleted",
      "transferred",
      "pinned",
      "unpinned",
      "labeled",
      "unlabeled",
      "locked",
      "unlocked",
      "category_changed",
      "answered",
      "unanswered",
    ],
  },
  {
    label: "Discussion Comment",
    value: "discussion_comment",
    types: ["created", "edited", "deleted"],
  },
  { label: "Watch", value: "watch", types: ["started"] },
];

export const OnField = () => {
  const hasHydrated = useHasHydrated();
  const { onEventArray, clearTriggers, on } = useWorkflowStore();
  const onEvents = useMemo(() => {
    if (!on) {
      return [];
    }
    return Object.keys(on);
  }, [on]);
  const [selected, setSelected] = useState<SelectOption[]>(() => {
    if (!on || Object.keys(on).length <= 0) {
      return [];
    }
    const selections = [];
    for (let key of Object.keys(on)) {
      const opt = options.find((o) => o.value === key);
      if (opt) {
        selections.push(opt);
      }
    }
    return selections;
  });
  const [query, setQuery] = useState("");
  const filteredOptions = useMemo(() => {
    return query === ""
      ? options
      : options.filter((opt) =>
          opt.label.toLowerCase().includes(query.toLowerCase())
        );
  }, [query]);

  const handleUpdate = (update: SelectOption[]) => {
    if (update.length > 0) {
      onEventArray(update.map((o) => o.value));
      setSelected(update);
    } else if (hasHydrated && update.length === 0) {
      setSelected(update);
      clearTriggers();
    }
  };

  return (
    <>
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

      {onEvents.length > 0 && (
        <section>
          <h3>Event Filtering</h3>
          <EventFilter selectedEvents={selected} />
        </section>
      )}
    </>
  );
};
