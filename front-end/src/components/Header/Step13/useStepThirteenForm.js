import { useEffect, useState } from "react";
const useStepThirteenForm = (
  initialValue,
  handleSubmission,
  StepThirteenValidator
) => {
  const [value, setValue] = useState(initialValue);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(StepThirteenValidator(value));
    setSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      handleSubmission();
    }
  }, [errors]);

  const updateValue = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  return { handleSubmit, value, updateValue, errors };
};

export default useStepThirteenForm;
