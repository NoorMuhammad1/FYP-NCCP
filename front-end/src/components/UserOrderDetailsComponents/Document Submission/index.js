import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  Toolbar,
  Paper,
  TableRow,
  TextField,
  Button,
  Collapse,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

function CollapsableTableRow(props) {
  const {
    item,
    index,
    onSubmit,
    files,
    setFiles,
    document_ids,
    setDocument_ids,
  } = props;
  const [collapse, setCollapse] = useState(false);

  const uploadFile = (e, id) => {
    const mod_files = files.filter((file) => {
      return file !== e.target.files[0];
    });
    setFiles([...mod_files, e.target.files[0]]);
    const mod_ids = document_ids.filter((doc_id) => doc_id != id);
    setDocument_ids([...mod_ids, id]);
    alert("file uploaded successfully");
    // let mod_files = files.map((file)=>{
    //   if(file.document_id===item._id){
    //     file.document=e.target.files[0];
    //   }
    //   return file;
    // });
    // if(mod_files.length===files){
    //   setFiles(mod_files);
    // }
    // else{
    //   setFiles([
    //     ...files,

    //   ])
    // }
    // setFiles(...files, {
    //   document_id: item._id,
    //   document: e.target.files[0],
    // })
  };
  const getSubmit = (status, id) => {
    if (status) {
      switch (status.toLowerCase()) {
        case "awaiting submission":
          // if (files && files.find((file) => file.document_id === id)) {
          //   return (
          //     <Button
          //       variant="contained"
          //       disabled
          //       component="label"
          //       size="small"
          //     >
          //       Uploaded
          //       <input type="file" hidden disabled onChange={uploadFile} />
          //     </Button>
          //   );
          // } else {
          return (
            <Button variant="contained" component="label" size="small">
              Upload File
              <input type="file" hidden onChange={(e) => uploadFile(e, id)} />
            </Button>
          );
        // }

        case "awaiting approval":
          return <p>awaiting approval</p>;
        case "approved":
          return "approved";
        case "rejected":
          return (
            <Button variant="contained" component="label" size="small">
              Upload File
              <input type="file" hidden onChange={(e) => uploadFile(e, id)} />
            </Button>
          );
        default:
          return "dont know";
      }
    }
  };

  const getAction = (status) => {
    if (status) {
      switch (status.toLowerCase()) {
        case "awaiting submission":
          return (
            <Button
              color="primary"
              variant="contained"
              onClick={(e) => onSubmit(files, document_ids)}
            >
              Submit
            </Button>
          );
        case "awaiting approval":
          return <p>awaiting approval</p>;
        case "approved":
          return "approved";
        case "rejected":
          return (
            <Button
              color="primary"
              variant="contained"
              onClick={(e) => onSubmit(files, document_ids)}
            >
              Submit
            </Button>
          );
        default:
          return "dont know";
      }
    }
  };
  return (
    <>
      <TableRow>
        <TableCell key={index}>{index + 1}</TableCell>
        <TableCell align="center" padding="default">
          {item["title"]}
        </TableCell>
        <TableCell align="center" padding="default">
          {item.approved}
          {item.approved && item.approved.toLowerCase() == "rejected" ? (
            <Typography
              component="p"
              display="inline"
              onClick={() => setCollapse(!collapse)}
              style={{
                fontSize: "12px",
                cursor: "pointer",
                fontWeight: "bold",
                marginLeft: "1rem",
              }}
              color="secondary"
            >
              (Reason)
            </Typography>
          ) : null}
        </TableCell>
        <TableCell key={index} align="center" padding="default">
          {getSubmit(item.approved, item._id)}
          {/* {item.approved == null ? (
            <>
              <Button color="primary" onClick={() => onApprove(item._id)}>
                Approve
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  setCollapse(!collapse);
                }}
              >
                Reject
              </Button>
            </>
          ) : (
            <>{item.approved ? "Approved" : "Rejected"}</>
          )} */}
        </TableCell>
        <TableCell align="center" padding="default">
          {getAction(item.approved)}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingTop: 0 }} colSpan={6}>
          <Collapse in={collapse} timeout="auto" unmountOnExit>
            <Toolbar>Document is rejected due to: </Toolbar>
            <TextField
              multiline
              rows={4}
              value={item.description}
              variant="outlined"
              disabled
              style={{ width: "100%" }}
            />{" "}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
const DocumentSubmission = (props) => {
  const { sampleDocuments, submittedDocuments, onSubmit } = props;
  const [collapse, setCollapse] = useState(false);
  const [files, setFiles] = useState([]);
  const [document_ids, setDocument_ids] = useState([]);
  const headers = [
    "title",
    "document",
    // {
    //   value:"title",
    //   title:"Title",
    // },
    // {
    //   value:"document",
    //   title:"Link",
    // }
  ];
  return (
    <>
      <div>
        <p>
          You are required to fill and submit the following documents according
          to your order.
        </p>
        {sampleDocuments.map((doc, index) => {
          return (
            <div style={{ margin: "0.8rem 0" }} key={index}>
              <span style={{ marginRight: "1rem" }}>{`${index + 1}.`}</span>
              <a href={doc.document} target="_blank">
                {doc.title}
              </a>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: "3rem" }}>
        <p>Your submitted documents and their responses</p>
        <TableContainer component={Paper}>
          <Table size="medium">
            <TableHead>
              <TableCell align="center" padding="none">
                id
              </TableCell>
              <TableCell align="center" padding="none">
                Title
              </TableCell>
              <TableCell align="center" padding="none">
                Status
              </TableCell>
              <TableCell align="center" padding="none">
                Submit
              </TableCell>
              <TableCell align="center" padding="none">
                Action
              </TableCell>
            </TableHead>
            <TableBody>
              {submittedDocuments &&
                submittedDocuments.map((doc, index) => {
                  return (
                    <CollapsableTableRow
                      item={doc}
                      index={index}
                      files={files}
                      document_ids={document_ids}
                      setDocument_ids={setDocument_ids}
                      setFiles={setFiles}
                      onSubmit={onSubmit}
                    />
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default DocumentSubmission;

const styles = {
  container: {
    marginTop: 35,
    border: "1px solid red",
  },
  header: {
    color: "Black",
    padding: "10px",
    fontSize: 22,
  },
  text: {
    color: "Black",
    fontFamily: "Arial",
    padding: 25,
  },
};
