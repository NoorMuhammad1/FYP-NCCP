import React, { useEffect, useState } from "react";

const useFormAddUser = (handleSubmission, SignInValidator) => {
  const [addUserValue, setAddUserValue] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "internal",
    profile_picture: "null",
    preview_Image: null,
    permissions: {
      view_microorganism_permission: false,
      add_microorganism_permission: false,
      delete_microorganism_permission: false,
      update_microorganism_permission: false,
      view_order_permission: false,
      add_order_permission: false,
      delete_order_permission: false,
      update_order_permission: false,
      view_deposit_permission: false,
      add_deposit_permission: false,
      delete_deposit_permission: false,
      update_deposit_permission: false,
      view_user_permission: false,
      add_user_permission: false,
      delete_user_permission: false,
      update_user_permission: false,
      view_report_permission: false,
      add_report_permission: false,
      delete_report_permission: false,
      update_report_permission: false,
      view_log_permission: false,
      add_log_permission: false,
      delete_log_permission: false,
      update_log_permission: false,
    },
  });

  const [addUserErrors, setaddUserErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    setaddUserErrors(SignInValidator(addUserValue));
    setSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(addUserErrors).length === 0 && isSubmitting) {
      handleSubmission();
    }
  }, [addUserErrors]);

  const updateAddUser = (name, value, type) => {
    if (type === "text" || type === "password") {
      setAddUserValue({
        ...addUserValue,
        [name]: value,
      });
    } else if (type === "file") {
      setAddUserValue({
        ...addUserValue,
        profile_picture: value,
        preview_Image: value.uri,
      });
      // };
    } else if (type === "checkbox") {
      setAddUserValue({
        ...addUserValue,
        permissions: {
          ...addUserValue.permissions,
          [name]: value,
        },
      });
    }
  };

  return { addUserValue, handleAddUserSubmit, updateAddUser, addUserErrors };
};

export default useFormAddUser;
