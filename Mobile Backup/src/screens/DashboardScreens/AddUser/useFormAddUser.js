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
    preview_Image: "",
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
    console.log(addUserErrors);
    if (Object.keys(addUserErrors).length === 0 && isSubmitting) {
      handleSubmission();
    }
  }, [addUserErrors]);

  const updateAddUser = (name, value, type) => {
    if (type === "text" || type === "password") {
      console.log(name, " ", value, " ", type);
      setAddUserValue({
        ...addUserValue,
        [name]: value,
      });
    } else if (type === "file") {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setAddUserValue({
          ...addUserValue,
          profile_picture: e.target.files[0],
          preview_Image: reader.result,
        });
      };
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
