import React, { useEffect, useState } from 'react';

const useForm = (handleSubmission, SignUpValidator) => {
  const [value, setValue] = useState({
                                       firstname       : '',
                                       lastname        : '',
                                       username        : '',
                                       email           : '',
                                       type            : 'Student',
                                       affiliation     : '',
                                       description     : '',
                                       password        : '',
                                       confirm_password: '',
                                     });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(SignUpValidator(value));
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

export default useForm;
