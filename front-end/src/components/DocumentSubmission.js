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
} from "@material-ui/core";
import { Link } from "react-router-dom";

function CollapsableTableRow(props) {
  const { item, index, onApprove, onReject } = props;
  const [collapse, setCollapse] = useState(false);
  const [description, setDescription] = useState("");

  const getAction = (status) => {
    if (status) {
      switch (status.toLowerCase()) {
        case "awaiting submission":
          return "Awaiting Submission";
        case "awaiting approval":
          return (
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
          );
        case "approved":
          return "approved";
        case "rejected":
          return "rejected";
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
          <a href={item["document"]} target="_blank">
            Click Here
          </a>
        </TableCell>
        <TableCell key={index} align="center" padding="default">
          {getAction(item.approved)}
          {/* {item.approved == null ? (
            "asc"
          ) : (
            <>{item.approved ? "Approved" : "Rejected"}</>
          )} */}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={collapse} timeout="auto" unmountOnExit>
            <Toolbar>Give the reasons for this rejection</Toolbar>
            <TextField
              multiline
              rows={4}
              value={description}
              variant="outlined"
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "100%" }}
            />
            <div style={{ margin: "1rem 0" }}>
              <Button
                color="primary"
                variant="contained"
                onClick={(e) => onReject(item._id, description)}
              >
                Confirm
              </Button>
              <Button color="primary" onClick={(e) => setCollapse(false)}>
                Cancel
              </Button>
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
const DocumentSubmission = (props) => {
  const { documents, onApprove, onReject } = props;
  const [collapse, setCollapse] = useState(false);
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
      <Toolbar>
        The following documents have been submitted by the client
      </Toolbar>
      <TableContainer component={Paper}>
        <Table size="medium" variant="">
          <TableHead>
            <TableCell align="center" padding="none">
              id
            </TableCell>
            <TableCell align="center" padding="none">
              Title
            </TableCell>
            <TableCell align="center" padding="none">
              Link
            </TableCell>
            <TableCell align="center" padding="none">
              Actions
            </TableCell>
          </TableHead>
          <TableBody>
            {documents &&
              documents.map((item, index) => {
                return (
                  <>
                    <CollapsableTableRow
                      item={item}
                      index={index}
                      onApprove={onApprove}
                      onReject={onReject}
                    />
                  </>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
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
