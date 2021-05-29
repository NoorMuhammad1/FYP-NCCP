import { Button, TextField, Toolbar } from "@material-ui/core";
import React, { useState } from "react";

const Processing = (props) => {
  const { onSubmitTracking } = props;
  const [trackingNumber, setTrackingNumber] = useState("");
  return (
    <>
      The order is currently in the processing phase
      <div style={{ marginTop: "1rem" }}>
        <p>
          In order to move to the next stage, submit the tracking number of the
          dispatched order below
        </p>
        <div style={{ display: "flex", alignItems: "center" }}>
          <TextField
            value={trackingNumber}
            variant="outlined"
            onChange={(e) => setTrackingNumber(e.target.value)}
            label="Tracking Number"
          />
          <Button
            color="primary"
            variant="contained"
            disabled={trackingNumber <= 0}
            onClick={(e) => onSubmitTracking(trackingNumber)}
            style={{ marginLeft: "1rem" }}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default Processing;
