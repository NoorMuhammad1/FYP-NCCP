import { Button, Grid, TextField, Toolbar } from "@material-ui/core";
import React, { useState } from "react";

const Processing = (props) => {
  const { onApprove, onReject } = props;
  const [depositRejected, setDepositRejected] = useState(false);
  const [cancle_description, setCancelDescription] = useState("");
  const handleDepositReject = () => {
    setDepositRejected(true);
  };

  const handleRequestRejection = () => {
    onReject(cancle_description);
  };
  const handleRejectCancel = () => {
    setDepositRejected(false);
    setCancelDescription("");
  };
  return (
    <>
      <Grid
        container
        spacing={2}
        lg
        md
        sm
        xs
        spacing={2}
        style={{ marginTop: "1rem", minHeight: "60px" }}
      >
        <p>
          The deposit is in the processing stage. You are required to complete
          all your tests and requirements and confirm/reject the deposit items
          below.
        </p>
        <p>
          In case of reject, a description has to be provided for this
          rejection. Upon this rejection the user will be notified and will be
          asked to submit the samples again
        </p>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Button
            color="primary"
            variant="contained"
            onClick={onApprove}
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

export default Processing;
