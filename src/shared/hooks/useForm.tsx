import { useState } from "react";

type FormState = Record<string, any>;

function useForm<T extends FormState>(defaultValues: T) {
  const [formState, setFormState] = useState<T>(defaultValues);

  function submit(callback: (params: T) => void) {
    callback(formState);
  }

  function onInput(input: Partial<T>) {
    setFormState((prevFormState) => ({ ...prevFormState, ...input }));
  }
  return {
    formState,
    onInput,
    submit,
  };
}

export default useForm;
