import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import PageHeader from "components/PageHeader";
import React from "react";
import { Jumbotron } from "react-bootstrap";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import DeleteIcon from "@material-ui/icons/Delete";
import { RiDeleteBin6Line } from "react-icons/ri";
// import logo from "./product-image.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  changeQuantity,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  createOrder,
} from "../../actions/cart.actions";
import Layout from "../../components/Layout";
import "./style.css";
import { isUserLoggedIn } from "actions";

const Cart = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const cartData = useSelector((state) => state.cart.cartData);
  const order = useSelector((state) => state.order.create_order);
  const auth = useSelector((state) => state.auth);
  const removeItem = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const requestSent = () => {
    return (
      <div className="fetch__data__div">
        <h3 className="fetch__data__title">Your order is being confirmed</h3>
        <CircularProgress className="fetch__data__spinner" />
      </div>
    );
  };

  const ErrorMessage = (message) => {
    return (
      <div className="error__div">
        <h3 className="error__title">{message}</h3>
      </div>
    );
  };
  if (order.fetching) {
    return <div className="users__content__div">{requestSent()}</div>;
  }

  if (order.error.found) {
    return (
      <div className="users__content__div">
        {ErrorMessage(order.error.message)}
      </div>
    );
  }

  const handleQuantityChange = (e, id) => {
    dispatch(changeQuantity(id, e.target.value));
  };

  const handleConfirmOrder = () => {
    if (!auth.authenticate) {
      history.push("/signin");
    }
    dispatch(createOrder(cartData));
  };

  const emptyCartMessage = () => {
    return (
      <CardContent style={styles.emptyCart}>
        <p style={styles.emptyCartMessage}>Cart is Empty</p>
      </CardContent>
    );
  };

  const getCartDataTable = () => {
    return (
      <>
        <CardContent>
          <Grid container spacing={2} direction="column">
            {cartData.map((item, index) => (
              <Grid item lg sm xs md key={index}>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    style={styles.nameField}
                  >
                    <div>{`${item.Genus} ${item.SpeciesEpithet}`}</div>
                    <div>
                      <span style={styles.subHeading}>Type:</span>
                      <span style={styles.typeValue}>{item.OrganismType}</span>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    lg={4}
                    style={styles.quantityField}
                  >
                    <span style={styles.subHeading}>Quantity: </span>
                    <TextField
                      type="number"
                      value={item.qty}
                      onChange={(e) => handleQuantityChange(e, item.id)}
                      margin="dense"
                      variant="outlined"
                      inputProps={{ min: 0 }}
                      style={styles.quantityTextField}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={2}
                    lg={2}
                    style={styles.actionsField}
                  >
                    <IconButton>
                      <DeleteIcon onClick={(e) => removeItem(item.id)} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </CardContent>
        <CardActions style={styles.actions}>
          <Button
            color="primary"
            variant="contained"
            style={styles.button}
            onClick={handleConfirmOrder}
          >
            Confirm Order
          </Button>
        </CardActions>
      </>
    );
  };

  const checkEmptyCart = () => {
    if (cartData.length === 0) {
      return emptyCartMessage();
    } else {
      return getCartDataTable();
    }
  };

  return (
    <div style={{ backgroundColor: "#EEEEEE", minHeight: "100vh" }}>
      <PageHeader />
      <div style={styles.cart}>
        <h4 style={styles.cart.heading}>Shopping Cart</h4>
        <p style={styles.cart.subHeading}>
          You have {cartData.length} items in your cart
        </p>
        <Card style={styles.card}>{checkEmptyCart()}</Card>
      </div>
    </div>

    // <Layout>
    //   <Jumbotron style={{ height: '100%' }}>
    //     <div id="cart-header">
    //       <span id="description-heading">DESCRIPTION</span>
    //       <span id="quantity-heading">QUANTITY</span>
    //       <span id="price-heading">PRICE</span>
    //       <span id="delete-heading"></span>
    //     </div>
    //     <div id="cart-content">
    //       {cartData.map((item) => {
    //         return (
    //           <div className="item-details">
    //             <div className="description-box">
    //               {/* <img src={logo} className="product-image" /> */}
    //               <div className="cart-item-details">
    //                 <span className="cart-item-name">{`${item.Genus} ${item.SpeciesEpithet}`}</span>
    //                 <span className="cart-item-type">{`${item.OrganismType}`}</span>
    //               </div>
    //             </div>
    //             <div className="quantity-box">
    //               {/* <KeyboardArrowUpRoundedIcon className="decrease-quantity-icon" /> */}
    //               <IoIosArrowDropleftCircle
    //                 className="arrow"
    //                 onClick={(e) => decreaseQty(item.id)}
    //               />
    //               <input
    //                 type="number"
    //                 min="1"
    //                 className="quantity-input"
    //                 value={item.qty}
    //                 disabled
    //               />
    //               <IoIosArrowDroprightCircle
    //                 className="arrow"
    //                 onClick={(e) => increaseQty(item.id)}
    //               />
    //               {/* <KeyboardArrowDownRoundedIcon classname="arrow" /> */}
    //             </div>
    //             <div className="price-box">
    //               <span className="cart-item-price">$299 USD</span>
    //             </div>
    //             <div className="operation-box">
    //               <RiDeleteBin6Line
    //                 className="delete-icon"
    //                 onClick={(e) => removeItem(item.id)}
    //               />
    //             </div>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   </Jumbotron>
    // </Layout>
  );
};
const styles = {
  cart: {
    margin: "4rem 8rem",
    heading: {},
    subHeading: {
      color: "grey",
      fontSize: "14px",
    },
  },
  subHeading: {
    color: "grey",
    fontSize: "14px",
    marginRight: "0.5rem",
  },

  card: {
    padding: "1rem",
    // minHeight: "300px",
  },
  typeValue: {
    fontSize: "14px",
  },
  nameField: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    borderBottom: "1px solid #EEEEEE",
    padding: "1rem 0",
  },
  quantityField: {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #EEEEEE",
  },

  actionsField: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    borderBottom: "1px solid #EEEEEE",
  },
  quantityTextField: {
    width: "5rem",
    marginLeft: "0.6rem",
    fontSize: "14px",
  },
  actions: {
    justifyContent: "flex-end",
  },
  button: {
    padding: "0.8rem 2rem",
  },
  emptyCart: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "200px",
  },
  emptyCartMessage: {
    fontSize: "18px",
    // color: "#EEEEEE",
  },
};
export default Cart;
