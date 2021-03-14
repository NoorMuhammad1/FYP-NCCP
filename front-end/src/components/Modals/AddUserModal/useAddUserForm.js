import { useState, useEffect } from "react";

const useAddUserForm = (handleSubmission, AddUserValidator) => {
  const [value, setValue] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    // affiliation: "",
    // description: "",
    password: "",
    confirm_password: "",
    role: "",
    permissions: {
      add_M_Permission: false,
      update_M_Permission: false,
      delete_M_Permission: false,
      view_M_Permission: false,
      view_U_Permission: false,
      update_U_Permission: false,
      delete_U_Permission: false,
      add_U_Permission: false,
      view_D_Permission: false,
      view_P_Permission: false,
      view_O_Permission: false,
    },
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(AddUserValidator(value));
    setSubmitting(true);
  };

  useEffect(() => {
    // console.log(Object.keys(errors));
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

  const updatePermissionValue = (e) => {
    setValue({
      ...value,
      permissions: {
        ...value.permissions,
        [e.target.name]: e.target.checked,
      },
    });
  };

  return { handleSubmit, updatePermissionValue, value, errors, updateValue };
};

export default useAddUserForm;
