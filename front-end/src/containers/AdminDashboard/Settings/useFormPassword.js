import React, { useEffect, useState } from "react";

const useFormPassword = (handleSubmission, passwordValidator) => {
  const [passwordValue, setpasswordValue] = useState({
    password: "",
    confirmPassword: "",
  });

  const [passwordErrors, setpasswordErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  const handlepasswordSubmit = (e) => {
    e.preventDefault();
    setpasswordErrors(passwordValidator(passwordValue));
    setSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(passwordErrors).length === 0 && isSubmitting) {
      handleSubmission();
    }
  }, [passwordErrors]);

  const updatepasswordValue = (e) => {
    let value = undefined;
    // alert(e.target.checked);
    if (e.target.type == "file") {
      alert(
        "file uploaded successfully. Save the information to see the effect"
      );
      value = e.target.files[0];
    } else {
      value = e.target.value;
    }

    if (e.target.type === "checkbox") {
      setpasswordValue({
        ...passwordValue,
        permissions: {
          ...passwordValue.permissions,
          [e.target.name]: e.target.checked,
        },
      });
    } else {
      setpasswordValue({
        ...passwordValue,
        [e.target.name]: value,
      });
    }
  };

  return {
    passwordValue,
    handlepasswordSubmit,
    updatepasswordValue,
    passwordErrors,
  };
};

export default useFormPassword;
