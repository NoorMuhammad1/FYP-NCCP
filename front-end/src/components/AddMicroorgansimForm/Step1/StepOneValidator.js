const getCurrentDate = (seperator = "-") => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${year}${seperator}${month}${seperator}${date}`;
};

const StepOneValidator = (value) => {
  let errors = {};
  if (!value.Genus.trim()) {
    errors.Genus = "Genus cannot be empty";
  }
  if (!value.AccessionNumber.trim()) {
    errors.AccessionNumber = "Accession Number cannot be empty";
  }
  if (!value.SpeciesEpithet.trim()) {
    errors.SpeciesEpithet = "Species Epithet cannot be empty";
  }
  if (!value.Author.trim()) {
    errors.Author = "Author cannot be empty";
  }
  if (!value.OrganismType.trim()) {
    errors.OrganismType = "One of the Organism Type must be selected";
  }
  if (!value.HistoryOfDeposit.trim()) {
    errors.HistoryOfDeposit = "History of Deposit cannot be empty";
  }
  if (!value.DateOfIsolation.trim()) {
    errors.DateOfIsolation = "Date of Isolation cannot be empty";
  }
  if (!value.IsolatedFrom.trim()) {
    errors.IsolatedFrom = "Isolated From cannot be empty";
  }
  if (!value.GeographicOrigin.trim()) {
    errors.GeographicOrigin = "Geographic Origin cannot be empty";
  }
  if (!value.Status.trim()) {
    errors.Status = "One of the Status must be selected";
  }

  if (!value.Medium.trim()) {
    errors.Medium = "Medium cannot be empty";
  }
  if (!value.OptimumGrowthTemperature.trim()) {
    errors.OptimumGrowthTemperature =
      "Optimum Growth Temperature cannot be empty";
  }
  if (!value.MaximumGrowthTemperature.trim()) {
    errors.MaximumGrowthTemperature =
      "Maximum Growth Temperature cannot be empty";
  }
  if (!value.MinimumGrowthTemperature.trim()) {
    errors.MinimumGrowthTemperature =
      "Minimum Growth Temperature cannot be empty";
  }

  return errors;
};

export default StepOneValidator;
