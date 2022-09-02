import yaml from "js-yaml";
import { useMemo } from "react";

export function YamlPreview<T>({ given }: { given: T }) {
  const converted = useMemo(() => {
    return yaml.dump(given);
  }, [given]);

  return <pre>{converted}</pre>;
}
