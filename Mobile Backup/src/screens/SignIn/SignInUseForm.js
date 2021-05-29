import React, { useEffect, useState } from "react";

const useSignInForm = (handleSubmission, SignInValidator) => {
  const [signInValue, setSignInValue] = useState({
    email: "",
    password: "",
  });

  const [signInErrors, setSignInErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    setSignInErrors(SignInValidator(signInValue));
    setSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(signInErrors).length === 0 && isSubmitting) {
      handleSubmission();
    }
  }, [signInErrors]);

  const updateSignInValue = (value, name) => {
    setSignInValue({
      ...signInValue,
      [name]: value,
    });
  };

  return { signInValue, handleSignInSubmit, updateSignInValue, signInErrors };
};

export default useSignInForm;
