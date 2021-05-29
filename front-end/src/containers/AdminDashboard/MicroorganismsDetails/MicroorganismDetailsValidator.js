const getCurrentDate = (seperator = "-") => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${year}${seperator}${month}${seperator}${date}`;
};

const MicroorganismDetailsValidator = (value) => {
  let errors = {};
  if (!value.CoreDataSets.Genus) {
    errors.Genus = "Genus cannot be empty";
  }
  if (!value.CoreDataSets.AccessionNumber) {
    errors.AccessionNumber = "Accession Number cannot be empty";
  }
  if (!value.CoreDataSets.SpeciesEpithet) {
    errors.SpeciesEpithet = "Species Epithet cannot be empty";
  }
  if (!value.CoreDataSets.Author) {
    errors.Author = "Author cannot be empty";
  }
  if (!value.CoreDataSets.OrganismType) {
    errors.OrganismType = "One of the Organism Type must be selected";
  }
  if (!value.CoreDataSets.HistoryOfDeposit) {
    errors.HistoryOfDeposit = "History of Deposit cannot be empty";
  }
  if (!value.CoreDataSets.DateOfIsolation) {
    errors.DateOfIsolation = "Date of Isolation cannot be empty";
  }
  if (!value.CoreDataSets.IsolatedFrom) {
    errors.IsolatedFrom = "Isolated From cannot be empty";
  }
  if (!value.CoreDataSets.GeographicOrigin) {
    errors.GeographicOrigin = "Geographic Origin cannot be empty";
  }
  if (!value.CoreDataSets.Status) {
    errors.Status = "One of the Status must be selected";
  }

  if (!value.CoreDataSets.Medium) {
    errors.Medium = "Medium cannot be empty";
  }
  if (!value.CoreDataSets.OptimumGrowthTemperature) {
    errors.OptimumGrowthTemperature =
      "Optimum Growth Temperature cannot be empty";
  }
  if (!value.CoreDataSets.MaximumGrowthTemperature) {
    errors.MaximumGrowthTemperature =
      "Maximum Growth Temperature cannot be empty";
  }
  if (!value.CoreDataSets.MinimumGrowthTemperature) {
    errors.MinimumGrowthTemperature =
      "Minimum Growth Temperature cannot be empty";
  }

  //   Screen 2

  if (!value.Name.TaxonomyID) {
    errors.TaxonomyID = "Taxonomy ID cannot be empty";
  } else if (!parseInt(value.Name.TaxonomyID)) {
    errors.TaxonomyID = "Taxonomy ID must be a number";
  }

  //   Screen 3

  if (!value.StrainAdministration.DateOfAccession) {
    errors.DateOfAccession = "Date Of Accession cannot be empty";
  } else if (new Date(value.DateOfAccession) > new Date()) {
    errors.DateOfAccession = "Date of Accession cannot be in the future";
  }
  if (
    value.StrainAdministration.HerbariumNo &&
    !parseInt(value.StrainAdministration.HerbariumNo)
  ) {
    errors.HerbariumNo = "Herbarium No must be a number";
  }
  if (
    value.StrainAdministration.AnimalQuarantineNo &&
    !parseInt(value.StrainAdministration.AnimalQuarantineNo)
  ) {
    errors.AnimalQuarantineNo = "Animal Quarantine No must be a number";
  }
  if (
    value.StrainAdministration.PlantQuarantineNo &&
    !parseInt(value.StrainAdministration.PlantQuarantineNo)
  ) {
    errors.PlantQuarantineNo = "Plant Quarantine No must be a number";
  }

  //   Screen 4

  if (
    value.EnviromentAndHistory.DateOfCollection &&
    new Date(value.EnviromentAndHistory.DateOfCollection) > new Date()
  ) {
    errors.DateOfCollection = "Date of Collection cannot be in the future";
  }
  if (
    value.EnviromentAndHistory.DateOfIdentification &&
    new Date(value.EnviromentAndHistory.DateOfIdentification) > new Date()
  ) {
    errors.DateOfIdentification =
      "Date of Identification cannot be in the future";
  }
  if (
    value.EnviromentAndHistory.DateOfDeposition &&
    new Date(value.EnviromentAndHistory.DateOfDeposition) > new Date()
  ) {
    errors.DateOfDeposition = "Date of Deposition cannot be in the future";
  }

  //   Screen 10
  if (
    value.GrowthConditions.MaximumGrowthPH &&
    !parseFloat(value.GrowthConditions.MaximumGrowthPH)
  ) {
    errors.MaximumGrowthPH = "MaximumGrowthPH must be a number";
  }
  if (
    value.GrowthConditions.MinimumGrowthPH &&
    !parseFloat(value.GrowthConditions.MinimumGrowthPH)
  ) {
    errors.MinimumGrowthPH = "MinimumGrowthPH must be a number";
  }
  if (
    value.GrowthConditions.MaximumNaClConcentration &&
    !parseFloat(value.GrowthConditions.MaximumNaClConcentration)
  ) {
    errors.MaximumNaClConcentration =
      "MaximumNaClConcentration must be a number";
  }
  if (
    value.GrowthConditions.MinimumNaClConcentration &&
    !parseFloat(value.GrowthConditions.MinimumNaClConcentration)
  ) {
    errors.MinimumNaClConcentration =
      "MinimumNaClConcentration must be a number";
  }
  if (
    value.GrowthConditions.MaximumSugarConcentration &&
    !parseFloat(value.GrowthConditions.MaximumSugarConcentration)
  ) {
    errors.MaximumSugarConcentration =
      "MaximumSugarConcentration must be a number";
  }
  if (
    value.GrowthConditions.MinimumSugarConcentration &&
    !parseFloat(value.GrowthConditions.MinimumSugarConcentration)
  ) {
    errors.MinimumSugarConcentration =
      "MinimumSugarConcentration must be a number";
  }
  //   Screen 12

  if (value.Medium.MediumNumber && !parseInt(value.Medium.MediumNumber)) {
    errors.MediumNumber = "Medium Number must be a number";
  }
  if (value.Medium.MediumPH && !parseFloat(value.Medium.MediumPH)) {
    errors.MediumPH = "Medium PH must be a number";
  }

  //   Screen 13

  if (value.Sequence.Length && !parseInt(value.Sequence.Length)) {
    errors.Length = "Length must be a number";
  }
  // Screen 14
  // if (value.MediumNumber && !parseInt(value.MediumNumber)) {
  //   errors.MediumNumber = "Medium Number must be a number";
  // }
  // if (value.MediumPH && !parseFloat(value.MediumPH)) {
  //   errors.MediumPH = "Medium PH must be a number";
  // }
  return errors;
};

export default MicroorganismDetailsValidator;
