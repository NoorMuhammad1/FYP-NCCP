const StepTwoValidator = (value) => {
  let errors = {};
  if (!value.TaxonomyID.trim()) {
    errors.TaxonomyID = 'Taxonomy ID cannot be empty';
  }
  else if (!parseInt(value.TaxonomyID.trim())) {
    errors.TaxonomyID = 'Taxonomy ID must be a number';
  }

  return errors;
};

export default StepTwoValidator;
