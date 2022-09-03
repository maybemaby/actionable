export type TriggerEvent =
  | "branch_protection_rule"
  | "check_run"
  | "check_suite"
  | "create"
  | "delete"
  | "deployment"
  | "deployment_status"
  | "discussion"
  | "discussion_comment"
  | "fork"
  | "gollum"
  | "issue_comment"
  | "issues"
  | "label"
  | "merge_group"
  | "milestone"
  | "page_build"
  | "project"
  | "project_card "
  | "project_column"
  | "public"
  | "pull_request"
  | "pull_request_comment (use issue_comment)"
  | "pull_request_review"
  | "pull_request_review_comment"
  | "pull_request_target"
  | "push"
  | "registry_package"
  | "release"
  | "repository_dispatch"
  | "schedule"
  | "status"
  | "watch"
  | "workflow_call"
  | "workflow_dispatch"
  | "workflow_run";

export type OnBlockFilter =
  | "branches"
  | "branches-ignore"
  | "paths"
  | "paths-ignore"
  | "tags"
  | "tags-ignore";

export type TriggerConditions = {
  [key in OnBlockFilter | "types"]?: string[];
};

export type OnBlock =
  | TriggerEvent[]
  | {
      [key in TriggerEvent]?: null | TriggerConditions;
    };

export interface Workflow {
  name: string;
  on: OnBlock;
}