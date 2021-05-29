import {
  Avatar,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  Fade,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import { addUser } from "actions/user.actions";
import SideBar from "components/SideBar";
import AddUserValidator from "containers/AdminDashboard/AddUser/addUserValidator";
import "containers/AdminDashboard/AddUser/style.css";
import useFormAddUser from "containers/AdminDashboard/AddUser/useFormAddUser";
import { PermissionData } from "containers/User/PermissionData";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const AddUser = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const add_user = useSelector((state) => state.user.add_user);
  const handleAddUser = () => {
    var form = new FormData();
    Object.keys(addUserValue).map((item) => {
      if (item !== "preview_Image") {
        form.append(item, addUserValue[item]);
      }
      if (item == "permissions") {
        form.append(item, JSON.stringify(addUserValue[item]));
      }
    });
    alert("sending data");
    dispatch(addUser(form));
    // setModalOpen(true);
  };

  const nextSlide = () => {
    const slider_div = document.getElementById("add__user__details__slides");
    slider_div.style.transform = "translateX(-50%)";
  };
  const prevSlide = () => {
    const slider_div = document.getElementById("add__user__details__slides");
    slider_div.style.transform = "translateX(0%)";
  };
  const { addUserValue, handleAddUserSubmit, updateAddUser, addUserErrors } =
    useFormAddUser(handleAddUser, AddUserValidator);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const requestSent = () => {
    return (
      <div className="fetch__data__div">
        <h3 className="fetch__data__title">
          User information is being processed
        </h3>
        <CircularProgress className="fetch__data__spinner" />
      </div>
    );
  };

  const ErrorMessage = () => {
    return (
      <div className="error__div">
        <h3 className="error__title">{add_user.error.message}</h3>
      </div>
    );
  };

  if (add_user.adding) {
    return (
      <SideBar active="Users">
        <div className="users__content__div">{requestSent()}</div>
      </SideBar>
    );
  }

  if (add_user.error.found) {
    return (
      <SideBar active="Users">
        <div className="users__content__div">{ErrorMessage()}</div>
      </SideBar>
    );
  }
  // if (add_user.added) {
  //   setModalOpen(true);
  // }
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="add-user-response-modal"
        open={modalOpen}
        onClose={(e) => {
          setModalOpen(false);
          props.history.goBack();
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <div className="signup-repsonse-modal-content-div">
            {add_user.added ? (
              <CheckCircleIcon
                className="signup-response-modal-icon"
                style={{ fontSize: "5.5rem" }}
              />
            ) : null}
            {add_user.error.found ? (
              <ErrorIcon
                className="signup-response-modal-icon"
                style={{ fontSize: "5.5rem" }}
              />
            ) : null}
            <h2 id="transition-modal-title">
              {add_user.added
                ? "Success"
                : add_user.error
                ? "Error"
                : "Waiting for response"}
            </h2>
            <p id="transition-modal-description">
              {add_user.added
                ? "User creation successfull"
                : add_user.error.message}
            </p>
          </div>
        </Fade>
      </Modal>
      <SideBar active="Users">
        <Grid
          container
          xs
          lg
          md
          sm
          direction="column"
          style={{ margin: "2rem 0" }}
        >
          <Grid item xs lg md sm style={{ width: "100%" }}>
            <div style={{ margin: "0.2rem 1rem" }}>
              <h4>Personal Information</h4>
            </div>
            <Card style={{ padding: "2rem" }}>
              <CardContent>
                <Grid container xs lg md sm>
                  <Grid item xs={12} sm={12} lg={8} md={8}>
                    <Grid container xs lg md sm spacing={2}>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <TextField
                          variant="outlined"
                          type="text"
                          name="firstname"
                          className="input"
                          label="Firstname"
                          fullWidth
                          value={addUserValue.firstname}
                          onChange={(e) => updateAddUser(e)}
                          error={addUserErrors.firstname ? true : false}
                          helperText={addUserErrors.firstname}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <TextField
                          variant="outlined"
                          type="text"
                          name="lastname"
                          className="input"
                          label="Lastname"
                          fullWidth
                          value={addUserValue.lastname}
                          onChange={(e) => updateAddUser(e)}
                          error={addUserErrors.lastname ? true : false}
                          helperText={addUserErrors.lastname}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField
                          variant="outlined"
                          type="text"
                          className="input"
                          name="email"
                          label="Email"
                          fullWidth
                          value={addUserValue.email}
                          onChange={(e) => updateAddUser(e)}
                          error={addUserErrors.email ? true : false}
                          helperText={addUserErrors.email}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <FormControl
                          variant="outlined"
                          className="input password-input"
                          fullWidth
                          error={addUserErrors.password ? true : undefined}
                        >
                          <InputLabel htmlFor="outlined-adornment-password">
                            Password *
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-password"
                            name="password"
                            placeholder="Min 6 letters & a capital letter"
                            type={showPassword ? "text" : "password"}
                            value={addUserValue.password}
                            // className="input"
                            onChange={(e) => updateAddUser(e)}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={(e) =>
                                    setShowPassword(!showPassword)
                                  }
                                  onMouseDown={(e) => e.preventDefault()}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            labelWidth={70}
                          />
                          <FormHelperText id="my-helper-text">
                            {addUserErrors.password
                              ? addUserErrors.password
                              : ""}
                          </FormHelperText>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <FormControl
                          variant="outlined"
                          className="input"
                          required
                          fullWidth
                          error={addUserErrors.confirm_password ? true : false}
                        >
                          <InputLabel htmlFor="outlined-adornment-confirm-password">
                            Confirm Password
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-confirm-password"
                            name="confirm_password"
                            placeholder="Min 6 letters & a capital letter"
                            type={showConfirmPassword ? "text" : "password"}
                            value={addUserValue.confirm_password}
                            onChange={(e) => updateAddUser(e)}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={(e) =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                  }
                                  onMouseDown={(e) => e.preventDefault()}
                                  edge="end"
                                >
                                  {showConfirmPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            labelWidth={140}
                          />
                          <FormHelperText id="my-helper-text">
                            {addUserErrors.confirm_password}
                          </FormHelperText>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    lg={4}
                    md={4}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      src={addUserValue.preview_Image}
                      style={{ width: "8rem", height: "8rem" }}
                    />
                    <Button
                      color="primary"
                      variant="contained"
                      component="label"
                      style={{
                        width: "70%",
                        margin: "0.8rem 0rem",
                      }}
                    >
                      Update
                      <input
                        type="file"
                        name="profilePicture"
                        onChange={(e) => updateAddUser(e)}
                        hidden
                      />
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs lg md sm style={{ width: "100%", marginTop: "1rem" }}>
            <div style={{ margin: "0.2rem 1rem" }}>
              <h4>Permissions</h4>
            </div>
            <Card style={{ width: "100%", padding: "2rem" }}>
              <CardContent>
                <Grid container spacing={2}>
                  {PermissionData.map((permission, index) => {
                    return (
                      <Grid item xs={12} lg={4} md={6} sm={12}>
                        <FormControlLabel
                          key={index}
                          control={
                            <Checkbox
                              checked={
                                addUserValue.permissions[permission.name]
                              }
                              onChange={updateAddUser}
                              name={permission.name}
                              color="primary"
                            />
                          }
                          label={permission.title}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid container spacing={2} style={{ marginTop: "1rem" }}>
            <Grid item lg={6} md={6} xs={12} sm={12}>
              <Button
                variant="contained"
                color="primary"
                style={{ width: "100%", padding: "1rem 0" }}
                onClick={(e) => history.goBack()}
              >
                Back
              </Button>
            </Grid>
            <Grid item lg={6} md={6} xs={12} sm={12}>
              <Button
                variant="contained"
                color="primary"
                style={{ width: "100%", padding: "1rem 0" }}
                onClick={handleAddUserSubmit}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </SideBar>
    </>
  );
};

export default AddUser;
