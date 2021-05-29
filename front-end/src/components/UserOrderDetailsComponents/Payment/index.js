import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";

const Payment = (props) => {
  const { data, onPayment } = props;
  const [openModal, setOpenModal] = useState(false);
  const [address, setAddress] = useState("");
  const [error, setError] = useState(false);
  const [token, setToken] = useState("");
  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handlePayment = (token) => {
    setOpenModal(true);
    setToken(token);
  };

  const checkPayment = () => {
    if (address.length > 0) {
      onPayment(token, address);
    }
    setError(true);
  };
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price ($)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.items &&
            data.items.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="left">{row.microorganism_name}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">
                  {row.sub_total && row.sub_total.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableRow>
          <TableCell rowSpan={4} />
          <TableCell colSpan={2}>SubTotal</TableCell>
          <TableCell align="right">
            {data.total && data.total.toFixed(2)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Tax</TableCell>
          <TableCell align="right">0%</TableCell>
          <TableCell align="right">{0}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Total</TableCell>
          <TableCell colSpan={2} align="right">
            {data.total && data.total.toFixed(2)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={3} align="right">
            <StripeCheckout
              stripeKey="pk_test_51IhcBtCueTz3N4RSq2lZieK9Wh8cD7XR2KlScdCDyfyuCcnjbj6RzGbaoxUtIOHxDAruTsgTTuFWKz1lcSj7YlO60066rgWObx"
              token={handlePayment}
              amount={data.total * 100}
            >
              <Button variant="contained" color="primary">
                Pay with Credit/Debit card
              </Button>
            </StripeCheckout>
          </TableCell>
        </TableRow>
      </Table>
      <Dialog
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add an address of the place where you would like to ship these
            samples to.
          </DialogContentText>
          <TextField
            autoFocus
            error={error}
            helperText={"Address cannot be empty"}
            margin="dense"
            required
            id="addresss"
            label="Address"
            type="email"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={checkPayment} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default Payment;
