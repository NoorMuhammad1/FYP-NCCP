const StepFourValidator = (value) => {
  let errors = {};
  if (value.DateOfCollection && new Date(value.DateOfCollection) > new Date()) {
    errors.DateOfCollection = "Date of Collection cannot be in the future";
  }
  if (
    value.DateOfIdentification &&
    new Date(value.DateOfIdentification) > new Date()
  ) {
    errors.DateOfIdentification =
      "Date of Identification cannot be in the future";
  }
  if (value.DateOfDeposition && new Date(value.DateOfDeposition) > new Date()) {
    errors.DateOfDeposition = "Date of Deposition cannot be in the future";
  }
  return errors;
};

export default StepFourValidator;
