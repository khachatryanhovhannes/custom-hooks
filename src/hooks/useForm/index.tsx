import { useState } from "react";

interface FormValues {
  [key: string]: string;
}

interface FormErrors {
  [key: string]: string;
}

type FormValidator = (values: FormValues) => FormErrors;

const useForm = (initialValues: FormValues, validator: FormValidator) => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validator(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      // Submit the form data
    }
  };

  return { values, errors, handleChange, handleSubmit };
};

export default useForm;
