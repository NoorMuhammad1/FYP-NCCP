import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  Toolbar,
  Paper,
  TextField,
  Button,
  TableRow,
  Collapse,
  Typography,
  Grid,
} from "@material-ui/core";
import React, { useState } from "react";

const DepositRequest = (props) => {
  const { onApprove, onReject } = props;
  const items = props.data;
  const headers = items && Object.keys(items[0]);
  const [depositRejected, setDepositRejected] = useState(false);
  const [cancle_description, setCancelDescription] = useState("");
  const [collapse, setCollapse] = useState(false);
  const handleDepositReject = () => {
    setDepositRejected(true);
  };

  const handleRejectCancel = () => {
    setDepositRejected(false);
  };

  const handleRequestApproval = () => {
    onApprove();
  };

  const handleRequestRejection = () => {
    onReject(cancle_description);
  };
  return (
    <>
      <Toolbar>The following items have been requested</Toolbar>
      <TableContainer>
        <Table size="medium" variant="">
          <TableHead>
            <TableCell align="center" padding="none">
              id
            </TableCell>
            <TableCell align="center" padding="none">
              Genus
            </TableCell>
            <TableCell align="center" padding="none">
              Species
            </TableCell>
            <TableCell align="center" padding="none">
              Quantity
            </TableCell>
            <TableCell align="center" padding="none">
              Description
            </TableCell>
          </TableHead>
          <TableBody>
            {items &&
              items.map((item, index) => {
                return (
                  <>
                    <TableRow>
                      <TableCell key={index} align="center" padding="default">
                        {index + 1}
                      </TableCell>

                      {headers.map((head, i) => {
                        if (head === "description") {
                          return (
                            <TableCell key={i} align="center" padding="default">
                              <Typography
                                component="p"
                                display="inline"
                                onClick={() => setCollapse(!collapse)}
                                color="primary"
                              >
                                View
                              </Typography>
                            </TableCell>
                          );
                        }
                        if (head !== "_id") {
                          return (
                            <TableCell key={i} align="center" padding="default">
                              {item[head]}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                    <TableRow
                      style={{
                        display: collapse ? "" : "none",
                      }}
                    >
                      <TableCell style={{ paddingTop: 0 }} colSpan={6}>
                        <Collapse in={collapse} timeout="auto" unmountOnExit>
                          <TextField
                            multiline
                            rows={4}
                            value={item.description}
                            variant="outlined"
                            disabled
                            fullWidth
                            style={{ margin: "1rem 0" }}
                          />
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid
        container
        lg
        md
        sm
        xs
        spacing={2}
        style={{ marginTop: "1rem", minHeight: "60px" }}
      >
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleRequestApproval}
            style={{ height: "100%" }}
            fullWidth
          >
            Approve
          </Button>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleDepositReject}
            style={{ height: "100%" }}
            fullWidth
          >
            Reject
          </Button>
        </Grid>
      </Grid>
      {depositRejected && (
        <div style={{ marginTop: "1rem" }}>
          <Toolbar>Give the reasons for this rejection</Toolbar>
          <TextField
            multiline
            value={cancle_description}
            onChange={(e) => setCancelDescription(e.target.value)}
            variant="outlined"
            name="rejection_description"
            rows={4}
            style={{ width: "100%" }}
          />
          <Grid container style={{ marginTop: "1rem" }}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Button
                color="primary"
                variant="contained"
                onClick={handleRequestRejection}
                style={{ height: "100%" }}
                fullWidth
              >
                Confirm
              </Button>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Button
                color="primary"
                onClick={handleRejectCancel}
                color="inherit"
                style={{ height: "100%" }}
                fullWidth
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default DepositRequest;
