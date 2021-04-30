const StepFourteenValidator = (value) => {
  let errors = {};
  if (value.MediumNumber && !parseInt(value.MediumNumber)) {
    errors.MediumNumber = 'Medium Number must be a number';
  }
  if (value.MediumPH && !parseFloat(value.MediumPH)) {
    errors.MediumPH = 'Medium PH must be a number';
  }
  return errors;
};

export default StepFourteenValidator;
