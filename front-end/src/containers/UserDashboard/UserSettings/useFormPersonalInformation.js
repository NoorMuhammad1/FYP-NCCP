import React, { useEffect, useState } from "react";

const useFormPersonalInformation = (
  handleSubmission,
  PersonalInformationValidator
) => {
  const [personalInformationValue, setPersonalInformationValue] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contactNumber: "",
    description: "",
    profilePicture: undefined,
  });

  const [personalInformationErrors, setPersonalInformationErrors] = useState(
    {}
  );
  const [isSubmitting, setSubmitting] = useState(false);

  const handlePersonalInformationSubmit = (e) => {
    e.preventDefault();
    setPersonalInformationErrors(
      PersonalInformationValidator(personalInformationValue)
    );
    setSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(personalInformationErrors).length === 0 && isSubmitting) {
      handleSubmission();
    }
  }, [personalInformationErrors]);

  const updatePersonalInformationValue = (e) => {
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
      setPersonalInformationValue({
        ...personalInformationValue,
        permissions: {
          ...personalInformationValue.permissions,
          [e.target.name]: e.target.checked,
        },
      });
    } else {
      setPersonalInformationValue({
        ...personalInformationValue,
        [e.target.name]: value,
      });
    }
  };
  const setInitial = (data) => {
    setPersonalInformationValue(data);
  };

  return {
    personalInformationValue,
    handlePersonalInformationSubmit,
    updatePersonalInformationValue,
    personalInformationErrors,
    setInitial,
  };
};

export default useFormPersonalInformation;
