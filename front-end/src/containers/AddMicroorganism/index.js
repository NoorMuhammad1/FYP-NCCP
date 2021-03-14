import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  addMicroorganism,
  resetAddMicroorganismState,
} from "../../actions/catalogue.actions";
import Review from "../../components/AddMicroorgansimForm/Review";
import Step1 from "../../components/AddMicroorgansimForm/Step1";
import Step10 from "../../components/AddMicroorgansimForm/Step10";
import Step11 from "../../components/AddMicroorgansimForm/Step11";
import Step12 from "../../components/AddMicroorgansimForm/Step12";
import Step13 from "../../components/AddMicroorgansimForm/Step13";
import Step14 from "../../components/AddMicroorgansimForm/Step14";
import Step2 from "../../components/AddMicroorgansimForm/Step2";
import Step3 from "../../components/AddMicroorgansimForm/Step3";
import Step4 from "../../components/AddMicroorgansimForm/Step4";
import Step5 from "../../components/AddMicroorgansimForm/Step5";
import Step6 from "../../components/AddMicroorgansimForm/Step6";
import Step7 from "../../components/AddMicroorgansimForm/Step7";
import Step8 from "../../components/AddMicroorgansimForm/Step8";
import Step9 from "../../components/AddMicroorgansimForm/Step9";
import Layout from "../../components/Layout";

