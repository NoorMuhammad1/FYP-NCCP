import React from "react";
import { Button, Typography } from "@material-ui/core";

const DepositDispatched = (props) => {
  const { onConfirm } = props;
  return (
    <div>
      <h6>
        This deposit has been processed and dispatched to the provided address.
        Check the current status of the delivery using the following tracking id
      </h6>

      <div style={{ display: "flex", alignItems: "baseline" }}>
        <Typography component="h6" color="primary">
          {`Tracking:  `}
        </Typography>
        <span style={{ marginLeft: "1rem" }}>
          {props.tracking || "not provided"}
        </span>
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", marginTop: "1rem" }}
      >
        If you have recieved the requested deposit. Click below to confirm its
        delivery
        <Button
          color="primary"
          style={{ marginTop: "1rem" }}
          variant="contained"
          onClick={onConfirm}
        >
          Delivered
        </Button>
      </div>
    </div>
  );
};

export default DepositDispatched;
