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
} from "@material-ui/core";
import React, { useState } from "react";

const OrderRequest = (props) => {
  return (
    <>
      <Toolbar>{props.message}</Toolbar>
    </>
  );
};

export default OrderRequest;
