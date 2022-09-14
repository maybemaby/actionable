import type { NextPage } from "next";
import Head from "next/head";
import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import { OnField } from "@components/OnField/OnField";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useHasHydrated } from "@hooks/useHasHydrated";

// Doesn't really have a performance benefit, but kept getting
// UI/Server mismatch errors
const DynamicJobsField = dynamic(
  () => import("@components/JobsField/JobsField").then((mod) => mod.JobsField),
  {
    ssr: false,
  }
);

interface FieldsTouched {
  name: boolean;
  on: boolean;
}

const Home: NextPage = () => {
  const { name, changeName } = useWorkflowStore();
  const [touched, setTouched] = useState<FieldsTouched>({
    name: false,
    on: true,
  });

  const touchField = (key: keyof FieldsTouched) => {
    const updated = { ...touched };
    updated[key] = true;
    setTouched(updated);
  };

  const hasHydrated = useHasHydrated();

  return (
    <div>
      <Head>
        <title>Actionable</title>
        <meta
          name="description"
          content="Tool for generating Github Actions workflows."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <p className="intro">
          Generate workflows for Github&#39;s CI/CD platform{" "}
          <a
            href="https://github.com/features/actions"
            target="_blank"
            rel="noreferrer"
          >
            Github Actions
          </a>
        </p>
        <h2>Let&#39;s get started</h2>
        <label htmlFor="name">Workflow Name</label>
        <input
          id="name"
          type="text"
          placeholder="Enter a name for your workflow"
          value={name ?? ""}
          onChange={(e) => changeName(e.currentTarget.value)}
          onChangeCapture={() => touchField("name")}
        />
      </section>
      {(hasHydrated && touched.name && <OnField />) ||
        (hasHydrated && name !== null && <OnField />)}
      {touched.on && <DynamicJobsField />}
    </div>
  );
};

export default Home;
