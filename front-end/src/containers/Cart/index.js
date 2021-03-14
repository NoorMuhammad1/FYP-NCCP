import React from "react";
import { Col, Jumbotron, Row, Table } from "react-bootstrap";
import Layout from "../../components/Layout";
import KeyboardArrowUpRoundedIcon from "@material-ui/icons/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import DeleteIcon from "@material-ui/icons/Delete";
import { ReactComponent as Delete } from "../Cart/Icons/trash-alt-solid.svg";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import "./style.css";
// import logo from "./product-image.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../actions/cart.actions";

const Cart = (props) => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart.cartData);

  const increaseQty = (id) => {
    dispatch(increaseQuantity({ id }));
  };
  const decreaseQty = (id) => {
    dispatch(decreaseQuantity({ id }));
  };

  const removeItem = (id) => {
    dispatch(removeFromCart({ id }));
  };
  return (
    <Layout>
      <Jumbotron style={{ height: "100%" }}>
        <div id="cart-header">
          <span id="description-heading">DESCRIPTION</span>
          <span id="quantity-heading">QUANTITY</span>
          <span id="price-heading">PRICE</span>
          <span id="delete-heading"></span>
        </div>
        <div id="cart-content">
          {cartData.map((item) => {
            return (
              <div className="item-details">
                <div className="description-box">
                  {/* <img src={logo} className="product-image" /> */}
                  <div className="cart-item-details">
                    <span className="cart-item-name">{`${item.Genus} ${item.SpeciesEpithet}`}</span>
                    <span className="cart-item-type">{`${item.OrganismType}`}</span>
                  </div>
                </div>
                <div className="quantity-box">
                  {/* <KeyboardArrowUpRoundedIcon className="decrease-quantity-icon" /> */}
                  <IoIosArrowDropleftCircle
                    className="arrow"
                    onClick={(e) => decreaseQty(item.id)}
                  />
                  <input
                    type="number"
                    min="1"
                    className="quantity-input"
                    value={item.qty}
                    disabled
                  />
                  <IoIosArrowDroprightCircle
                    className="arrow"
                    onClick={(e) => increaseQty(item.id)}
                  />
                  {/* <KeyboardArrowDownRoundedIcon classname="arrow" /> */}
                </div>
                <div className="price-box">
                  <span className="cart-item-price">$299 USD</span>
                </div>
                <div className="operation-box">
                  <RiDeleteBin6Line
                    className="delete-icon"
                    onClick={(e) => removeItem(item.id)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Jumbotron>
    </Layout>
  );
};

export default Cart;
