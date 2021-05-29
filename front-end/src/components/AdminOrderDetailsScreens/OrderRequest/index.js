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
  const { id, description, onApprove, onReject, data } = props;
  const items = props.data;
  const headers = items && Object.keys(items[0]);
  const [orderRejected, setOrderRejected] = useState(false);
  const [cancle_description, setCancelDescription] = useState("");
  const handleOrderReject = () => {
    setOrderRejected(true);
  };

  const handleRejectCancel = () => {
    setOrderRejected(false);
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
      <TableContainer component={Paper}>
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
          </TableHead>
          <TableBody>
            {items &&
              items.map((item, index) => {
                return (
                  <>
                    <TableCell key={index} align="center" padding="default">
                      {index + 1}
                    </TableCell>

                    {headers.map((head, i) => {
                      return (
                        <TableCell key={i} align="center" padding="default">
                          {item[head]}
                        </TableCell>
                      );
                    })}
                  </>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Toolbar>
        Here is the description of the order that the user provided
      </Toolbar>
      <TextField
        multiline
        disabled
        value={description || "User has given not description"}
        variant="outlined"
        rows={4}
        style={{ width: "100%" }}
      />
      <div>
        <Button color="primary" onClick={handleRequestApproval}>
          Approve
        </Button>
        <Button color="secondary" onClick={handleOrderReject}>
          Reject
        </Button>
      </div>
      {orderRejected && (
        <div>
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
          <div style={{ marginTop: "1rem" }}>
            <Button
              color="primary"
              variant="contained"
              onClick={handleRequestRejection}
            >
              Confirm
            </Button>
            <Button color="primary" onClick={handleRejectCancel}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderRequest;
