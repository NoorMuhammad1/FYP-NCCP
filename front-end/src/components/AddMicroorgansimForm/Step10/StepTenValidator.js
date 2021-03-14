const StepTenValidator = (value) => {
  let errors = {};

  if (value.MaximumGrowthPH && !parseFloat(value.MaximumGrowthPH)) {
    errors.MaximumGrowthPH = "MaximumGrowthPH must be a number";
  }
  if (value.MinimumGrowthPH && !parseFloat(value.MinimumGrowthPH)) {
    errors.MinimumGrowthPH = "MinimumGrowthPH must be a number";
  }
  if (
    value.MaximumNaClConcentration &&
    !parseFloat(value.MaximumNaClConcentration)
  ) {
    errors.MaximumNaClConcentration =
      "MaximumNaClConcentration must be a number";
  }
  if (
    value.MinimumNaClConcentration &&
    !parseFloat(value.MinimumNaClConcentration)
  ) {
    errors.MinimumNaClConcentration =
      "MinimumNaClConcentration must be a number";
  }
  if (
    value.MaximumSugarConcentration &&
    !parseFloat(value.MaximumSugarConcentration)
  ) {
    errors.MaximumSugarConcentration =
      "MaximumSugarConcentration must be a number";
  }
  if (
    value.MinimumSugarConcentration &&
    !parseFloat(value.MinimumSugarConcentration)
  ) {
    errors.MinimumSugarConcentration =
      "MinimumSugarConcentration must be a number";
  }
  // if (!value.TaxonomyID.trim()) {
  //   errors.TaxonomyID = "Taxonomy ID cannot be empty";
  // } else if (!parseFloat(value.TaxonomyID.trim())) {
  //   errors.TaxonomyID = "Taxonomy ID must be a number";
  // }

  return errors;
};

export default StepTenValidator;
