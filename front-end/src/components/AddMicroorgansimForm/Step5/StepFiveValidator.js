const StepFiveValidator = (value) => {
  let errors = {};
  // if (!value.TaxonomyID) {
  //   errors.TaxonomyID = "Taxonomy ID cannot be empty";
  // } else if (value.TaxonomyID && !parseInt(value.TaxonomyID.trim())) {
  //   errors.TaxonomyID = "Taxonomy ID must be a number";
  // }

  return errors;
};

export default StepFiveValidator;
