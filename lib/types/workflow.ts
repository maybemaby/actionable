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

export type RunsOnOptions =
  | "windows-latest"
  | "windows-2019"
  | "ubuntu-22.04"
  | "ubuntu-latest"
  | "ubuntu-20.04"
  | "ubuntu-18.04"
  | "macos-12"
  | "macos-11"
  | "macos-10.15";

type CommonActions =
  | "actions/checkout@v3"
  | "actions/setup-node@v3"
  | "actions/cache@v3"
  | "shivammathur/setup-php@v2"
  | "actions/setup-python@v4"
  | "actions/setup-go@v3";

export type TriggerConditions = {
  [key in OnBlockFilter | "types"]?: string[];
};

export type OnBlock = {
  [key in TriggerEvent]?: null | TriggerConditions;
};

type StepWith = {
  [key: string]: string;
};

type StepStrategy = {
  "fail-fast"?: boolean;
  "max-parallel"?: number;
  matrix: Record<string, string[]>;
};

type WithKeys = "args" | "entrypoint";

export type Step = {
  uses?: CommonActions | string;
  with?: Record<WithKeys | string, string>;
  run: string;
  env?: Record<string, string>;
  "continue-on-error"?: boolean;
  "timeout-minutes"?: number;
};

export type Job = {
  name?: string;
  id?: string;
  "runs-on"?: RunsOnOptions[] | RunsOnOptions;
  needs?: string[] | string;
  if?: string;
  steps?: Step[];
  strategy?: StepStrategy;
  "continue-on-error"?: boolean;
};

export interface Workflow {
  name: string;
  on: OnBlock;
  jobs: { [key: string]: Job };
}
