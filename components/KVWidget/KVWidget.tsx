import {
  useEffect,
  useRef,
  useState,
  FocusEvent,
  KeyboardEvent,
  Fragment,
} from "react";
import styles from "./KVWidget.module.css";

interface KVWidgetProps {
  initial?: Record<string, string>;
  onChange(kv: Record<string, string>): void;
  className?: string;
}

export const KVWidget = ({ className, onChange, initial }: KVWidgetProps) => {
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [kv, setKv] = useState<Record<string, string>>(initial ?? {});
  const keyRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    onChange(kv);
  }, [kv]);

  const addNewKv = (value: string) => {
    if (value.length > 0 && newValue.length > 0 && newKey.length > 0) {
      setKv({ ...kv, [newKey]: newValue });
      setNewKey("");
      setNewValue("");

      // Focus new key input on completion
      if (keyRef.current) {
        keyRef.current.focus();
      }
    }
  };

  // When either key or value input is blurred and if both key and value
  // have some value, save to kv and create new row.
  const handleAdd = (e: FocusEvent<HTMLInputElement>) => {
    addNewKv(e.target.value);
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addNewKv(e.currentTarget.value);
    }
  };

  const updateKey = (prevKey: string, newKey: string, value: string) => {
    if (newKey.length > 0) {
      const newKv = { ...kv };
      delete newKv[prevKey];
      newKv[newKey] = value;
      setKv(newKv);
    }
  };

  const updateValue = (key: string, value: string) => {
    if (value.length > 0)
      setKv({
        ...kv,
        [key]: value,
      });
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.item}>Keys</div>
      <div className={styles.item}>Values</div>
      {Object.entries(kv).map(([k, v], i) => (
        <Fragment key={`${v} ${k} ${i}`}>
          <input
            className={`${styles.item} ${styles.completed}`}
            placeholder={k}
            onBlur={({ target }) => updateKey(k, target.value, v)}
          />
          <input
            className={`${styles.item} ${styles.completed}`}
            placeholder={v}
            onBlur={({ target }) => updateValue(k, target.value)}
          />
        </Fragment>
      ))}
      <input
        className={styles.item}
        value={newKey}
        placeholder="Key"
        onChange={({ target }) => setNewKey(target.value)}
        onBlur={handleAdd}
        onKeyDown={handleEnter}
        ref={keyRef}
      />
      <input
        className={styles.item}
        value={newValue}
        placeholder="Value"
        onChange={({ target }) => setNewValue(target.value)}
        onBlur={handleAdd}
        onKeyDown={handleEnter}
      />
    </div>
  );
};
