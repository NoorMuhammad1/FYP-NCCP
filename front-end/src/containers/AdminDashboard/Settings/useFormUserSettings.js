import React, { useEffect, useState } from 'react';

const useFormSignUp = (handleSubmission, SignUpValidator) => {
  const [signUpValue, setSignUpValue] = useState({
                                                   firstname       : '',
                                                   lastname        : '',
                                                   email           : '',
                                                   type            : 'Student',
                                                   affiliation     : '',
                                                   description     : '',
                                                   password        : '',
                                                   confirm_password: '',
                                                 });

  const [signUpErrors, setSignUpErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setSignUpErrors(SignUpValidator(signUpValue));
    setSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(signUpErrors).length === 0 && isSubmitting) {
      handleSubmission();
    }
  }, [signUpErrors]);

  const updateSignUpValue = (e) => {
    setSignUpValue({
                     ...signUpValue,
                     [e.target.name]: e.target.value,
                   });
  };

  return { handleSignUpSubmit, signUpValue, updateSignUpValue, signUpErrors };
};

export default useFormSignUp;
