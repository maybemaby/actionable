import { TriggerEvent } from "@lib/types";

export interface SelectOption {
  label: string;
  value: TriggerEvent;
  filters?: string[];
  types?: string[];
}

export const triggerOptions: SelectOption[] = [
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
