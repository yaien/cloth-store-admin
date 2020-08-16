import { useState, ChangeEvent } from "react";

export function useForm<T>(state?: T) {
  const [data, setData] = useState(state ?? ({} as T));
  type Key = keyof T;

  const input = (key: Key, parser: Function = String) => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    setData({ ...data, [key]: parser(e.target.value) });
  };

  const get = (key: Key) => data[key] ?? "";

  return {
    input,
    get,
    data,
  };
}

export default useForm;
