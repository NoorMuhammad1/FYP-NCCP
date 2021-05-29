import { useEffect, useState } from "react";

const useFormMicroorganismAdd = (
  initialValue,
  handleSubmission,
  MicroorganismDetailsValidator
) => {
  const [value, setValue] = useState(initialValue);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    // e.preventDefault();
    setErrors(MicroorganismDetailsValidator(value));
    setSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      handleSubmission();
    }
  }, [errors]);

  const updateValue = (e, parent) => {
    setValue({
      ...value,
      [parent]: {
        ...value[parent],
        [e.target.name]: e.target.value,
      },
    });
  };

  const setData = (data) => {
    setValue(data);
  };

  return { handleSubmit, value, updateValue, errors, setData };
};

export default useFormMicroorganismAdd;
