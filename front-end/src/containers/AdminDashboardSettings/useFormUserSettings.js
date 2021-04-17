import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const useFormUserSettings = (handleSubmission, UserSettingsValidator) => {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const [UserSettingsValue, setUserSettingsValue] = useState({
    firstname: user.firstname || "",
    lastname: user.lastname || "",
    email: user.email || "",
    contactNumber: user.contactNumber === null ? "" : user.contactNumber,
    profilePicture: user.profilePicture || undefined,
  });

  const [UserSettingsErrors, setUserSettingsErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  const handleUserSettingsSubmit = (e) => {
    e.preventDefault();
    setUserSettingsErrors(UserSettingsValidator(UserSettingsValue));
    setSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(UserSettingsErrors).length === 0 && isSubmitting) {
      handleSubmission();
    }
  }, [UserSettingsErrors]);

  const updateUserSettingsValue = (e) => {
    // let value = "";
    // if (e.target.type === "file") {
    //   value = e.target.files[0];
    // } else {
    //   value = e.target.value;
    // }
    setUserSettingsValue({
      ...UserSettingsValue,
      [e.target.name]: e.target.files[0],
    });
  };

  return {
    handleUserSettingsSubmit,
    UserSettingsValue,
    updateUserSettingsValue,
    UserSettingsErrors,
  };
};

export default useFormUserSettings;
