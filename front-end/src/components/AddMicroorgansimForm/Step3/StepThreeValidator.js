const StepThreeValidator = (value) => {
  let errors = {};
  if (!value.DateOfAccession) {
    errors.DateOfAccession = 'Date Of Accession cannot be empty';
  }
  else if (new Date(value.DateOfAccession) > new Date()) {
    errors.DateOfAccession = 'Date of Accession cannot be in the future';
  }
  if (value.HerbariumNo && !parseInt(value.HerbariumNo)) {
    errors.HerbariumNo = 'Herbarium No must be a number';
  }
  if (value.AnimalQuarantineNo && !parseInt(value.AnimalQuarantineNo)) {
    errors.AnimalQuarantineNo = 'Animal Quarantine No must be a number';
  }
  if (value.PlantQuarantineNo && !parseInt(value.PlantQuarantineNo)) {
    errors.PlantQuarantineNo = 'Plant Quarantine No must be a number';
  }

  return errors;
};

export default StepThreeValidator;
