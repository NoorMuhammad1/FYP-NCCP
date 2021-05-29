import { Typography } from "@material-ui/core";
import React from "react";

const DepositDispatched = (props) => {
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
    </div>
  );
};

export default DepositDispatched;

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
