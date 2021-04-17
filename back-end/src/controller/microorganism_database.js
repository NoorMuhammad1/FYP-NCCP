const { update } = require("../models/microorganisms");
const Microorganism = require("../models/microorganisms");
const fetch = require("node-fetch");
const pupeteer = require("puppeteer-core");
const playwright = require("playwright");
var DomParser = require("dom-parser");
var parser = new DomParser();
const { parse } = require("node-html-parser");

const { isValidObjectId } = require("mongoose");
const microorganisms = require("../models/microorganisms");

exports.addMicroorganism = async (req, res) => {
  console.log(req.body.CoreDataSets.AccessionNumber);
  await Microorganism.findOne(
    {
      "CoreDataSets.AccessionNumber": req.body.CoreDataSets.AccessionNumber,
    },
    (error, data) => {
      if (error) {
        return res.status(400).json({
          mesage: error,
        });
      }
      if (data) {
        return res.status(409).json({
          message: "A record with same accession number already exists",
        });
      }
      const _microorganism = new Microorganism(generateJSON(req));
      _microorganism.save((error, record) => {
        if (error) {
          console.log("came error");
          return res.status(400).json({
            error,
          });
        }
        if (record) {
          console.log("record added successfully");
          const id = record._id;
          const full_name = `${record.CoreDataSets.Genus} ${record.CoreDataSets.SpeciesEpithet}`;
          findAccessionNumbers(id, full_name);
          return res.status(200).json({
            message: "Record added Successfully",
          });
        }
      });
    }
  );
};

exports.getSearchInfo = async (req, res) => {
  await Microorganism.find((error, data) => {
    if (error) {
      return res.status(400).json({
        error,
      });
    }
    if (data) {
      let dataArray = [];
      data.map((v, i) => {
        const { Genus, AccessionNumber, OrganismType, Status } = v.CoreDataSets;
        const id = v.id;
        dataArray.push({ id, Genus, AccessionNumber, OrganismType, Status });
      });
      return res.status(200).json({
        dataArray,
      });
    }
  });
};
exports.findMicroorganism = async (req, res) => {
  console.log("A request came");
  const { id, role } = req.body;
  const prop_exclude =
    role === "external"
      ? "-createdAt -updatedAt -__v -_id -CoreDataSets.SecurityLevel -CoreDataSets.UpdateStatus"
      : "";
  await Microorganism.findById(id, prop_exclude, (error, data) => {
    if (error) {
      return res.status(400).json({
        error,
      });
    }
    if (data) {
      return res.status(200).json(data);
    }
    if ((error && data) === null)
      return res.status(404).json({
        message: "The requested data does not exist in the database",
      });
  });

  // await Microorganism.find(
  //   {
  //     ...(parameters.length <= 0
  //       ? {}
  //       : {
  //           $or: [
  //             ...(parameters.includes("AccessionNumber")
  //               ? [
  //                   {
  //                     "CoreDataSets.AccessionNumber": {
  //                       $regex: "^" + searchString,
  //                       $options: "$i",
  //                     },
  //                   },
  //                 ]
  //               : []),
  //             ...(parameters.includes("Genus")
  //               ? [
  //                   {
  //                     "CoreDataSets.Genus": {
  //                       $regex: "^" + searchString,
  //                       $options: "$i",
  //                     },
  //                   },
  //                 ]
  //               : []),
  //           ],
  //         }),
  //   },
  //   (error, data) => {
  //     if (error) {
  //       return res.status(400).json({
  //         error,
  //       });
  //     }
  //     if (data) {
  //       return res.status(200).json({
  //         data,
  //       });
  //     }
  //   }
  // );
};

const flattenData = (data) => {
  return data.map((item) => {
    return {
      ...item.CoreDataSets,
      id: item._id,
    };
  });
};

exports.getCatalogueData = async (req, res) => {
  await Microorganism.find(
    {},
    "CoreDataSets.Genus CoreDataSets.SpeciesEpithet CoreDataSets.AccessionNumber CoreDataSets.OrganismType CoreDataSets.Status StrainAdministration.BioHazardLevel",
    (error, data) => {
      if (error) {
        return res.status(400).json({
          error,
        });
      }
      if (data) {
        const return_data = data.map((item) => {
          return {
            ...JSON.parse(JSON.stringify({ ...item.CoreDataSets })),
            BioHazardLevel: item.StrainAdministration.BioHazardLevel,
            id: item._id,
          };
        });
        return res.status(200).json(return_data);
      } else {
        return res.status(401).json({
          message: "There is no catalogue",
        });
      }
    }
  );
};

exports.deleteMicroorganism = (req, res) => {
  const { id } = req.body;
  Microorganism.findByIdAndDelete(id, (error, data) => {
    if (error) {
      return res.status(400).json({
        error,
      });
    }
    if (data) {
      return res.status(200).json({
        message: "Successfully deleted the data",
      });
    } else {
      return res.status(401).json({
        message: "No such microorganism record exists in the database",
      });
    }
  });
};

exports.updateMicroorganism = (req, res) => {
  updateObject = generateJSON(req);
  updatedObject = {};
  for (value in updateObject) {
    if (Object.entries(value).length > 0) {
      for (v in updateObject[value]) {
        updatedObject[`${value}.${v}`] = updateObject[value][v];
      }
    }
  }
  Microorganism.updateOne(
    { "CoreDataSets.AccessionNumber": req.body.AccessionNumber },
    { $set: updatedObject },
    (error, data) => {
      if (error) {
        return res.status(400).json({
          error,
        });
      }
      if (data.n > 0) {
        return res.status(401).json({
          message: "Data updated Successfully",
        });
      } else {
        return res.status(401).json({
          message: "No such microorganism record exists in the database",
        });
      }
    }
  );
};

