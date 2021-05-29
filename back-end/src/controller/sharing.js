const http = require("http");
const ftp = require("basic-ftp");
var ftpClient = require("ftp-client");
const jsftp = require("jsftp");
const Microorganism = require("../models/microorganisms");
let mongoXlsx = require("mongo-xlsx");
const Json2csvParser = require("json2csv").Parser;
const Excel = require("exceljs");
var fs = require("fs");
const {
  CoreDataSetsColumns,
  nameColumns,
  StrainAdministrationColumns,
  EnviromentAndHistoryColumns,
  PublicationColumns,
  BiologicalinteractionsColumns,
  SEXUALITYColumns,
  PropertiesColumns,
  GrnotypeAndGeneticsColumns,
  GrowteConditionsColumns,
  ChemistryAndEnzymesColumns,
  MediumColumns,
  SequenceColumns,
  CatlogueColumns,
} = require("../common-used/excelData");
exports.shareData = async (req, res) => {
  const { username, password } = req.body;
  console.log(
    username != process.env.WDCM_USERNAME ||
      password != process.env.WDCM_PASSWORD
  );
  if (
    username != process.env.UK_USERNAME ||
    password != process.env.UK_PASSWORD
  ) {
    return res.status(400).json({
      message: "Username or password was incorrect",
    });
  }
  try {
    const client = new jsftp({
      // host: "ftp.uu.net",
      host: "ftp.shef.ac.uk",
      user: username,
      pass: password,
    });
    var data = await Microorganism.find(
      {},
      "-_id -createdAt -updatedAt -__v -price"
    );

    let workbook = new Excel.Workbook();
    let worksheet1 = workbook.addWorksheet("Core Datasets");
    let worksheet2 = workbook.addWorksheet("name");
    let worksheet3 = workbook.addWorksheet("Strain Administration");
    let worksheet4 = workbook.addWorksheet("Enviroment and history");
    let worksheet5 = workbook.addWorksheet("Publication");
    let worksheet6 = workbook.addWorksheet("Biological interactions");
    let worksheet7 = workbook.addWorksheet("SEXUALITY");
    let worksheet8 = workbook.addWorksheet("Properties");
    let worksheet9 = workbook.addWorksheet("Grnotype and Genetics");
    let worksheet10 = workbook.addWorksheet("Growte conditions");
    let worksheet11 = workbook.addWorksheet("Chemistry and Enzymes");
    let worksheet12 = workbook.addWorksheet("Medium");
    let worksheet13 = workbook.addWorksheet("Sequence");
    let worksheet14 = workbook.addWorksheet("Catalogue");
    worksheet1.columns = CoreDataSetsColumns;
    worksheet2.columns = nameColumns;
    worksheet3.columns = StrainAdministrationColumns;
    worksheet4.columns = EnviromentAndHistoryColumns;
    worksheet5.columns = PublicationColumns;
    worksheet6.columns = BiologicalinteractionsColumns;
    worksheet7.columns = SEXUALITYColumns;
    worksheet8.columns = PropertiesColumns;
    worksheet9.columns = GrnotypeAndGeneticsColumns;
    worksheet10.columns = GrowteConditionsColumns;
    worksheet11.columns = ChemistryAndEnzymesColumns;
    worksheet12.columns = MediumColumns;
    worksheet13.columns = SequenceColumns;
    worksheet14.columns = CatlogueColumns;

    data.forEach((e, index) => {
      const rowIndex = index + 2;
      worksheet1.addRow({
        ...e.CoreDataSets,
        OtherCollectionNumbers: `${e.CoreDataSets.OtherCollectionNumbers.toString()}`,
      });
      worksheet2.addRow({
        ...e.Name,
        AccessionNumber: e.CoreDataSets.AccessionNumber,
      });
      worksheet3.addRow({
        ...e.StrainAdministration,
        AccessionNumber: e.CoreDataSets.AccessionNumber,
      });
      worksheet4.addRow({
        ...e.EnviromentAndHistory,
        AccessionNumber: e.CoreDataSets.AccessionNumber,
      });
      worksheet5.addRow({
        ...e.Publication,
        AccessionNumber: e.CoreDataSets.AccessionNumber,
      });
      worksheet6.addRow({
        ...e.Biologicalinteractions,
        AccessionNumber: e.CoreDataSets.AccessionNumber,
      });
      worksheet7.addRow({
        ...e.Sexuality,
        AccessionNumber: e.CoreDataSets.AccessionNumber,
      });
      worksheet8.addRow({
        ...e.Properties,
        AccessionNumber: e.CoreDataSets.AccessionNumber,
      });
      worksheet9.addRow({
        ...e.GrnotypeAndGenetics,
        AccessionNumber: e.CoreDataSets.AccessionNumber,
      });
      worksheet10.addRow({
        ...e.GrowthConditions,
        AccessionNumber: e.CoreDataSets.AccessionNumber,
        OptimumNaClContentration:
          (e.GrowthConditions.MinimumNaClContentration ||
            e.GrowthConditions.MaximumNaClContentration ||
            e.GrowthConditions.OptimumNaClContentration) &&
          `${e.GrowthConditions.MinimumNaClContentration || ""}/${
            e.GrowthConditions.MaximumNaClContentration || ""
          }/${e.GrowthConditions.OptimumNaClContentration || ""}`,
        OptimumSugarContentration:
          (e.GrowthConditions.MinimumSugarContentration ||
            e.GrowthConditions.MaximumSugarContentration ||
            e.GrowthConditions.OptimumSugarContentration) &&
          `${e.GrowthConditions.MinimumSugarContentration || ""}/${
            e.GrowthConditions.MaximumSugarContentration || ""
          }/${e.GrowthConditions.OptimumSugarContentration || ""}`,
      });
      worksheet11.addRow({
        ...e.ChemistryAndEnzymes,
        AccessionNumber: e.CoreDataSets.AccessionNumber,
      });
      worksheet12.addRow({
        ...e.Medium,
        AccessionNumber: e.CoreDataSets.AccessionNumber,
      });
      worksheet13.addRow({
        ...e.Sequence,
        AccessionNumber: e.CoreDataSets.AccessionNumber,
      });
      worksheet14.addRow({
        ...e.Catalogue,
        AccessionNumber: e.CoreDataSets.AccessionNumber,
      });
    });

    workbook.xlsx.writeFile("data.xlsx").then(() => {
      const file = fs.readFileSync("data.xlsx");
      client.put(file, `/incoming/data_${new Date()}.xslx`, function (hadErr) {
        if (hadErr) {
          return res.status(400).json({
            message: "There was some error uploading the file to the network",
            error: hadErr,
          });
        } else {
          fs.unlinkSync("data.xlsx");
          console.log("File uploaded successfully!");
          return res.status(200).json({
            message: "File uploaded successfully!",
          });
        }
      });
    });
  } catch (error) {
    // console.log(error);
    return res.status(400).json({
      message: "There was some error connecting to the server",
      error,
    });
  }

  // data.map((x) => {
  //   console.log(x._id);
  //   delete x._id;
  // });
  // return res.status(200).json(data);

  // const json2csvParser = new Json2csvParser({ header: false });
  // const csvData = json2csvParser.parse(data[0]);
  // fs.writeFile("excelfile.csv", csvData, (error, data) => {
  //   if (error) console.log("error", error);
  //   if (data) console.log("data", data);
  // });
  // let model = mongoXlsx.buildDynamicModel(data);
  // // mongoXlsx.mongoData2XlsxMultiPage(data)
  // mongoXlsx.mongoData2XlsxMultiPage(
  //   data,
  //   // ["CoreDataSets", "Name"],
  //   function (err, data) {
  //     console.log("File saved at:", data.fullPath);
  //   }
  // );

  // mongoXlsx.mongoData2XlsxMultiPage(
  //   data,
  //   ["CoreDataSets", "Name"],
  //   // model,
  //   function (err, res) {
  //     console.log("res");
  //   }
  // );
  // client.ls(".", (err, data) => {
  //   return res.status(200).json(data);
  // });

  // console.log(response);

  // // console.log(file);
  // client.put("uploads/abc.txt", "abc.txt", (error, data) => {
  //   console.log("hi");
  //   if (error) {
  //     console.log("error");
  //     console.log(error);
  //   }
  //   if (data) {
  //     console.log("data");
  //     console.log(data);
  //   }
  // });
  // fs.readFile("uploads/abc.txt", "utf8", (error, data) => {
  //     if (error) {
  //       console.log("error", error);
  //     }
  //     if (data) {
  //       console.log("data: ", data);
  //       client.put(data, "/dataFile", (err, data) => {
  //         if (err) {
  //           console.log("err");
  //           console.log(err);
  //         }
  //         if (data) {
  //           console.log("dat");
  //           console.log(data);
  //         }
  //       });
  //     }
  //   });
  // client.put(
  //   "E:/Study/FYP/FYP/FYP-NCCP/back-end/uploads/Report.docx",
  //   "/report.docx",
  //   (error, data) => {
  //     if (error) {
  //       console.log("error");
  //       console.log(error);
  //     }
  //     if (data) {
  //       console.log("data");
  //       console.log(data);
  //     }
  //   }
  // );
  // return res.status(200).json({
  //   socket: client.socket,
  // });
  // client = new ftpClient(
  //   {
  //     host: "124.16.144.48",
  //     port: 21,
  //     user: "vsftpd",
  //     password: "ftp@im",
  //   },
  //   { logging: "basic" }
  // );

  // client.connect(() => {
  //   console.log("connected baaby");
  // });

  // const client = new ftp.Client();
  // client.ftp.verbose = true;

  // try {
  //   await client.access({
  //     host: "124.16.144.48",
  //     user: "vsftpd",
  //     password: "ftp@im",
  //     secure: true,
  //   });
  //   // console.log(await client.list());
  // } catch (error) {
  //   console.log(error);
  // }
  // client.close();
};

async function example() {
  const client = new ftp.Client();
  client.ftp.verbose = true;
  try {
    await client.access({
      host: "myftpserver.com",
      user: "very",
      password: "password",
      secure: true,
    });
    console.log(await client.list());
    await client.uploadFrom("README.md", "README_FTP.md");
    await client.downloadTo("README_COPY.md", "README_FTP.md");
  } catch (err) {
    console.log(err);
  }
  client.close();
}
