import { useEffect, useState } from "react";
const useStepThreeForm = (
  initialValue,
  handleSubmission,
  StepThreeValidator
) => {
  const [value, setValue] = useState(initialValue);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(StepThreeValidator(value));
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

export default useStepThreeForm;
