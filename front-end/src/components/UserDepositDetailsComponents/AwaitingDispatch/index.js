import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";

const AwaitingDispatch = (props) => {
  const { data, onSubmitTracking } = props;
  const [trackingNumber, setTrackingNumber] = useState("");
  return (
    <>
      {data && data.rejected && (
        <>
          <p>
            Your previous sent samples were rejected because of the following
            reasons:
          </p>
          <TextField
            multiline
            value={data.description}
            disabled
            variant="outlined"
            rows={4}
            style={{ width: "100%", marginBottom: "1rem" }}
          />
        </>
      )}
      NCCB is currently awaiting the dispatch of your deposit items. Please
      complete all the necessary requirements and then dispatch the items.
      <div style={{ marginTop: "1rem" }}>
        <p>
          In order to move to the next stage, submit the tracking number of the
          dispatched items below
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

export default AwaitingDispatch;
