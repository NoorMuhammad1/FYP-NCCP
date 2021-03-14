const mongoose = require("mongoose");

const MicroorganismSchema = new mongoose.Schema(
  {
    CoreDataSets: {
      Genus: {
        type: String,
        required: true,
        trim: true,
        default: null,
      },
      AccessionNumber: {
        type: String,
        required: true,
        min: 4,
        trim: true,
        default: null,
        unique: true,
      },
      OtherCollectionNumbers: {
        type: Array,
      },
      SpeciesEpithet: {
        type: String,
        required: true,
        trim: true,
        default: null,
      },
      Author: {
        type: String,
        required: true,
        trim: true,
        default: null,
      },
      OrganismType: {
        type: String,
        enum: [
          "Bacteria",
          "Fungi",
          "Antibody",
          "Archaea",
          "Microalgae",
          "Phage",
          "Virus",
          "Yeast",
        ],
        required: true,
        trim: true,
        default: null,
      },
      HistoryOfDeposit: {
        type: String,
        required: true,
        trim: true,
        default: null,
      },
      DateOfIsolation: {
        type: Date,
        required: true,
        trim: true,
        default: null,
      },
      IsolatedFrom: {
        type: String,
        required: true,
        trim: true,
        default: null,
      },
      GeographicOrigin: {
        type: String,
        required: true,
        trim: true,
        default: null,
      },
      Status: {
        type: String,
        required: true,
        trim: true,
        default: null,
        enum: ["type", "no"],
        lowercase: true,
      },
      OptimumGrowthTemperature: {
        type: String,
        required: true,
        trim: true,
        default: null,
      },
      MaximumGrowthTemperature: {
        type: String,
        required: true,
        trim: true,
        default: null,
      },
      MinmumGrowthTemperature: {
        type: String,
        required: true,
        trim: true,
        default: null,
      },
      Medium: {
        type: String,
        required: true,
        trim: true,
        default: null,
      },
      Applcation: {
        type: String,
        trim: true,
        default: null,
      },
      Literature: {
        type: String,
        trim: true,
        default: null,
      },
      SecurityLevel: {
        type: String,
        enum: ["public", "private"],
        default: "public",
        trim: true,
      },
      UpdateStatus: {
        type: String,
        enum: ["Y", "N"],
        default: "Y",
        trim: true,
      },
    },
    Name: {
      TaxonomyID: {
        type: Number,
        default: null,
      },
      SecurityLevel: {
        type: String,
        enum: ["public", "private"],
        default: "public",
        trim: true,
      },
      UpdateStatus: {
        type: String,
        enum: ["Y", "N"],
        default: "Y",
        trim: true,
      },
    },
    StrainAdministration: {
      DateOfAccession: {
        type: String,
        required: true,
        trim: true,
        default: null,
      },
      HerbariumNo: {
        type: String,
        trim: true,
        default: null,
      },
      InternalIdentityCheck: {
        type: String,
        trim: true,
        default: null,
      },
      ModeOfPreservation: {
        type: String,
        required: true,
        trim: true,
        default: null,
      },
      BioHazardLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 4,
      },
      RestrictionRemarks: {
        type: String,
        trim: true,
        default: null,
      },
      CountryOfExport: {
        type: String,
        required: true,
        trim: true,
        default: null,
      },
      MTA: {
        type: String,
        required: true,
        default: "MTA",
        trim: true,
      },
      DestributionRestriction: {
        type: String,
        required: true,
        default: "Under MTA",
        trim: true,
      },
      AnimalQuarantineNo: {
        type: String,
        trim: true,
        default: null,
      },
      PlantQuarantineNo: {
        type: String,
        trim: true,
        default: null,
      },
      FormOfSupply: {
        type: String,
        required: true,
        trim: true,
        default: null,
      },
      SecurityLevel: {
        type: String,
        enum: ["public", "private"],
        default: "public",
        trim: true,
      },
      UpdateStatus: {
        type: String,
        enum: ["Y", "N"],
        default: "Y",
        trim: true,
      },
    },

    EnviromentAndHistory: {
      SubStrate: {
        type: String,
        trim: true,
        default: null,
      },
      Habitat: {
        type: String,
        trim: true,
        default: null,
      },
      Latitude: {
        type: Number,
        default: null,
      },
      Longitude: {
        type: Number,
        default: null,
      },
      Altitude: {
        type: Number,
        default: null,
      },
      Depth: {
        type: Number,
        default: null,
      },
      Humidity: {
        type: Number,
        default: null,
      },
      PH: {
        type: Number,
        default: null,
      },
      TemperatureAtCollection: {
        type: Number,
        default: null,
      },
      CollectionMethod: {
        type: String,
        trim: true,
        default: null,
      },
      DateOfCollection: {
        type: String,
        required: true,
        trim: true,
        default: null,
      },
      CountryOfCollection: {
        type: String,
        required: true,
        default: "Pakistan",
        trim: true,
      },
      StateOfCollection: {
        type: String,
      },
      RegionOfCollection: {
        type: String,
        required: true,
        trim: true,
        default: null,
      },
      CollectedBy: {
        type: String,
        required: true,
        trim: true,
        default: null,
      },
      IsolatedBy: {
        type: String,
        required: true,
        trim: true,
        default: null,
      },
      MethodOfIsolation: {
        type: String,
        trim: true,
        default: null,
      },
      IdentifiedBy: {
        type: String,
        required: true,
        trim: true,
        default: null,
      },
      DateOfIdentification: {
        type: String,
        required: true,
        trim: true,
        default: null,
      },
      DepositedBy: {
        type: String,
        required: true,
        trim: true,
        default: null,
      },
      DateOfDeposition: {
        type: String,
        required: true,
        trim: true,
        default: null,
      },
      NameAtAccept: {
        type: String,
        trim: true,
        default: null,
      },
      SecurityLevel: {
        type: String,
        enum: ["public", "private"],
        default: "public",
        trim: true,
      },
      UpdateStatus: {
        type: String,
        enum: ["Y", "N"],
        default: "Y",
        trim: true,
      },
    },
    Publication: {
      LiteratureCategories: {
        type: String,
        trim: true,
        default: null,
      },
      Title: {
        type: String,
        trim: true,
        default: null,
      },
      Author: {
        type: String,
        trim: true,
        default: null,
      },
      Journal: {
        type: String,
        trim: true,
        default: null,
      },
      Volume: {
        type: Number,
        trim: true,
        default: null,
      },
      Number: {
        type: Number,
        trim: true,
        default: null,
      },
      StartingPage: {
        type: Number,
        trim: true,
        default: null,
      },
      EndingPage: {
        type: Number,
        trim: true,
        default: null,
      },
      Year: {
        type: Number,
        trim: true,
        default: null,
      },
      DOINumber: {
        type: String,
        trim: true,
        default: null,
      },
      SecurityLevel: {
        type: String,
        enum: ["public", "private"],
        default: "public",
        trim: true,
      },
      UpdateStatus: {
        type: String,
        enum: ["Y", "N"],
        default: "Y",
        trim: true,
      },
    },
    BiologicalInteractions: {
      Symbiosis: {
        type: String,
        trim: true,
        default: null,
      },
      Microparasitism: {
        type: String,
        trim: true,
        default: null,
      },
      Pathogenicity: {
        type: String,
        trim: true,
        default: null,
      },
      Allergenicity: {
        type: String,
        trim: true,
        default: null,
      },
      OtherOrganismsToxicity: {
        type: String,
        trim: true,
        default: null,
      },
      AntagonisticActivities: {
        type: String,
        trim: true,
        default: null,
      },
      SecurityLevel: {
        type: String,
        enum: ["public", "private"],
        default: "public",
        trim: true,
      },
      UpdateStatus: {
        type: String,
        enum: ["Y", "N"],
        default: "Y",
        trim: true,
      },
    },
    Sexuality: {
      SexualBehaviour: {
        type: String,
        trim: true,
        default: null,
      },
      SexualState: {
        type: String,
        trim: true,
        default: null,
      },
      SecurityLevel: {
        type: String,
        enum: ["public", "private"],
        default: "public",
        trim: true,
      },
      UpdateStatus: {
        type: String,
        enum: ["Y", "N"],
        default: "Y",
        trim: true,
      },
    },
    Properties: {
      NumberOfNuclie: {
        type: String,
        trim: true,
        default: null,
      },
      RehydrationFluid: {
        type: String,
        trim: true,
        default: null,
      },
      FineStructureData: {
        type: String,
        trim: true,
        default: null,
      },
      WallConstituents: {
        type: String,
        trim: true,
        default: null,
      },
      CellContents: {
        type: String,
        trim: true,
        default: null,
      },
      CoenzymeQSystem: {
        type: String,
        trim: true,
        default: null,
      },
      StainingReactions: {
        type: String,
        enum: ["Positive", "Negative"],
        trim: true,
        default: null,
      },
      PigmentProduction: {
        type: String,
        trim: true,
        default: null,
      },
      CellShape: {
        type: String,
        trim: true,
        default: null,
      },
      CellSize: {
        type: String,
        trim: true,
        default: null,
      },
      Motile: {
        type: String,
        trim: true,
        default: null,
      },
      SporeForming: {
        type: String,
        trim: true,
        default: null,
      },
      MotileBy: {
        type: String,
        trim: true,
        default: null,
      },
      SecurityLevel: {
        type: String,
        enum: ["public", "private"],
        default: "public",
        trim: true,
      },
      UpdateStatus: {
        type: String,
        enum: ["Y", "N"],
        default: "Y",
        trim: true,
      },
    },
    GrnotypeAndGenetics: {
      Genotype: {
        type: String,
        trim: true,
        default: null,
      },
      Phenotype: {
        type: String,
        trim: true,
        default: null,
      },
      Matingtype: {
        type: String,
        trim: true,
        default: null,
      },
      SexualReproduction: {
        type: String,
        trim: true,
        default: null,
      },
      GCContentOfDNA: {
        type: String,
        trim: true,
        default: null,
      },
      OtherStrainsHybridization: {
        type: String,
        trim: true,
        default: null,
      },
      HybridizationStrainNumber: {
        type: String,
        trim: true,
        default: null,
      },
      TypeOfDNAOrRNA: {
        type: String,
        trim: true,
        default: null,
      },
      Percentage: {
        type: String,
        trim: true,
        default: null,
      },
      TemperatureOfHybridization: {
        type: String,
        trim: true,
        default: null,
      },
      Mutants: {
        type: String,
        trim: true,
        default: null,
      },
      MutationMethods: {
        type: String,
        trim: true,
        default: null,
      },
      Hybrids: {
        type: String,
        trim: true,
        default: null,
      },
      Plasmid: {
        type: String,
        trim: true,
        default: null,
      },
      KillerProperties: {
        type: String,
        trim: true,
        default: null,
      },
      SecurityLevel: {
        type: String,
        enum: ["public", "private"],
        default: "public",
        trim: true,
      },
      UpdateStatus: {
        type: String,
        enum: ["Y", "N"],
        default: "Y",
        trim: true,
      },
    },
    GrowthConditions: {
      ConditionsForGrowthAndMaintenanceOnSolidMedia: {
        type: String,
        trim: true,
        default: null,
      },
      ConditionsForGrowthAndMaintenanceOnLiquidMedia: {
        type: String,
        trim: true,
        default: null,
      },
      ConditionsForFruitingOrSporulation: {
        type: String,
        trim: true,
        default: null,
      },
      ConditionsForGermination: {
        type: String,
        trim: true,
        default: null,
      },
      CarbonSourcesTested: {
        type: String,
        trim: true,
        default: null,
      },
      NitrogenSourcesTested: {
        type: String,
        trim: true,
        default: null,
      },
      ConditionsForGrowthAndMaintenanceOnSolidMedia: {
        type: String,
        trim: true,
        default: null,
      },
      SingleCompoundsTested: {
        type: String,
        trim: true,
        default: null,
      },
      NutritionalRequirements: {
        type: String,
        trim: true,
        default: null,
      },
      Deficiencies: {
        type: String,
        trim: true,
        default: null,
      },
      TolerenceAndSensitivities: {
        type: String,
        trim: true,
        default: null,
      },
      TemperatureRelationships: {
        type: String,
        trim: true,
        default: null,
      },
      MaximumrowthPH: {
        type: Number,
        trim: true,
        default: null,
      },
      MinimumGrowthPH: {
        type: Number,
        trim: true,
        default: null,
      },
      OptimalGrowthPH: {
        type: String,
        trim: true,
        default: null,
      },
      LightConditions: {
        type: String,
        trim: true,
        default: null,
      },
      OxygenRelationship: {
        type: String,
        trim: true,
        default: null,
      },
      HeatResistance: {
        type: String,
        trim: true,
        default: null,
      },
      EthanolConditions: {
        type: String,
        trim: true,
        default: null,
      },
      SalinityRequirements: {
        type: String,
        trim: true,
        default: null,
      },
      OptimumNaClContentration: {
        type: String,
        trim: true,
        default: null,
      },
      MinimumNaClConcentration: {
        type: String,
        trim: true,
        default: null,
      },
      MaximumNaClConcentration: {
        type: String,
        trim: true,
        default: null,
      },
      OptimumSugarContentration: {
        type: String,
        trim: true,
        default: null,
      },
      MinimumSugarConcentration: {
        type: String,
        trim: true,
        default: null,
      },
      MaximumSugarConcentration: {
        type: String,
        trim: true,
        default: null,
      },
      OsmophilyAndXerophily: {
        type: String,
        trim: true,
        default: null,
      },
      WaterActivityConditions: {
        type: String,
        trim: true,
        default: null,
      },
      SecurityLevel: {
        type: String,
        enum: ["public", "private"],
        default: "public",
        trim: true,
      },
      UpdateStatus: {
        type: String,
        enum: ["Y", "N"],
        default: "Y",
        trim: true,
      },
    },
    ChemistryAndEnzymes: {
      EnzymesProduced: {
        type: String,
        trim: true,
        default: null,
      },
      DecompositionAndDeterioratingCapacities: {
        type: String,
        trim: true,
        default: null,
      },
      MetabolitesProduced: {
        type: String,
        trim: true,
        default: null,
      },
      Biotransformations: {
        type: String,
        trim: true,
        default: null,
      },
      SecurityLevel: {
        type: String,
        enum: ["public", "private"],
        default: "public",
        trim: true,
      },
      UpdateStatus: {
        type: String,
        enum: ["Y", "N"],
        default: "Y",
        trim: true,
      },
    },
    Medium: {
      MediumNumber: {
        type: String,
        trim: true,
        default: null,
      },
      MediumName: {
        type: String,
        trim: true,
        default: null,
      },
      MediumComposition: {
        type: String,
        trim: true,
        default: null,
      },
      MediumPH: {
        type: String,
        trim: true,
        default: null,
      },
      SecurityLevel: {
        type: String,
        enum: ["public", "private"],
        default: "public",
        trim: true,
      },
      UpdateStatus: {
        type: String,
        enum: ["Y", "N"],
        default: "Y",
        trim: true,
      },
    },
    Sequence: {
      AccessionNumber: {
        type: String,
        trim: true,
        default: null,
      },
      TargetGene: {
        type: String,
        trim: true,
        default: null,
      },
      Definition: {
        type: String,
        trim: true,
        default: null,
      },
      SequencingMethod: {
        type: String,
        trim: true,
        default: null,
      },
      Length: {
        type: String,
        trim: true,
        default: null,
      },
      Sequencetype: {
        type: String,
        trim: true,
        default: null,
      },
      Source: {
        type: String,
        trim: true,
        default: null,
      },
      Sequence: {
        type: String,
        trim: true,
        default: null,
      },
      SecurityLevel: {
        type: String,
        enum: ["public", "private"],
        default: "public",
        trim: true,
      },
      UpdateStatus: {
        type: String,
        enum: ["Y", "N"],
        default: "Y",
        trim: true,
      },
    },
    Catalogue: {
      CatalogueName: {
        type: String,
        trim: true,
        default: null,
      },
      CatalogeURL: {
        type: String,
        trim: true,
        default: null,
      },
      CatalogueUpdateTime: {
        type: String,
        trim: true,
        default: null,
      },
      ContactPersonOfCatalogue: {
        type: String,
        trim: true,
        default: null,
      },
      ContactEmail: {
        type: String,
        trim: true,
        default: null,
      },
      ContactAddress: {
        type: String,
        trim: true,
        default: null,
      },
      ContactTelephone: {
        type: String,
        trim: true,
        default: null,
      },
      ContactFax: {
        type: String,
        trim: true,
        default: null,
      },
      NumberOfStrains: {
        type: Number,
        trim: true,
        default: null,
      },
      SecurityLevel: {
        type: String,
        enum: ["public", "private"],
        default: "public",
        trim: true,
      },
      UpdateStatus: {
        type: String,
        enum: ["Y", "N"],
        default: "Y",
        trim: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Microorganism", MicroorganismSchema);
