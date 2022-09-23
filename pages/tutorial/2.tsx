import { EventFilter } from "@components/OnField/EventFilter";
import { TriggerSelect } from "@components/TriggerSelect/TriggerSelect";
import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import Link from "next/link";
import styles from "./tutorial.module.css";

const OnStep = () => {
  const { on } = useWorkflowStore();

  return (
    <div className={styles.page}>
      <h2>Configure Event Triggers</h2>
      <div>
        <p className={styles.description}>
          Github Actions are automated processes for Github Repositories that
          occur on certain activities related to the repository.
        </p>
        <p className={styles.description}>
          These activities include git actions like <code>push</code>,{" "}
          <code>pull_request</code>, and <code>fork</code>. There are also non
          version control events like issue creation, scheduled workflow runs,
          and comments.
        </p>
        <p className={styles.description}>
          A full list of event triggers and detailed explanations can be found{" "}
          <a
            href="https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows"
            target={"_blank"}
            rel="noreferrer"
          >
            here
          </a>
          .
        </p>
      </div>
      <TriggerSelect />
      {on && Object.keys(on).length > 0 ? (
        <>
          <p className={styles.description}>
            Some events can optionally specify types and filters so workflows
            only run when meeting more specific requirements.
          </p>
          <p className={styles.description}>
            For instance, workflows can specifically run on types of{" "}
            <code>assigned</code> and <code>ready_for_review</code>. Adding a
            branches filter for <code>main</code> would make it so the workflow
            only runs when a pull request has been assigned or is ready for
            review in the main branch.
          </p>
          <EventFilter />
          <div className="row">
            <Link href={"/tutorial/1"}>
              <a className="btn-primary">Previous</a>
            </Link>
            <Link href={"/tutorial/3"}>
              <a className="btn-primary">Next</a>
            </Link>
          </div>
        </>
      ) : (
        <div className="row">
          <Link href={"/tutorial/1"}>
            <a className="btn-primary">Previous</a>
          </Link>
          <button className="btn-primary" disabled>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default OnStep;
