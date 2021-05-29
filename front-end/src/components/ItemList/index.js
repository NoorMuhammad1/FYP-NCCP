import { Avatar, Card } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import VisibilityIcon from "@material-ui/icons/Visibility";
import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Image from "./image.jpg";
import "./style.css";

const ItemList = (props) => {
  //////////////////////
  /////options/////////

  const options = [
    {
      title: "View",
      icon: <VisibilityIcon />,
      link: "#",
    },
    {
      title: "Delete",
      icon: <DeleteIcon />,
      link: "#",
    },
  ];

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  /////////////////////
  ////////////////////

  return (
    <div>
      <div className="item__list__header">
        {props.columns.map((column, key) => {
          return (
            <div key={key} style={{ flexBasis: column.width }}>
              {column.title}
            </div>
          );
        })}
      </div>

      <div className="item__list__body">
        {props.rows.map((row, key) => {
          return (
            <div className="item__list__item" key={key}>
              <div
                className="item__list__item__personal"
                style={{ flexBasis: props.columns[0].width }}
              >
                <div className="item__list__item__picture__box">
                  <Avatar
                    src={row.profilePicture}
                    style={{ width: "75px", height: "75px" }}
                  />
                  {/* <img src={Image} className="item__list__item__picture" /> */}
                  {/* {row.profilePicture.toLowerCase() === "null" ? (
                      <AccountCircleIcon />
                    ) : (
                      "p"
                    )} */}
                </div>
                <div className="item__list__item__details">
                  <div className="item__list__item__name">{`${row.firstname} ${row.lastname}`}</div>
                  <div className="item__list__item__email">{row.email}</div>
                </div>
              </div>
              <div style={{ flexBasis: props.columns[1].width }}>
                {row.role}
              </div>
              <div style={{ flexBasis: props.columns[2].width }}>
                {row.orders}
              </div>
              <div style={{ flexBasis: props.columns[3].width }}>
                {row.deposits}
              </div>
              <div style={{ flexBasis: props.columns[4].width }}>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleClose}
                >
                  {options.map((option, key) => (
                    <MenuItem
                      key={key}
                      //   selected={option === "Pyxis"}
                      onClick={handleClose}
                    >
                      <Link to={option.link} className="item__option">
                        {option.icon}
                        {option.title}
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemList;
