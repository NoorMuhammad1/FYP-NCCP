import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
} from "@material-ui/core";
import {
  getUserData,
  resetPassword,
  updateUserInfo,
  updateUserProfilePicture,
} from "actions";
import SideBar from "components/SideBar";
import UserSideBar from "components/UserSidebar/UserSidebar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import passwordValidator from "./passwordValidator";
// import { PermissionData } from "./PermissionData";
import PersonalInformationValidator from "./PersonalInformationValidator";
import useFormPassword from "./useFormPassword";
import useFormPersonalInformation from "./useFormPersonalInformation";

const UserSettings = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const id = useSelector((state) => state.auth.user._id);
  const [editPersonalInformation, setEditPersonalInformation] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  const handleInformationSubmission = () => {
    setEditPersonalInformation(false);
    setEditPassword(false);
    dispatch(
      updateUserInfo({ ...personalInformationValue, _id: id }, id, user.role)
    );
  };

  const handlePasswordChangeSubmission = () => {
    setEditPassword(false);

    dispatch(
      resetPassword({ password: passwordValue.password, id }, user.role)
    );
  };

  const handleProfilePictureSubmission = (e) => {
    const data = new FormData();
    data.append("user_id", id);
    data.append("profilePicture", e.target.files[0]);
    dispatch(updateUserProfilePicture(data, id, user.role));
  };

  const {
    handlePersonalInformationSubmit,
    personalInformationValue,
    updatePersonalInformationValue,
    personalInformationErrors,
    setInitial,
  } = useFormPersonalInformation(
    handleInformationSubmission,
    PersonalInformationValidator
  );

  const {
    passwordValue,
    handlepasswordSubmit,
    updatepasswordValue,
    passwordErrors,
  } = useFormPassword(handlePasswordChangeSubmission, passwordValidator);

  const editPersonalInfo = () => {
    setEditPersonalInformation(true);
  };

  const handlePersonalInformationSave = (e) => {
    handlePersonalInformationSubmit(e);
  };
  useEffect(() => {
    if (user) {
      console.log("Contact Number", user.contactNumber);
      setInitial({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        contactNumber: user.contactNumber || "",
        description: user.description || "",
        profilePicture: user.profilePicture || "",
      });
    }
  }, [user]);

  return (
    <UserSideBar active="settings">
      <Grid container lg sm xs md style={styles.container} spacing={2}>
        <Grid item lg={6} md={6} xs={12} sm={12}>
          <Card style={{ width: "100%", height: "100%" }}>
            <CardHeader
              title="Personal Information"
              titleTypographyProps={{ color: "primary" }}
              action={
                <>
                  {editPersonalInformation == false ? (
                    <Button
                      style={{ marginTop: "0.8rem" }}
                      color="primary"
                      onClick={editPersonalInfo}
                    >
                      Edit
                    </Button>
                  ) : (
                    <Button
                      color="primary"
                      style={{ marginTop: "0.8rem" }}
                      onClick={handlePersonalInformationSave}
                    >
                      Save
                    </Button>
                  )}
                </>
              }
            />
            <CardContent>
              <Grid container direction="column" spacing={3}>
                <Grid
                  item
                  xs
                  md
                  lg
                  sm
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={personalInformationValue.profilePicture}
                    style={{ width: "6rem", height: "6rem" }}
                  />
                  {editPersonalInformation && (
                    <div
                      style={{
                        width: "200px",
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "1rem",
                      }}
                    >
                      <Button
                        color="primary"
                        variant="contained"
                        component="label"
                        // style={{
                        //   display: "flex",
                        //   // margin: "2rem 1rem",
                        // }}
                      >
                        Update
                        <input
                          type="file"
                          name="profilePicture"
                          onChange={handleProfilePictureSubmission}
                          hidden
                        />
                      </Button>
                      <Button
                        color="default"
                        variant="contained"
                        // style={{
                        //   display: "flex",
                        //   // margin: "2rem 1rem 2rem 0rem",
                        // }}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </Grid>
                <Grid item lg sm xs md>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="firstname"
                    label="First Name"
                    value={personalInformationValue.firstname}
                    disabled={!editPersonalInformation}
                    onChange={updatePersonalInformationValue}
                    error={personalInformationErrors.firstname}
                    helperText={personalInformationErrors.firstname}
                  />
                </Grid>
                <Grid item xs lg md sm>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="lastname"
                    label="Last Name"
                    value={personalInformationValue.lastname}
                    disabled={!editPersonalInformation}
                    onChange={updatePersonalInformationValue}
                    error={personalInformationErrors.lastname}
                    helperText={personalInformationErrors.lastname}
                  />
                </Grid>
                <Grid item xs lg md sm>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="email"
                    label="Email"
                    value={personalInformationValue.email}
                    disabled={!editPersonalInformation}
                    onChange={updatePersonalInformationValue}
                    error={personalInformationErrors.email}
                    helperText={personalInformationErrors.email}
                  />
                </Grid>
                <Grid item xs lg md sm>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="contactNumber"
                    label="Contact Number"
                    value={personalInformationValue.contactNumber}
                    disabled={!editPersonalInformation}
                    onChange={updatePersonalInformationValue}
                    error={personalInformationErrors.contactNumber}
                    helperText={personalInformationErrors.contactNumber}
                  />
                </Grid>
                <Grid item xs lg md sm>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="description"
                    label="Description"
                    multiline
                    rows={9}
                    value={personalInformationValue.description}
                    disabled={!editPersonalInformation}
                    onChange={updatePersonalInformationValue}
                    error={personalInformationErrors.description}
                    helperText={personalInformationErrors.description}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          {/* </Grid> */}
        </Grid>
        <Grid item lg={6} md={6} xs={12} sm={12}>
          <Grid container lg sm xs md direction="column">
            <Grid
              item
              lg={12}
              md={12}
              xs={12}
              sm={12}
              style={{ width: "100%" }}
            >
              <Card style={{ width: "100%", height: "100%" }}>
                <CardHeader
                  title="Password"
                  titleTypographyProps={{ color: "primary" }}
                  action={
                    <>
                      {editPassword == false ? (
                        <Button
                          style={{ marginTop: "0.8rem" }}
                          color="primary"
                          onClick={(e) => setEditPassword(true)}
                        >
                          Edit
                        </Button>
                      ) : (
                        <Button
                          color="primary"
                          style={{ marginTop: "0.8rem" }}
                          onClick={handlepasswordSubmit}
                        >
                          Save
                        </Button>
                      )}
                    </>
                  }
                />
                <CardContent>
                  <Grid
                    container
                    xs
                    lg
                    md
                    sm
                    direction="column"
                    justify="center"
                  >
                    <Grid item xs lg md sm>
                      <TextField
                        variant="outlined"
                        fullWidth
                        name="password"
                        label="Password"
                        value={passwordValue.password}
                        disabled={!editPassword}
                        onChange={updatepasswordValue}
                        error={passwordErrors.password}
                        helperText={passwordErrors.password}
                      />
                    </Grid>
                    <Grid item xs lg md sm style={{ marginTop: "1.3rem" }}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        value={passwordValue.confirmPassword}
                        disabled={!editPassword}
                        onChange={updatepasswordValue}
                        error={passwordErrors.confirmPassword}
                        helperText={passwordErrors.confirmPassword}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            {/* {user && user.role !== "external" && (
              <Grid
                item
                xs
                lg
                md
                sm
                style={{ width: "100%", marginTop: "1rem" }}
              >
                <Card style={{ width: "100%" }}>
                  <CardHeader
                    title="Permissions"
                    titleTypographyProps={{ color: "primary" }}
                    action={
                      <>
                        {editPermissions == false ? (
                          <Button
                            style={{ marginTop: "0.8rem" }}
                            color="primary"
                            onClick={(e) => setEditPermission(true)}
                          >
                            Edit
                          </Button>
                        ) : (
                          <Button
                            color="primary"
                            style={{ marginTop: "0.8rem" }}
                            onClick={handlePersonalInformationSave}
                          >
                            Save
                          </Button>
                        )}
                      </>
                    }
                  />
                  <CardContent>
                    <Grid container spacing={2}>
                      {PermissionData.map((permission, index) => {
                        return (
                          <Grid item xs={6} lg={6} md={6} sm={6}>
                            <FormControlLabel
                              key={index}
                              disabled={!editPermissions}
                              control={
                                <Checkbox
                                  checked={
                                    personalInformationValue.permissions
                                      ? personalInformationValue.permissions[
                                          permission.name
                                        ]
                                      : false
                                  }
                                  onChange={updatePersonalInformationValue}
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
            )} */}
          </Grid>
        </Grid>
        {/* <Grid item lg md sm xs>
          <div
            style={{
              display: "flex",
              paddingLeft: "0.4rem",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h5>Personal Information</h5>
            <Button color="primary" variant="text" onClick={editPersonalInfo}>
              {editPersonalInformation ? "Save" : "Edit"}
            </Button>
          </div>
          <Card>
            <CardContent>
              <Grid
                style={{ backgroundColor: "red" }}
                container
                lg
                sm
                md
                xs
                spacing={3}
                direction="column"
              >
                <Grid
                  item
                  xs={12}
                  md={5}
                  lg={5}
                  sm={12}
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Avatar style={{ width: "10rem", height: "10rem" }} />
                  {editPersonalInformation && (
                    <div
                      style={{
                        width: "200px",
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "1rem",
                      }}
                    >
                      <Button color="primary" variant="contained">
                        Update
                      </Button>
                      <Button color="default" variant="contained">
                        Remove
                      </Button>
                    </div>
                  )}
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={7}
                  lg={7}
                  sm={12}
                  style={{ padding: "1rem 3rem" }}
                >
                  <Grid container xs lg md sm direction="column" spacing={3}>
                    <Grid item xs lg md sm>
                      <TextField
                        variant="outlined"
                        fullWidth
                        name="firstname"
                        label="First Name"
                        // value={data.firstname}
                        disabled={!editPersonalInformation}
                        // onChange={handlePersonalInformationChange}
                        // error={errors.firstname}
                        // helperText={
                        //   errors.firstname ? "First Name cannot be empty" : ""
                        // }
                      />
                    </Grid>
                    <Grid item xs lg md sm>
                      <TextField
                        variant="outlined"
                        fullWidth
                        name="lastname"
                        label="Last Name"
                        // value={data.lastname}
                        disabled={!editPersonalInformation}
                        // onChange={handlePersonalInformationChange}
                        // error={errors.lastname}
                        // helperText={
                        //   errors.lastname ? "First Name cannot be empty" : ""
                        // }
                      />
                    </Grid>
                    <Grid item xs lg md sm>
                      <TextField
                        variant="outlined"
                        fullWidth
                        name="email"
                        label="Email"
                        // value={data.email}
                        disabled={!editPersonalInformation}
                        // onChange={handlePersonalInformationChange}
                        // error={errors.email}
                        // helperText={
                        //   errors.email ? "First Name cannot be empty" : ""
                        // }
                      />
                    </Grid>
                    <Grid item xs lg md sm>
                      <TextField
                        variant="outlined"
                        fullWidth
                        name="contactNumber"
                        label="Contact Number"
                        // value={data.contactNumber}
                        disabled={!editPersonalInformation}
                        // onChange={handlePersonalInformationChange}
                        // error={errors.contactNumber}
                        // helperText={
                        //   errors.contactNumber ? "First Name cannot be empty" : ""
                        // }
                      />
                    </Grid>
                    <Grid item xs lg md sm>
                      <TextField
                        variant="outlined"
                        fullWidth
                        name="description"
                        label="Description"
                        multiline
                        rows={4}
                        // value={data.description}
                        disabled={!editPersonalInformation}
                        // onChange={handlePersonalInformationChange}
                        // error={errors.description}
                        // helperText={
                        //   errors.description ? "First Name cannot be empty" : ""
                        // }
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Grid container lg sm xs md>
            <Grid item>profile</Grid>
            <Grid item>personal Info</Grid>
          </Grid>
        </Grid> */}
      </Grid>
      {/* <h1>Settings</h1>
      <Badge
        color="primary"
        badgeContent={
          <CreateIcon
            style={{
              width          : '12px',
              height         : '12px',
              borderRadius   : '2px solid royalblue',
              backgroundColor: 'royalblue',
            }}
          />
        }
        showZero
        overlap="circle"
        anchorOrigin={{
          vertical  : 'bottom',
          horizontal: 'right',
        }}
      >
        <Avatar />
      </Badge>

      <TextField variant="outlined" label="Firstname" /> */}
    </UserSideBar>
  );
};
const styles = {
  container: {
    minHeight: "90vh",
    margin: "1rem 0",
  },
};
export default UserSettings;