const scrapeKCTC = async (microorganism_name) => {
  const browser = await playwright.chromium.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(
    `https://kctc.kribb.re.kr/EN/search/resourceSearchResult?pageNumber=1&searchKeyword=${microorganism_name}&category=&selectAll=false&dna=false&typeStrain=false&engOpen=yes&protect=N`
  );
  return await page.evaluate((microorganism_name) => {
    let rows = document.querySelectorAll("#desktop_list tr");
    let accession_numbers = [];
    rows.forEach((row) => {
      item_name = row.querySelector("td").innerText;
      if (item_name.toLowerCase() === microorganism_name.toLowerCase()) {
        const kctc_accession_number = row
          .querySelector("td:nth-child(2)")
          .innerText.split("\n")[0];
        accession_numbers.push(`KCTC ${kctc_accession_number}`);
        console.log(accession_numbers);
        other_accession_numbers = row
          .querySelector("td:nth-child(6)")
          .innerText.split(",");
        accession_numbers.push(...other_accession_numbers);
      }
    });
    return accession_numbers;
  }, microorganism_name);
};

const scrapeDSMZ = async (microorganism_name) => {
  const item = "sdfgl;sdjgoklsdrjfgt9weujfskodljfnsdklf";
  const response = await fetch(
    "https://www.dsmz.de/collection/catalogue/microorganisms/catalogue?type=2601231117",
    {
      headers: {
        accept: "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua":
          '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
      },
      referrer:
        "https://www.dsmz.de/collection/catalogue/microorganisms/catalogue",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: `controller=user_dsmz_catalogue_products&data%5Bfilter%5D%5Bproduct_group%5D=1%2C19%2C12%2C6%2C10%2C14&data%5Bfilter%5D%5Bsearch_term%5D=${microorganism_name}&data%5Boffset%5D=0&data%5BjsLib%5D=jsLib_1333&action=getResults`,
      method: "POST",
      mode: "cors",
    }
  );
  const data = await response.json();
  if (data.data.results.trim().length === 0) {
    return [];
  } else {
    const root = parse(data.data.results);
    const results = root.querySelectorAll(".product-details");
    const re = [];
    results.map((i) => {
      const name = i.querySelectorAll(".name a")[0].innerHTML;
      if (name.toLowerCase() === microorganism_name.toLowerCase()) {
        re.push(
          ...i
            .querySelector(".other-collection-no .value")
            .innerText.split(",")
            .map((item) => item.trim())
        );
        //   console.log(
        //     `https://www.dsmz.de${i.querySelectorAll(".name a")[0].attrs.href}`
        //   );
        //   re.push({
        //     name,
        //     accessionNumber: i.querySelectorAll(".dsm-no")[0].innerHTML,
        //     other: i
        //       .querySelector(".other-collection-no .value")
        //       .innerText.split(",")
        //       .map((item) => item.trim()),
        //     link: `https://www.dsmz.de${
        //       i.querySelectorAll(".name a")[0].attrs.href
        //     }`,
        //   });
        // }
      }
    });
    return re;
  }
};

const findAccessionNumbers = async (id, microorganism_name) => {
  const kctc = await scrapeKCTC(microorganism_name);
  const dsmz = await scrapeDSMZ(microorganism_name);
  const accession_numbers = [...new Set(kctc.concat(dsmz))];
  await Microorganism.updateOne(
    { _id: id },
    {
      $set: {
        "CoreDataSets.OtherCollectionNumbers": accession_numbers,
      },
    },
    (error, response) => {
      if (error) {
        console.log("error", error);
      }
      if (response) {
        console.log("response", response);
      }
    }
  );
};

exports.fetchData = async (req, res) => {
  const kctc = await scrapeKCTC("Bacillus pakistanensis");
  const dsmz = await scrapeDSMZ("Bacillus pakistanensis");
  const accession_numbers = [...new Set(kctc.concat(dsmz))];
  console.log(accession_numbers);
  await Microorganism.updateOne({}, {}, (error, response) => {
    if (error) {
      console.log("error", error);
    }
    if (response) {
      console.log("response", response);
    }
  });
};

