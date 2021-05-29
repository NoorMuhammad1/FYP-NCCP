const getCurrentDate = (seperator = "-") => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${year}${seperator}${month}${seperator}${date}`;
};

const MicroorganismAddValidator = (value) => {
  let errors = {
    // Name: {},
    // StrainAdministration: {...errors.StrainAdministration,},
    // EnviromentAndHistory: {...errors.EnviromentAndHistory,},
    // Publication: {},
    // BiologicalInteractions: {},
    // Sexuality: {},
    // Properties: {},
    // GenotypeAndGenetics: {},
    // GrowthConditions: {...errors.GrowthConditions,},
    // ChemistryAndEnzymes: {},
    // Medium: {},
    // Sequence: {},
    // Catalogue: {},
  };
  if (!value.CoreDataSets.Genus) {
    errors = {
      ...errors,
      CoreDataSets: { ...errors.CoreDataSets, Genus: "Genus cannot be empty" },
    };
  }
  if (!value.CoreDataSets.AccessionNumber) {
    errors = {
      ...errors,
      CoreDataSets: {
        ...errors.CoreDataSets,
        AccessionNumber: "Accession Number cannot be empty",
      },
    };
  }
  if (!value.CoreDataSets.SpeciesEpithet) {
    errors = {
      ...errors,
      CoreDataSets: {
        ...errors.CoreDataSets,
        SpeciesEpithet: "Species Epithet cannot be empty",
      },
    };
  }
  if (!value.CoreDataSets.Author) {
    errors = {
      ...errors,
      CoreDataSets: {
        ...errors.CoreDataSets,
        Author: "Author cannot be empty",
      },
    };
  }
  if (!value.CoreDataSets.OrganismType) {
    errors = {
      ...errors,
      CoreDataSets: {
        ...errors.CoreDataSets,
        OrganismType: "One of the Organism Type must be selected",
      },
    };
  }
  if (!value.CoreDataSets.HistoryOfDeposit) {
    errors = {
      ...errors,
      CoreDataSets: {
        ...errors.CoreDataSets,
        HistoryOfDeposit: "History of Deposit cannot be empty",
      },
    };
  }
  if (!value.CoreDataSets.DateOfIsolation) {
    errors = {
      ...errors,
      CoreDataSets: {
        ...errors.CoreDataSets,
        DateOfIsolation: "Date of Isolation cannot be empty",
      },
    };
  }
  if (!value.CoreDataSets.IsolatedFrom) {
    errors = {
      ...errors,
      CoreDataSets: {
        ...errors.CoreDataSets,
        IsolatedFrom: "Isolated From cannot be empty",
      },
    };
  }
  if (!value.CoreDataSets.GeographicOrigin) {
    errors = {
      ...errors,
      CoreDataSets: {
        ...errors.CoreDataSets,
        GeographicOrigin: "Geographic Origin cannot be empty",
      },
    };
  }
  if (!value.CoreDataSets.Status) {
    errors = {
      ...errors,
      CoreDataSets: {
        ...errors.CoreDataSets,
        Status: "One of the Status must be selected",
      },
    };
  }

  if (!value.CoreDataSets.Medium) {
    errors = {
      ...errors,
      CoreDataSets: {
        ...errors.CoreDataSets,
        Medium: "Medium cannot be empty",
      },
    };
  }
  if (!value.CoreDataSets.OptimumGrowthTemperature) {
    errors = {
      ...errors,
      CoreDataSets: {
        ...errors.CoreDataSets,
        OptimumGrowthTemperature: "Optimum Growth Temperature cannot be empty",
      },
    };
  }
  if (!value.CoreDataSets.MaximumGrowthTemperature) {
    errors = {
      ...errors,
      CoreDataSets: {
        ...errors.CoreDataSets,
        MaximumGrowthTemperature: "Maximum Growth Temperature cannot be empty",
      },
    };
  }
  if (!value.CoreDataSets.MinimumGrowthTemperature) {
    errors = {
      ...errors,
      CoreDataSets: {
        ...errors.CoreDataSets,
        MinimumGrowthTemperature: "Minimum Growth Temperature cannot be empty",
      },
    };
  }

  //   Screen 2

  if (!value.Name.TaxonomyID) {
    errors = {
      ...errors,
      Name: { ...errors.Name, TaxonomyID: "Taxonomy ID cannot be empty" },
    };
  } else if (!parseInt(value.Name.TaxonomyID)) {
    errors = {
      ...errors,
      Name: { ...errors.Name, TaxonomyID: "Taxonomy ID must be a number" },
    };
  }

  //   Screen 3

  if (!value.StrainAdministration.DateOfAccession) {
    errors = {
      ...errors,
      StrainAdministration: {
        ...errors.StrainAdministration,
        DateOfAccession: "Date Of Accession cannot be empty",
      },
    };
  } else if (new Date(value.DateOfAccession) > new Date()) {
    errors = {
      ...errors,
      StrainAdministration: {
        ...errors.StrainAdministration,
        DateOfAccession: "Date of Accession cannot be in the future",
      },
    };
  }
  if (
    !value.StrainAdministration.HerbariumNo &&
    !parseInt(value.StrainAdministration.HerbariumNo)
  ) {
    errors = {
      ...errors,
      StrainAdministration: {
        ...errors.StrainAdministration,
        HerbariumNo: "Herbarium No must be a number",
      },
    };
  }
  if (
    !value.StrainAdministration.AnimalQuarantineNo &&
    !parseInt(value.StrainAdministration.AnimalQuarantineNo)
  ) {
    errors = {
      ...errors,
      StrainAdministration: {
        ...errors.StrainAdministration,
        AnimalQuarantineNo: "Animal Quarantine No must be a number",
      },
    };
  }
  if (
    !value.StrainAdministration.PlantQuarantineNo &&
    !parseInt(value.StrainAdministration.PlantQuarantineNo)
  ) {
    errors = {
      ...errors,
      StrainAdministration: {
        ...errors.StrainAdministration,
        PlantQuarantineNo: "Plant Quarantine No must be a number",
      },
    };
  }

  //   Screen 4

  if (
    !value.EnviromentAndHistory.DateOfCollection &&
    new Date(value.EnviromentAndHistory.DateOfCollection) > new Date()
  ) {
    errors = {
      ...errors,
      EnviromentAndHistory: {
        ...errors.EnviromentAndHistory,
        DateOfCollection: "Date of Collection cannot be in the future",
      },
    };
  }
  if (
    !value.EnviromentAndHistory.DateOfIdentification &&
    new Date(value.EnviromentAndHistory.DateOfIdentification) > new Date()
  ) {
    errors = {
      ...errors,
      EnviromentAndHistory: {
        ...errors.EnviromentAndHistory,
        DateOfIdentification: "Date of Identification cannot be in the future",
      },
    };
  }
  if (
    !value.EnviromentAndHistory.DateOfDeposition &&
    new Date(value.EnviromentAndHistory.DateOfDeposition) > new Date()
  ) {
    errors = {
      ...errors,
      EnviromentAndHistory: {
        ...errors.EnviromentAndHistory,
        DateOfDeposition: "Date of Deposition cannot be in the future",
      },
    };
  }

  //   Screen 10
  if (
    !value.GrowthConditions.MaximumGrowthPH &&
    !parseFloat(value.GrowthConditions.MaximumGrowthPH)
  ) {
    errors = {
      ...errors,
      GrowthConditions: {
        ...errors.GrowthConditions,
        MaximumGrowthPH: "MaximumGrowthPH must be a number",
      },
    };
  }
  if (
    !value.GrowthConditions.MinimumGrowthPH &&
    !parseFloat(value.GrowthConditions.MinimumGrowthPH)
  ) {
    errors = {
      ...errors,
      GrowthConditions: {
        ...errors.GrowthConditions,
        MinimumGrowthPH: "MinimumGrowthPH must be a number",
      },
    };
  }
  if (
    !value.GrowthConditions.MaximumNaClConcentration &&
    !parseFloat(value.GrowthConditions.MaximumNaClConcentration)
  ) {
    errors = {
      ...errors,
      GrowthConditions: {
        ...errors.GrowthConditions,
        MaximumNaClConcentration: "MaximumNaClConcentration must be a number",
      },
    };
  }
  if (
    !value.GrowthConditions.MinimumNaClConcentration &&
    !parseFloat(value.GrowthConditions.MinimumNaClConcentration)
  ) {
    errors = {
      ...errors,
      GrowthConditions: {
        ...errors.GrowthConditions,
        MinimumNaClConcentration: "MinimumNaClConcentration must be a number",
      },
    };
  }
  if (
    !value.GrowthConditions.MaximumSugarConcentration &&
    !parseFloat(value.GrowthConditions.MaximumSugarConcentration)
  ) {
    errors = {
      ...errors,
      GrowthConditions: {
        ...errors.GrowthConditions,
        MaximumSugarConcentration: "MaximumSugarConcentration must be a number",
      },
    };
  }
  if (
    !value.GrowthConditions.MinimumSugarConcentration &&
    !parseFloat(value.GrowthConditions.MinimumSugarConcentration)
  ) {
    errors = {
      ...errors,
      GrowthConditions: {
        ...errors.GrowthConditions,
        MinimumSugarConcentration: "MinimumSugarConcentration must be a number",
      },
    };
  }
  //   Screen 12

  if (!value.Medium.MediumNumber && !parseInt(value.Medium.MediumNumber)) {
    errors = {
      ...errors,
      Medium: {
        ...errors.Medium,
        MediumNumber: "Medium Number must be a number",
      },
    };
  }
  if (!value.Medium.MediumPH && !parseFloat(value.Medium.MediumPH)) {
    errors = {
      ...errors,
      Medium: { ...errors.Medium, MediumPH: "Medium PH must be a number" },
    };
  }

  //   Screen 13

  if (!value.Sequence.Length && !parseInt(value.Sequence.Length)) {
    errors = {
      ...errors,
      Sequence: { ...errors.Sequence, Length: "Length must be a number" },
    };
  }
  if (!value.Catalogue.CatalogueName) {
    errors = {
      ...errors,
      Catalogue: {
        ...errors.Catalogue,
        CatalogueName: "Catalogue Name cannot be empty",
      },
    };
  }
  // Screen 14
  // if (value.MediumNumber && !parseInt(value.MediumNumber)) {
  //   errors.MediumNumber : "Medium Number must be a number";
  // }
  // if (value.MediumPH && !parseFloat(value.MediumPH)) {
  //   errors.MediumPH : "Medium PH must be a number";
  // }
  return errors;
};

export default MicroorganismAddValidator;
