import type { NextPage } from "next";
import Head from "next/head";
import { useWorkflowStore } from "@stores/workflow/WorkflowStore";
import { OnField } from "@components/OnField/OnField";
import { JobsField } from "@components/JobsField/JobsField";
import { useState } from "react";

interface FieldsTouched {
  name: boolean;
  on: boolean;
}

const Home: NextPage = () => {
  const store = useWorkflowStore();
  const [touched, setTouched] = useState<FieldsTouched>({
    name: false,
    on: true,
  });

  const { name, on, jobs } = store;

  const touchField = (key: keyof FieldsTouched) => {
    const updated = { ...touched };
    updated[key] = true;
    setTouched(updated);
  };

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
        <h2>Let&#39;s get started</h2>
        <label htmlFor="name">Workflow Name</label>
        <input
          id="name"
          type="text"
          placeholder="Enter a name for your workflow"
          value={store.name ?? ""}
          onChange={(e) => store.changeName(e.currentTarget.value)}
          onChangeCapture={() => touchField("name")}
        />
      </section>
      {touched.name && store.name !== null && <OnField />}
      {touched.on && <JobsField />}

      {/* <YamlPreview given={{ name, on, jobs }} /> */}
    </div>
  );
};

export default Home;
