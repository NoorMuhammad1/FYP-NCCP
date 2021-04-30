import React, { useEffect, useState } from 'react';

const useFormResetPassword = (handleSubmission, ResetPasswordValidator) => {
  const [resetPassword, setResetPassword] = useState({
                                                       password        : '',
                                                       confirm_password: '',
                                                     });

  const [resetPasswordErrors, setResetPasswordErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  const handleResetSubmit = (e) => {
    e.preventDefault();
    setResetPasswordErrors(ResetPasswordValidator(resetPassword));
    setSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(resetPasswordErrors).length === 0 && isSubmitting) {
      handleSubmission();
    }
  }, [resetPasswordErrors]);

  const updateResetPassword = (e) => {
    setResetPassword({
                       ...resetPassword,
                       [e.target.name]: e.target.value,
                     });
  };

  return {
    resetPassword,
    handleResetSubmit,
    updateResetPassword,
    resetPasswordErrors,
  };
};

export default useFormResetPassword;
