import React from "react";

const OrderRejectDescription = (props) => {
  return (
    <>
      <h6>Your order has been rejected because of the following reasons:</h6>
      <h6>Reason:</h6>
      <p>{props.description || "not given"}</p>
    </>
  );
};

export default OrderRejectDescription;

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
