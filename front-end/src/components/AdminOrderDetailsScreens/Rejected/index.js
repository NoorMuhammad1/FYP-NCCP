import { Paper, Typography } from "@material-ui/core";
import React from "react";

const Rejected = (props) => {
  const { description } = props;
  return (
    <>
      <Typography component="p" style={{ marginBottom: "1rem" }}>
        Your order has been rejected due to the following reason:
      </Typography>
      {description}
    </>
  );
};

export default Rejected;