generateJSON = (req) => {
  return {
    ...(req.body.CoreDataSets
      ? {
          CoreDataSets: {
            ...(req.body.CoreDataSets.Genus != undefined
              ? { Genus: req.body.CoreDataSets.Genus }
              : {}),
            ...(req.body.CoreDataSets.AccessionNumber != undefined
              ? { AccessionNumber: req.body.CoreDataSets.AccessionNumber }
              : {}),
            ...(req.body.CoreDataSets.OtherCollectionNumbers != undefined
              ? {
                  OtherCollectionNumbers:
                    req.body.CoreDataSets.OtherCollectionNumbers,
                }
              : {}),
            ...(req.body.CoreDataSets.SpeciesEpithet != undefined
              ? { SpeciesEpithet: req.body.CoreDataSets.SpeciesEpithet }
              : {}),
            ...(req.body.CoreDataSets.Author != undefined
              ? { Author: req.body.CoreDataSets.Author }
              : {}),
            ...(req.body.CoreDataSets.OrganismType != undefined
              ? { OrganismType: req.body.CoreDataSets.OrganismType }
              : {}),
            ...(req.body.CoreDataSets.HistoryOfDeposit != undefined
              ? { HistoryOfDeposit: req.body.CoreDataSets.HistoryOfDeposit }
              : {}),
            ...(req.body.CoreDataSets.DateOfIsolation != undefined
              ? { DateOfIsolation: req.body.CoreDataSets.DateOfIsolation }
              : {}),
            ...(req.body.CoreDataSets.IsolatedFrom != undefined
              ? { IsolatedFrom: req.body.CoreDataSets.IsolatedFrom }
              : {}),
            ...(req.body.CoreDataSets.GeographicOrigin != undefined
              ? { GeographicOrigin: req.body.CoreDataSets.GeographicOrigin }
              : {}),
            ...(req.body.CoreDataSets.Status != undefined
              ? { Status: req.body.CoreDataSets.Status }
              : {}),
            ...(req.body.CoreDataSets.Medium != undefined
              ? { Medium: req.body.CoreDataSets.Medium }
              : {}),
            ...(req.body.CoreDataSets.Application != undefined
              ? { Application: req.body.CoreDataSets.Application }
              : {}),
            ...(req.body.CoreDataSets.Literature != undefined
              ? { Literature: req.body.CoreDataSets.Literature }
              : {}),
            ...(req.body.CoreDataSets.SecurityLevel != undefined
              ? { SecurityLevel: req.body.CoreDataSets.SecurityLevel }
              : {}),
            ...(req.body.CoreDataSets.UpdateStatus != undefined
              ? { Genus: req.body.CoreDataSets.Genus }
              : {}),
            ...(req.body.CoreDataSets.OptimumGrowthTemperature != undefined
              ? {
                  OptimumGrowthTemerature:
                    req.body.CoreDataSets.OptimumGrowthTemperature,
                }
              : {}),
            ...(req.body.CoreDataSets.MaximumGrowthTemperature != undefined
              ? {
                  MaximumGrowthTemperature:
                    req.body.CoreDataSets.MaximumGrowthTemperature,
                }
              : {}),
            ...(req.body.CoreDataSets.MinimumGrowthTemperature != undefined
              ? {
                  MinimumGrowthTemperature:
                    req.body.CoreDataSets.MinimumGrowthTemperature,
                }
              : {}),
          },
        }
      : {}),
    ...(req.body.Name
      ? {
          Name: {
            ...(req.body.Name.TaxonomyID != undefined
              ? {
                  TaxonomyID: req.body.Name.TaxonomyID,
                }
              : {}),
            ...(req.body.Name.SecurityLevel != undefined
              ? {
                  SecurityLevel: req.body.Name.SecurityLevel,
                }
              : {}),
            ...(req.body.Name.UpdateStatus != undefined
              ? {
                  UpdateStatus: req.body.Name.UpdateStatus,
                }
              : {}),
          },
        }
      : {}),
    ...(req.body.StrainAdministration
      ? {
          StrainAdministration: {
            ...(req.body.StrainAdministration.DateOfAccession != undefined
              ? {
                  DateOfAccession:
                    req.body.StrainAdministration.DateOfAccession,
                }
              : {}),
            ...(req.body.StrainAdministration.HerbariumNo != undefined
              ? {
                  HerbariumNo: req.body.StrainAdministration.HerbariumNo,
                }
              : {}),
            ...(req.body.StrainAdministration.InternalIdentityCheck != undefined
              ? {
                  InternalIdentityCheck:
                    req.body.StrainAdministration.InternalIdentityCheck,
                }
              : {}),
            ...(req.body.StrainAdministration.ModeOfPreservation != undefined
              ? {
                  ModeOfPreservation:
                    req.body.StrainAdministration.ModeOfPreservation,
                }
              : {}),
            ...(req.body.StrainAdministration.RestrictionRemarks != undefined
              ? {
                  RestrictionRemarks:
                    req.body.StrainAdministration.RestrictionRemarks,
                }
              : {}),
            ...(req.body.StrainAdministration.CountryOfExport != undefined
              ? {
                  CountryOfExport:
                    req.body.StrainAdministration.CountryOfExport,
                }
              : {}),
            ...(req.body.StrainAdministration.MTA != undefined
              ? {
                  MTA: req.body.StrainAdministration.MTA,
                }
              : {}),
            ...(req.body.StrainAdministration.DestributionRestriction !=
            undefined
              ? {
                  DestributionRestriction:
                    req.body.StrainAdministration.DestributionRestriction,
                }
              : {}),
            ...(req.body.StrainAdministration.AnimalQuarantineNo != undefined
              ? {
                  AnimalQuarantineNo:
                    req.body.StrainAdministration.AnimalQuarantineNo,
                }
              : {}),
            ...(req.body.StrainAdministration.PlantQuarantineNo != undefined
              ? {
                  PlantQuarantineNo:
                    req.body.StrainAdministration.PlantQuarantineNo,
                }
              : {}),
            ...(req.body.StrainAdministration.FormOfSupply != undefined
              ? {
                  FormOfSupply: req.body.StrainAdministration.FormOfSupply,
                }
              : {}),
            ...(req.body.StrainAdministration.SecurityLevel != undefined
              ? {
                  SecurityLevel: req.body.StrainAdministration.SecurityLevel,
                }
              : {}),
            ...(req.body.StrainAdministration.UpdateStatus != undefined
              ? {
                  UpdateStatus: req.body.StrainAdministration.UpdateStatus,
                }
              : {}),
          },
        }
      : {}),
    ...(req.body.EnviromentAndHistory
      ? {
          EnviromentAndHistory: {
            ...(req.body.EnviromentAndHistory.SubStrate != undefined
              ? {
                  SubStrate: req.body.EnviromentAndHistory.SubStrate,
                }
              : {}),
            ...(req.body.EnviromentAndHistory.Habitat != undefined
              ? {
                  Habitat: req.body.EnviromentAndHistory.Habitat,
                }
              : {}),
            ...(req.body.EnviromentAndHistory.Latitude != undefined
              ? {
                  Latitude: req.body.EnviromentAndHistory.Latitude,
                }
              : {}),
            ...(req.body.EnviromentAndHistory.Longitude != undefined
              ? {
                  Longitude: req.body.EnviromentAndHistory.Longitude,
                }
              : {}),
            ...(req.body.EnviromentAndHistory.Altitude != undefined
              ? {
                  Altitude: req.body.EnviromentAndHistory.Altitude,
                }
              : {}),
            ...(req.body.EnviromentAndHistory.Depth != undefined
              ? {
                  Depth: req.body.EnviromentAndHistory.Depth,
                }
              : {}),
            ...(req.body.EnviromentAndHistory.Humidity != undefined
              ? {
                  Humidity: req.body.EnviromentAndHistory.Humidity,
                }
              : {}),
            ...(req.body.EnviromentAndHistory.PHForEnviroment != undefined
              ? {
                  PHForEnviroment:
                    req.body.EnviromentAndHistory.PHForEnviroment,
                }
              : {}),
            ...(req.body.EnviromentAndHistory.TemperatureForEnviroment !=
            undefined
              ? {
                  TemperatureForEnviroment:
                    req.body.EnviromentAndHistory.TemperatureForEnviroment,
                }
              : {}),
            ...(req.body.EnviromentAndHistory.CollectionMethod != undefined
              ? {
                  CollectionMethod:
                    req.body.EnviromentAndHistory.CollectionMethod,
                }
              : {}),
            ...(req.body.EnviromentAndHistory.DateOfCollection != undefined
              ? {
                  DateOfCollection:
                    req.body.EnviromentAndHistory.DateOfCollection,
                }
              : {}),
            ...(req.body.EnviromentAndHistory.CountryOfCollection != undefined
              ? {
                  CountryOfCollection:
                    req.body.EnviromentAndHistory.CountryOfCollection,
                }
              : {}),
            ...(req.body.EnviromentAndHistory.RegionOfCollection != undefined
              ? {
                  RegionOfCollection:
                    req.body.EnviromentAndHistory.RegionOfCollection,
                }
              : {}),
            ...(req.body.EnviromentAndHistory.CollectedBy != undefined
              ? {
                  CollectedBy: req.body.EnviromentAndHistory.CollectedBy,
                }
              : {}),
            ...(req.body.EnviromentAndHistory.IsolatedBy != undefined
              ? {
                  IsolatedBy: req.body.EnviromentAndHistory.IsolatedBy,
                }
              : {}),
            ...(req.body.EnviromentAndHistory.MethodOfIsolation != undefined
              ? {
                  MethodOfIsolation:
                    req.body.EnviromentAndHistory.MethodOfIsolation,
                }
              : {}),
            ...(req.body.EnviromentAndHistory.IdentifiedBy != undefined
              ? {
                  IdentifiedBy: req.body.EnviromentAndHistory.IdentifiedBy,
                }
              : {}),
            ...(req.body.EnviromentAndHistory.DateOfIdentification != undefined
              ? {
                  DateOfIdentification:
                    req.body.EnviromentAndHistory.DateOfIdentification,
                }
              : {}),
            ...(req.body.EnviromentAndHistory.DepositedBy != undefined
              ? {
                  DepositedBy: req.body.EnviromentAndHistory.DepositedBy,
                }
              : {}),
            ...(req.body.EnviromentAndHistory.DateOfDeposition != undefined
              ? {
                  DateOfDeposition:
                    req.body.EnviromentAndHistory.DateOfDeposition,
                }
              : {}),
            ...(req.body.EnviromentAndHistory.NameAtAccept != undefined
              ? {
                  NameAtAccept: req.body.EnviromentAndHistory.NameAtAccept,
                }
              : {}),
            ...(req.body.EnviromentAndHistory.SecurityLevel != undefined
              ? {
                  SecurityLevel: req.body.EnviromentAndHistory.SecurityLevel,
                }
              : {}),
            ...(req.body.EnviromentAndHistory.UpdateStatus != undefined
              ? {
                  UpdateStatus: req.body.EnviromentAndHistory.UpdateStatus,
                }
              : {}),
          },
        }
      : {}),
    ...(req.body.Publication
      ? {
          Publication: {
            ...(req.body.Publication.LiteratureCategories != undefined
              ? {
                  LiteratureCategories:
                    req.body.Publication.LiteratureCategories,
                }
              : {}),
            ...(req.body.Publication.Title != undefined
              ? {
                  Title: req.body.Publication.Title,
                }
              : {}),
            ...(req.body.Publication.Author != undefined
              ? {
                  Author: req.body.Publication.Author,
                }
              : {}),
            ...(req.body.Publication.Journal != undefined
              ? {
                  Journal: req.body.Publication.Journal,
                }
              : {}),
            ...(req.body.Publication.Volume != undefined
              ? {
                  Volume: req.body.Publication.Volume,
                }
              : {}),
            ...(req.body.Publication.Number != undefined
              ? {
                  Number: req.body.Publication.Number,
                }
              : {}),
            ...(req.body.Publication.StartingPage != undefined
              ? {
                  StartingPage: req.body.Publication.StartingPage,
                }
              : {}),
            ...(req.body.Publication.EndingPage != undefined
              ? {
                  EndingPage: req.body.Publication.EndingPage,
                }
              : {}),
            ...(req.body.Publication.Year != undefined
              ? {
                  Year: req.body.Publication.Year,
                }
              : {}),
            ...(req.body.Publication.DOINumber != undefined
              ? {
                  DOINumber: req.body.Publication.DOINumber,
                }
              : {}),
            ...(req.body.Publication.SecurityLevel != undefined
              ? {
                  SecurityLevel: req.body.Publication.SecurityLevel,
                }
              : {}),
            ...(req.body.Publication.UpdateStatus != undefined
              ? {
                  UpdateStatus: req.body.Publication.UpdateStatus,
                }
              : {}),
          },
        }
      : {}),
    ...(req.body.BiologicalInteractions
      ? {
          BiologicalInteractions: {
            ...(req.body.BiologicalInteractions.Symbiosis != undefined
              ? {
                  Symbiosis: req.body.BiologicalInteractions.Symbiosis,
                }
              : {}),
            ...(req.body.BiologicalInteractions.Microparasitism != undefined
              ? {
                  Microparasitism:
                    req.body.BiologicalInteractions.Microparasitism,
                }
              : {}),
            ...(req.body.BiologicalInteractions.Pathogenicity != undefined
              ? {
                  Pathogenicity: req.body.BiologicalInteractions.Pathogenicity,
                }
              : {}),
            ...(req.body.BiologicalInteractions.Allergenicity != undefined
              ? {
                  Allergenicity: req.body.BiologicalInteractions.Allergenicity,
                }
              : {}),
            ...(req.body.BiologicalInteractions.OtherOrganismToxicity !=
            undefined
              ? {
                  OtherOrganismToxicity:
                    req.body.BiologicalInteractions.OtherOrganismToxicity,
                }
              : {}),
            ...(req.body.BiologicalInteractions.AntagonisticActivities !=
            undefined
              ? {
                  AntagonisticActivities:
                    req.body.BiologicalInteractions.AntagonisticActivities,
                }
              : {}),
            ...(req.body.BiologicalInteractions.SecurityLevel != undefined
              ? {
                  SecurityLevel: req.body.BiologicalInteractions.SecurityLevel,
                }
              : {}),
            ...(req.body.BiologicalInteractions.UpdateStatus != undefined
              ? {
                  UpdateStatus: req.body.BiologicalInteractions.UpdateStatus,
                }
              : {}),
          },
        }
      : {}),
    ...(req.body.Sexuality
      ? {
          Sexuality: {
            ...(req.body.Sexuality.SexualBehaviour != undefined
              ? {
                  SexualBehaviour: req.body.Sexuality.SexualBehaviour,
                }
              : {}),
            ...(req.body.Sexuality.SexualState != undefined
              ? {
                  SexualState: req.body.Sexuality.SexualState,
                }
              : {}),
            ...(req.body.Sexuality.SecurityLevel != undefined
              ? {
                  SecurityLevel: req.body.Sexuality.SecurityLevel,
                }
              : {}),
            ...(req.body.Sexuality.UpdateStatus != undefined
              ? {
                  UpdateStatus: req.body.Sexuality.UpdateStatus,
                }
              : {}),
          },
        }
      : {}),
    ...(req.body.Properties
      ? {
          Properties: {
            ...(req.body.Properties.NumberOfNuclie != undefined
              ? {
                  NumberOfNuclie: req.body.Properties.NumberOfNuclie,
                }
              : {}),
            ...(req.body.Properties.RehydrationFluid != undefined
              ? {
                  RehydrationFluid: req.body.Properties.RehydrationFluid,
                }
              : {}),
            ...(req.body.Properties.FineStructureData != undefined
              ? {
                  FineStructureData: req.body.Properties.FineStructureData,
                }
              : {}),
            ...(req.body.Properties.WallConstituents != undefined
              ? {
                  WallConstituents: req.body.Properties.WallConstituents,
                }
              : {}),
            ...(req.body.Properties.CellContents != undefined
              ? {
                  CellContents: req.body.Properties.CellContents,
                }
              : {}),
            ...(req.body.Properties.CoenzymeQSystem != undefined
              ? {
                  CoenzymeQSystem: req.body.Properties.CoenzymeQSystem,
                }
              : {}),
            ...(req.body.Properties.StainingReactions != undefined
              ? {
                  StainingReactions: req.body.Properties.StainingReactions,
                }
              : {}),
            ...(req.body.Properties.PigmentProduction != undefined
              ? {
                  PigmentProduction: req.body.Properties.PigmentProduction,
                }
              : {}),
            ...(req.body.Properties.CellShape != undefined
              ? {
                  CellShape: req.body.Properties.CellShape,
                }
              : {}),
            ...(req.body.Properties.CellSize != undefined
              ? {
                  CellSize: req.body.Properties.CellSize,
                }
              : {}),
            ...(req.body.Properties.Motile != undefined
              ? {
                  Motile: req.body.Properties.Motile,
                }
              : {}),
            ...(req.body.Properties.SporeForming != undefined
              ? {
                  SporeForming: req.body.Properties.SporeForming,
                }
              : {}),
            ...(req.body.Properties.MotileBy != undefined
              ? {
                  MotileBy: req.body.Properties.MotileBy,
                }
              : {}),
            ...(req.body.Properties.SecurityLevel != undefined
              ? {
                  SecurityLevel: req.body.Properties.SecurityLevel,
                }
              : {}),
            ...(req.body.Properties.UpdateStatus != undefined
              ? {
                  UpdateStatus: req.body.Properties.UpdateStatus,
                }
              : {}),
          },
        }
      : {}),
    ...(req.body.GrnotypeAndGenetics
      ? {
          GrnotypeAndGenetics: {
            ...(req.body.GrnotypeAndGenetics.Genotype != undefined
              ? {
                  Genotype: req.body.GrnotypeAndGenetics.Genotype,
                }
              : {}),
            ...(req.body.GrnotypeAndGenetics.Phenotype != undefined
              ? {
                  Phenotype: req.body.GrnotypeAndGenetics.Phenotype,
                }
              : {}),
            ...(req.body.GrnotypeAndGenetics.MatingType != undefined
              ? {
                  MatingType: req.body.GrnotypeAndGenetics.MatingType,
                }
              : {}),
            ...(req.body.GrnotypeAndGenetics.SexualReproduction != undefined
              ? {
                  SexualReproduction:
                    req.body.GrnotypeAndGenetics.SexualReproduction,
                }
              : {}),
            ...(req.body.GrnotypeAndGenetics.GCContentOfDNA != undefined
              ? {
                  GCContentOfDNA: req.body.GrnotypeAndGenetics.GCContentOfDNA,
                }
              : {}),
            ...(req.body.GrnotypeAndGenetics.OtherStrainsHybridization !=
            undefined
              ? {
                  OtherStrainsHybridization:
                    req.body.GrnotypeAndGenetics.OtherStrainsHybridization,
                }
              : {}),
            ...(req.body.GrnotypeAndGenetics.HybridizationStrainNumber !=
            undefined
              ? {
                  HybridizationStrainNumber:
                    req.body.GrnotypeAndGenetics.HybridizationStrainNumber,
                }
              : {}),
            ...(req.body.GrnotypeAndGenetics.TypeOfDNAOrRNA != undefined
              ? {
                  TypeOfDNAOrRNA: req.body.GrnotypeAndGenetics.TypeOfDNAOrRNA,
                }
              : {}),
            ...(req.body.GrnotypeAndGenetics.Percentage != undefined
              ? {
                  Percentage: req.body.GrnotypeAndGenetics.Percentage,
                }
              : {}),
            ...(req.body.GrnotypeAndGenetics.TemperatureOfHybridization !=
            undefined
              ? {
                  TemperatureOfHybridization:
                    req.body.GrnotypeAndGenetics.TemperatureOfHybridization,
                }
              : {}),
            ...(req.body.GrnotypeAndGenetics.Mutants != undefined
              ? {
                  Mutants: req.body.GrnotypeAndGenetics.Mutants,
                }
              : {}),
            ...(req.body.GrnotypeAndGenetics.MutationMethods != undefined
              ? {
                  MutationMethods: req.body.GrnotypeAndGenetics.MutationMethods,
                }
              : {}),
            ...(req.body.GrnotypeAndGenetics.Hybrids != undefined
              ? {
                  Hybrids: req.body.GrnotypeAndGenetics.Hybrids,
                }
              : {}),
            ...(req.body.GrnotypeAndGenetics.Plasmid != undefined
              ? {
                  Plasmid: req.body.GrnotypeAndGenetics.Plasmid,
                }
              : {}),
            ...(req.body.GrnotypeAndGenetics.KillerProperties != undefined
              ? {
                  KillerProperties:
                    req.body.GrnotypeAndGenetics.KillerProperties,
                }
              : {}),
            ...(req.body.GrnotypeAndGenetics.SecurityLevel != undefined
              ? {
                  SecurityLevel: req.body.GrnotypeAndGenetics.SecurityLevel,
                }
              : {}),
            ...(req.body.GrnotypeAndGenetics.UpdateStatus != undefined
              ? {
                  UpdateStatus: req.body.GrnotypeAndGenetics.UpdateStatus,
                }
              : {}),
          },
        }
      : {}),
    ...(req.body.GrowthConditions
      ? {
          GrowthConditions: {
            ...(req.body.GrowthConditions
              .ConditionsForGrowthAndMaintenanceOnSolidMedia != undefined
              ? {
                  ConditionsForGrowthAndMaintenanceOnSolidMedia:
                    req.body.GrowthConditions
                      .ConditionsForGrowthAndMaintenanceOnSolidMedia,
                }
              : {}),
            ...(req.body.GrowthConditions
              .ConditionsForGrowthAndMaintenanceInLiquidMedia != undefined
              ? {
                  ConditionsForGrowthAndMaintenanceInLiquidMedia:
                    req.body.GrowthConditions
                      .ConditionsForGrowthAndMaintenanceInLiquidMedia,
                }
              : {}),
            ...(req.body.GrowthConditions.ConditionsForFruitingOrSporulation !=
            undefined
              ? {
                  ConditionsForFruitingOrSporulation:
                    req.body.GrowthConditions
                      .ConditionsForFruitingOrSporulation,
                }
              : {}),
            ...(req.body.GrowthConditions.ConditionsForGermination != undefined
              ? {
                  ConditionsForGermination:
                    req.body.GrowthConditions.ConditionsForGermination,
                }
              : {}),
            ...(req.body.GrowthConditions.CarbonSourcesTested != undefined
              ? {
                  CarbonSourcesTested:
                    req.body.GrowthConditions.CarbonSourcesTested,
                }
              : {}),
            ...(req.body.GrowthConditions.NitrogenSourcesTested != undefined
              ? {
                  NitrogenSourcesTested:
                    req.body.GrowthConditions.NitrogenSourcesTested,
                }
              : {}),
            ...(req.body.GrowthConditions.SingleCompoundTested != undefined
              ? {
                  SingleCompoundTested:
                    req.body.GrowthConditions.SingleCompoundTested,
                }
              : {}),
            ...(req.body.GrowthConditions.NutritionalRequirements != undefined
              ? {
                  NutritionalRequirements:
                    req.body.GrowthConditions.NutritionalRequirements,
                }
              : {}),
            ...(req.body.GrowthConditions.Deficiencies != undefined
              ? {
                  Deficiencies: req.body.GrowthConditions.Deficiencies,
                }
              : {}),
            ...(req.body.GrowthConditions.TolerenceAndSensitivities != undefined
              ? {
                  TolerenceAndSensitivities:
                    req.body.GrowthConditions.TolerenceAndSensitivities,
                }
              : {}),
            ...(req.body.GrowthConditions.TemperatureRelationships != undefined
              ? {
                  TemperatureRelationships:
                    req.body.GrowthConditions.TemperatureRelationships,
                }
              : {}),
            ...(req.body.GrowthConditions.MaximumGrowthPH != undefined
              ? {
                  MaximumGrowthPH: req.body.GrowthConditions.MaximumGrowthPH,
                }
              : {}),
            ...(req.body.GrowthConditions.MinimumGrowthPH != undefined
              ? {
                  MinimumGrowthPH: req.body.GrowthConditions.MinimumGrowthPH,
                }
              : {}),
            ...(req.body.GrowthConditions.OptimalGrowthPH != undefined
              ? {
                  OptimalGrowthPH: req.body.GrowthConditions.OptimalGrowthPH,
                }
              : {}),
            ...(req.body.GrowthConditions.LightConditions != undefined
              ? {
                  LightConditions: req.body.GrowthConditions.LightConditions,
                }
              : {}),
            ...(req.body.GrowthConditions.OxygenRelationship != undefined
              ? {
                  OxygenRelationship:
                    req.body.GrowthConditions.OxygenRelationship,
                }
              : {}),
            ...(req.body.GrowthConditions.HeatResisitance != undefined
              ? {
                  HeatResisitance: req.body.GrowthConditions.HeatResisitance,
                }
              : {}),
            ...(req.body.GrowthConditions.EthanolConditions != undefined
              ? {
                  EthanolConditions:
                    req.body.GrowthConditions.EthanolConditions,
                }
              : {}),
            ...(req.body.GrowthConditions.SalinityRequirements != undefined
              ? {
                  SalinityRequirements:
                    req.body.GrowthConditions.SalinityRequirements,
                }
              : {}),
            ...(req.body.GrowthConditions.OptimalNaClConcentration != undefined
              ? {
                  OptimalNaClConcentration:
                    req.body.GrowthConditions.OptimalNaClConcentration,
                }
              : {}),
            ...(req.body.GrowthConditions.MinimumNaClConcentration != undefined
              ? {
                  MinimumNaClConcentration:
                    req.body.GrowthConditions.MinimumNaClConcentration,
                }
              : {}),
            ...(req.body.GrowthConditions.MaximumNaClConcentration != undefined
              ? {
                  MaximumNaClConcentration:
                    req.body.GrowthConditions.MaximumNaClConcentration,
                }
              : {}),
            ...(req.body.GrowthConditions.OptimumSugarConcentration != undefined
              ? {
                  OptimumSugarConcentration:
                    req.body.GrowthConditions.OptimumSugarConcentration,
                }
              : {}),
            ...(req.body.GrowthConditions.MinimumSugarConcentration != undefined
              ? {
                  MinimumSugarConcentration:
                    req.body.GrowthConditions.MinimumSugarConcentration,
                }
              : {}),
            ...(req.body.GrowthConditions.MaximumSugarConcentration != undefined
              ? {
                  MaximumSugarConcentration:
                    req.body.GrowthConditions.MaximumSugarConcentration,
                }
              : {}),
            ...(req.body.GrowthConditions.OsmophilyAndXerophily != undefined
              ? {
                  OsmophilyAndXerophily:
                    req.body.GrowthConditions.OsmophilyAndXerophily,
                }
              : {}),
            ...(req.body.GrowthConditions.WaterActivityConditions != undefined
              ? {
                  WaterActivityConditions:
                    req.body.GrowthConditions.WaterActivityConditions,
                }
              : {}),
            ...(req.body.GrowthConditions.SecurityLevel != undefined
              ? {
                  SecurityLevel: req.body.GrowthConditions.SecurityLevel,
                }
              : {}),
            ...(req.body.GrowthConditions.UpdateStatus != undefined
              ? {
                  UpdateStatus: req.body.GrowthConditions.UpdateStatus,
                }
              : {}),
          },
        }
      : {}),
    ...(req.body.ChemistryAndEnzymes
      ? {
          ChemistryAndEnzymes: {
            ...(req.body.ChemistryAndEnzymes.EnzymesProduced != undefined
              ? {
                  EnzymesProduced: req.body.ChemistryAndEnzymes.EnzymesProduced,
                }
              : {}),
            ...(req.body.ChemistryAndEnzymes
              .DecompositionAndDeterioratingCapacities != undefined
              ? {
                  DecompositionAndDeterioratingCapacities:
                    req.body.ChemistryAndEnzymes
                      .DecompositionAndDeterioratingCapacities,
                }
              : {}),
            ...(req.body.ChemistryAndEnzymes.MetabolitiesProduced != undefined
              ? {
                  MetabolitiesProduced:
                    req.body.ChemistryAndEnzymes.MetabolitiesProduced,
                }
              : {}),
            ...(req.body.ChemistryAndEnzymes.Biotransformations != undefined
              ? {
                  Biotransformations:
                    req.body.ChemistryAndEnzymes.Biotransformations,
                }
              : {}),
            ...(req.body.ChemistryAndEnzymes.SecurityLevel != undefined
              ? {
                  SecurityLevel: req.body.ChemistryAndEnzymes.SecurityLevel,
                }
              : {}),
            ...(req.body.ChemistryAndEnzymes.UpdateStatus != undefined
              ? {
                  UpdateStatus: req.body.ChemistryAndEnzymes.UpdateStatus,
                }
              : {}),
          },
        }
      : {}),
    ...(req.body.Medium
      ? {
          Medium: {
            ...(req.body.Medium.MediumNumber != undefined
              ? {
                  MediumNumber: req.body.Medium.MediumNumber,
                }
              : {}),
            ...(req.body.Medium.MediumName != undefined
              ? {
                  MediumName: req.body.Medium.MediumName,
                }
              : {}),
            ...(req.body.Medium.MediumComposition != undefined
              ? {
                  MediumComposition: req.body.Medium.MediumComposition,
                }
              : {}),
            ...(req.body.Medium.MediumPH != undefined
              ? {
                  MediumPH: req.body.Medium.MediumPH,
                }
              : {}),
            ...(req.body.Medium.SecurityLevel != undefined
              ? {
                  SecurityLevel: req.body.Medium.SecurityLevel,
                }
              : {}),
            ...(req.body.Medium.UpdateStatus != undefined
              ? {
                  UpdateStatus: req.body.Medium.UpdateStatus,
                }
              : {}),
          },
        }
      : {}),
    ...(req.body.Sequence
      ? {
          Sequence: {
            ...(req.body.Sequence.AccessionNumber != undefined
              ? {
                  AccessionNumber: req.body.Sequence.AccessionNumber,
                }
              : {}),
            ...(req.body.Sequence.TargetGene != undefined
              ? {
                  TargetGene: req.body.Sequence.TargetGene,
                }
              : {}),
            ...(req.body.Sequence.Definition != undefined
              ? {
                  Definition: req.body.Sequence.Definition,
                }
              : {}),
            ...(req.body.Sequence.SequencingMethod != undefined
              ? {
                  SequencingMethod: req.body.Sequence.SequencingMethod,
                }
              : {}),
            ...(req.body.Sequence.Length != undefined
              ? {
                  Length: req.body.Sequence.Length,
                }
              : {}),
            ...(req.body.Sequence.SequenceType != undefined
              ? {
                  SequenceType: req.body.Sequence.SequenceType,
                }
              : {}),
            ...(req.body.Sequence.Source != undefined
              ? {
                  Source: req.body.Sequence.Source,
                }
              : {}),
            ...(req.body.Sequence.Sequence != undefined
              ? {
                  Sequence: req.body.Sequence.Sequence,
                }
              : {}),
            ...(req.body.Sequence.SecurityLevel != undefined
              ? {
                  SecurityLevel: req.body.Sequence.SecurityLevel,
                }
              : {}),
            ...(req.body.Sequence.UpdateStatus != undefined
              ? {
                  UpdateStatus: req.body.Sequence.UpdateStatus,
                }
              : {}),
          },
        }
      : {}),
    ...(req.body.Catalogue
      ? {
          Catalogue: {
            ...(req.body.Catalogue.CatalogueName != undefined
              ? {
                  CatalogueName: req.body.Catalogue.CatalogueName,
                }
              : {}),
            ...(req.body.Catalogue.CatalogueURL != undefined
              ? {
                  CatalogueURL: req.body.Catalogue.CatalogueURL,
                }
              : {}),
            ...(req.body.Catalogue.CatalogueUpdateTime != undefined
              ? {
                  CatalogueUpdateTime: req.body.Catalogue.CatalogueUpdateTime,
                }
              : {}),
            ...(req.body.Catalogue.ContactPersonOfCatalogue != undefined
              ? {
                  ContactPersonOfCatalogue:
                    req.body.Catalogue.ContactPersonOfCatalogue,
                }
              : {}),
            ...(req.body.Catalogue.ContactEmail != undefined
              ? {
                  ContactEmail: req.body.Catalogue.ContactEmail,
                }
              : {}),
            ...(req.body.Catalogue.ContactAddress != undefined
              ? {
                  ContactAddress: req.body.Catalogue.ContactAddress,
                }
              : {}),
            ...(req.body.Catalogue.ContactTelephone != undefined
              ? {
                  ContactTelephone: req.body.Catalogue.ContactTelephone,
                }
              : {}),
            ...(req.body.Catalogue.ContactFax != undefined
              ? {
                  ContactFax: req.body.Catalogue.ContactFax,
                }
              : {}),
            ...(req.body.Catalogue.NumberOfStrains != undefined
              ? {
                  NumberOfStrains: req.body.Catalogue.NumberOfStrains,
                }
              : {}),
            ...(req.body.Catalogue.SecurityLevel != undefined
              ? {
                  SecurityLevel: req.body.Catalogue.SecurityLevel,
                }
              : {}),
            ...(req.body.Catalogue.UpdateStatus != undefined
              ? {
                  UpdateStatus: req.body.Catalogue.UpdateStatus,
                }
              : {}),
          },
        }
      : {}),
  };
};
