const StepThirteenValidator = (value) => {
  let errors = {};
  if (value.Length && !parseInt(value.Length)) {
    errors.Length = 'Length must be a number';
  }
  return errors;
};

export default StepThirteenValidator;