function AddMicroorganism() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const added = useSelector((state) => state.catalogue.addMicroorganism.added);
  const [currentStep, setCurrentStep] = useState(14);
  const [formData, setFormData] = useState({
    CoreDataSets: {
      Genus: "",
      AccessionNumber: "",
      OtherCollection: [],
      SpeciesEpithet: "",
      Author: "",
      OrganismType: "Bacteria",
      HistoryOfDeposit: "",
      DateOfIsolation: "",
      IsolatedFrom: "",
      GeographicOrigin: "",
      Status: "Type",
      Medium: "",
      Application: "",
      Literature: "",
      OptimumGrowthTemperature: "",
      MaximumGrowthTemperature: "",
      MinimumGrowthTemperature: "",
    },
    Name: {
      TaxonomyID: "",
    },
    StrainAdministration: {
      DateOfAccession: "",
      HerbariumNo: "",
      InternalIdentityCheck: "",
      ModeOfPreservation: "",
      BioHazardLevel: "1",
      RestrictionRemarks: "",
      CountryOfExport: "",
      MTA: "",
      DistributionRestriction: "",
      AnimalQuarantineNo: "",
      PlantQuarantineNo: "",
      FormOfSupply: "",
    },
    EnviromentAndHistory: {
      SubStrate: "",
      Habitat: "",
      Latitude: "",
      Longitude: "",
      Altitude: "",
      Depth: "",
      Humidity: "",
      PHForEnviroment: "",
      TemperatureForEnviroment: "",
      CollectionMethod: "",
      DateOfCollection: "",
      CountryOfCollection: "",
      State: "",
      RegionOfCollection: "",
      CollectedBy: "",
      IsolatedBy: "",
      MethodOfIsolation: "",
      IdentifiedBy: "",
      DateOfIdentification: "",
      DepositedBy: "",
      DateOfDeposition: "",
      NameAtAccept: "",
    },
    Publication: {
      LiteratureCategories: "",
      Title: "",
      Author: "",
      Journal: "",
      Volume: "",
      Number: "",
      StartingPage: "",
      PageRange: "",
      Year: "",
      DOINumber: "",
    },
    BiologicalInteractions: {
      Symbiosis: "",
      Mycoparasitism: "",
      Pathogenicity: "",
      Allergenicity: "",
      OtherOrganismToxicity: "",
      AntagonisticActivities: "",
    },
    Sexuality: {
      SexualBehaviour: "",
      SexualState: "",
    },
    Properties: {
      NumberOfNuclei: "",
      RehyderationFluid: "",
      FineStructureData: "",
      WallConstituents: "",
      CellContents: "",
      CoenzymeQSystem: "",
      StainingReactions: "Positive",
      PigmentProduction: "",
      CellShape: "",
      CellSize: "",
      Motile: "Motile",
      SporeForming: "",
      MotileBy: "",
    },
    GenotypeAndGenetics: {
      Genotype: "",
      Phenotype: "",
      MatingType: "",
      SexualReproduction: "",
      GCContentOfDNA: "",
      OtherStrainsHybridization: "",
      HybridizationStrainNumber: "",
      TypeOfDNAOrRNA: "",
      Percentage: "",
      TemperatureOfHybridization: "",
      Mutants: "",
      MutationMethods: "",
      Hybrids: "",
      Plasmid: "",
      KillerPropertiesOfYeast: "",
    },
    GrowthConditions: {
      ConditionsForGrowthAndMaintenenceOnSolidMedia: "",
      ConditionsForGrowthInLiquidMedia: "",
      ConditionsForFruitingOrSporulation: "",
      ConditionsForGermination: "",
      CarbonSourcesTested: "",
      NitrogenSourcesTested: "",
      SingleCompoundTested: "",
      NutritionalRequirements: "",
      Deficiencies: "",
      TolerancesAndSensitivities: "",
      TemperatureRelationships: "",
      MaximumGrowthPH: "",
      MinimumGrowthPH: "",
      OptimalGrowthPH: "",
      LighConditions: "",
      OxygenRelationship: "",
      HeatResistence: "",
      EthanolConditions: "",
      SalinityRequirements: "",
      OptimalNaClConcentration: "",
      MinimumNaClConcentration: "",
      MaximumNaClConcentration: "",
      OptimumSugarConcentration: "",
      MinimumSugarConcentration: "",
      MaximumSugarConcentration: "",
      OsmophilyAndXerophily: "",
      WaterActivityConditions: "",
    },
    ChemistryAndEnzymes: {
      EnzymesProduced: "",
      DecompositionAndDeterioratingCapacities: "",
      MetabolitiesProduced: "",
      Biotransformations: "",
    },
    Medium: {
      MediumNumber: "",
      MediumName: "",
      MediumComposition: "",
      MediumPH: "",
    },
    Sequence: {
      AccessionNumber: "",
      TargetGene: "",
      Definition: "",
      SequencingMethod: "",
      Length: "",
      SequenceType: "",
      Source: "",
      Sequence: "",
    },
    Catalogue: {
      CatalogueName: "",
      CatalogueURL: "",
      CatalogueUpdateTime: "",
      ContactPersonOfCatalogue: "",
      ContactEmail: "",
      ContactAddress: "",
      ContactTelephone: "",
      ContactFax: "",
      NumberOfStrains: "",
    },
  });
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  const nextStep = (value) => {
    setFormData({
      ...formData,
      ...value,
    });
    setCurrentStep(currentStep + 1);
  };
  const prevStep = () => setCurrentStep(currentStep - 1);

  const setStep = (step) => setCurrentStep(step);
  const submit = () => {
    dispatch(addMicroorganism(formData, token));
  };

  if (added) {
    dispatch(resetAddMicroorganismState());
    return <Redirect to="/dashboard/catalogue" />;
  }

  const getStep = () => {
    switch (currentStep) {
      case 0:
        return <Step1 data={formData.CoreDataSets} next={nextStep} />;
        break;
      case 1:
        return <Step2 data={formData.Name} next={nextStep} prev={prevStep} />;
      case 2:
        return (
          <Step3
            data={formData.StrainAdministration}
            next={nextStep}
            prev={prevStep}
          />
        );
      case 3:
        return (
          <Step4
            data={formData.EnviromentAndHistory}
            next={nextStep}
            prev={prevStep}
          />
        );
      case 4:
        return (
          <Step5 data={formData.Publication} next={nextStep} prev={prevStep} />
        );
      case 5:
        return (
          <Step6
            data={formData.BiologicalInteractions}
            next={nextStep}
            prev={prevStep}
          />
        );
      case 6:
        return (
          <Step7 data={formData.Sexuality} next={nextStep} prev={prevStep} />
        );
      case 7:
        return (
          <Step8 data={formData.Properties} next={nextStep} prev={prevStep} />
        );
      case 8:
        return (
          <Step9
            data={formData.GenotypeAndGenetics}
            next={nextStep}
            prev={prevStep}
          />
        );
      case 9:
        return (
          <Step10
            data={formData.GrowthConditions}
            next={nextStep}
            prev={prevStep}
          />
        );
      case 10:
        return (
          <Step11
            data={formData.ChemistryAndEnzymes}
            next={nextStep}
            prev={prevStep}
          />
        );
      case 11:
        return (
          <Step12 data={formData.Medium} next={nextStep} prev={prevStep} />
        );
      case 12:
        return (
          <Step13 data={formData.Sequence} next={nextStep} prev={prevStep} />
        );
      case 13:
        return (
          <Step14 data={formData.Catalogue} next={nextStep} prev={prevStep} />
        );
      case 14:
        return <Review data={formData} set={setStep} submit={submit} />;
      default:
        break;
    }
  };
  return <Layout>{getStep()}</Layout>;
}

export default AddMicroorganism;
