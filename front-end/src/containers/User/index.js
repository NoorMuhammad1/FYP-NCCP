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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import passwordValidator from "./passwordValidator";
import { PermissionData } from "./PermissionData";
import PersonalInformationValidator from "./PersonalInformationValidator";
import useFormPassword from "./useFormPassword";
import useFormPersonalInformation from "./useFormPersonalInformation";

const User = (props) => {
  const { id } = props.location.state;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [permission, setPermission] = useState({});

  // hook to change edit or save state of personal information
  const [editPersonalInformation, setEditPersonalInformation] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [editPermissions, setEditPermission] = useState(false);

  // Validtion Hooks and its functions
  const handleInformationSubmission = () => {
    setEditPersonalInformation(false);
    setEditPermission(false);
    setEditPassword(false);
    dispatch(updateUserInfo({ ...personalInformationValue, _id: id }, id));
  };

  const handlePasswordChangeSubmission = () => {
    setEditPassword(false);

    dispatch(resetPassword({ password: passwordValue.password, id }));
  };

  const handleProfilePictureSubmission = (e) => {
    const data = new FormData();
    data.append("user_id", id);
    data.append("profilePicture", e.target.files[0]);
    dispatch(updateUserProfilePicture(data, id));
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

  // Use Effects

  useEffect(() => {
    dispatch(getUserData(id));
  }, []);

  useEffect(() => {
    if (user) {
      setInitial({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        contactNumber: user.contactNumber,
        permissions: user.permissions,
        description: user.description,
        profilePicture: user.profilePicture,
      });
    }
  }, [user]);
  return (
    <SideBar active="Users">
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
            {user && user.role !== "external" && (
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
            )}
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
    </SideBar>
  );
};

const styles = {
  container: {
    minHeight: "90vh",
    margin: "1rem 0",
  },
};
export default User;

// import {
//   Card,
//   CardActions,
//   CardContent,
//   CardHeader,
//   Button,
//   TextField,
//   Grid,
//   InputBase,
//   IconButton,
//   NativeSelect,
//   FormControl,
//   InputLabel,
//   Select,
//   FormControlLabel,
//   Checkbox,
//   Avatar,
// } from "@material-ui/core";
// import EditIcon from "@material-ui/icons/Edit";
// import SaveIcon from "@material-ui/icons/Save";
// import { getUserData } from "actions";
// import SideBar from "components/SideBar";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { PermissionData } from "./PermissionData";

// const User = (props) => {
//   const { id } = props.location.state;
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user.user);
//   const [personalInfo, setPersonalInfo] = useState({});
//   const [credentials, setCredentials] = useState({});
//   const [permissons, setPermissions] = useState({});
//   const [editPersonalInfo, setEditPersonalInfo] = useState(false);
//   const [editCredentials, setEditCredentials] = useState(false);
//   const [editPermission, setEditPermissions] = useState(false);

//   useEffect(() => {
//     dispatch(getUserData(id));
//   }, []);

//   useEffect(() => {
//     if (user) {
//       const {
//         firstname,
//         lastname,
//         email,
//         role,
//         description,
//         contactNumber,
//         permissions,
//         profilePicture,
//       } = user;
//       setPersonalInfo({
//         firstname,
//         lastname,
//         email,
//         description,
//         contactNumber,
//         profilePicture,
//       });
//       setCredentials({
//         role,
//       });
//       setPermissions({
//         ...permissions,
//       });
//     }
//   }, [user]);

//   const handlePersonalInfoChange = (e) => {
//     setPersonalInfo({
//       ...personalInfo,
//       [e.target.name]: e.target.value,
//     });
//   };
//   const handleCredentialsChange = (e) => {
//     setCredentials({
//       ...credentials,
//       [e.target.name]: e.target.value,
//     });
//   };
//   const handlePermissionsChange = (e) => {
//     setPermissions({
//       ...permissons,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleEditPersonalInfo = () => {
//     setEditPersonalInfo(true);
//   };
//   const handleEditCredentials = () => {
//     setEditCredentials(true);
//   };
//   const handleEditPermissions = () => {
//     setEditPermissions(true);
//   };

//   const handlePersonalInfoSave = () => {
//     setEditPersonalInfo(false);
//   };

//   const handleCredentialsSave = () => {
//     setEditCredentials(false);
//   };
//   const handlePermissionSave = () => {
//     setEditPermissions(false);
//   };

//   const handleResetPassword = () => {
//     alert("resetiing password");
//   };

//   return (
//     <SideBar active="Users">
//       <Grid container spacing={3} style={{ marginTop: "2rem" }}>
//         <Grid item xs={12} sm={12} md={9} lg={9}>
//           <Card style={{ padding: "1rem", paddingBottom: "2rem" }}>
//             <CardHeader
//               title="Personal Information"
//               titleTypographyProps={{ variant: "h6", color: "primary" }}
//               action={
//                 <>
//                   {editPersonalInfo === true ? (
//                     <Button
//                       style={{ marginTop: "1.3rem" }}
//                       color="primary"
//                       onClick={handlePersonalInfoSave}
//                     >
//                       Save
//                     </Button>
//                   ) : (
//                     <Button
//                       style={{ marginTop: "1.3rem" }}
//                       color="primary"
//                       onClick={handleEditPersonalInfo}
//                     >
//                       Edit
//                     </Button>
//                   )}
//                 </>
//               }
//             />

//             <CardContent>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} alignContent="stretch">
//                   <TextField
//                     style={{ width: "100%" }}
//                     disabled={!editPersonalInfo}
//                     label="First Name"
//                     value={personalInfo.firstname}
//                     onChange={handlePersonalInfoChange}
//                     name="firstname"
//                     variant="outlined"
//                   />
//                 </Grid>
//                 <Grid item xs={12} alignContent="stretch">
//                   <TextField
//                     style={{ width: "100%" }}
//                     disabled={!editPersonalInfo}
//                     label="Last Name"
//                     value={personalInfo.lastname}
//                     onChange={handlePersonalInfoChange}
//                     name="lastname"
//                     variant="outlined"
//                   />
//                 </Grid>
//                 <Grid item xs={12} alignContent="stretch">
//                   <TextField
//                     style={{ width: "100%" }}
//                     disabled={!editPersonalInfo}
//                     label="Email"
//                     value={personalInfo.email}
//                     onChange={handlePersonalInfoChange}
//                     name="email"
//                     variant="outlined"
//                   />
//                 </Grid>
//                 <Grid item xs={12} alignContent="stretch">
//                   <TextField
//                     style={{ width: "100%" }}
//                     disabled={!editPersonalInfo}
//                     label="Contact Number"
//                     value={personalInfo.contactNumber}
//                     onChange={handlePersonalInfoChange}
//                     name="contactNumber"
//                     variant="outlined"
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     style={{ width: "100%" }}
//                     multiline
//                     rows={4}
//                     disabled={!editPersonalInfo}
//                     label="Description"
//                     value={personalInfo.description}
//                     onChange={handlePersonalInfoChange}
//                     name="description"
//                     variant="outlined"
//                   />
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={12} md={3} lg={3}>
//           <Grid container spacing={2}>
//             <Grid item style={{ width: "100%" }}>
//               <Card
//                 style={{
//                   padding: "1rem",
//                   paddingBottom: "2rem",
//                   width: "100%",
//                 }}
//               >
//                 <CardHeader
//                   title="Profile Picture"
//                   titleTypographyProps={{ variant: "h6", color: "primary" }}
//                   style={{ marginTop: "1rem" }}
//                 />
//                 <CardContent
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Avatar
//                     src={personalInfo.profilePicture}
//                     style={{
//                       border: "px solid lightgray",
//                       width: "7.6rem",
//                       height: "7.6rem",
//                     }}
//                   />
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       flexWrap: "wrap",
//                     }}
//                   >
//                     <Button
//                       style={{ marginTop: "0.5rem" }}
//                       color="primary"
//                       onClick={handleEditPersonalInfo}
//                     >
//                       Remove
//                     </Button>
//                     <Button
//                       style={{ marginTop: "0.5rem" }}
//                       color="primary"
//                       onClick={handleEditPersonalInfo}
//                     >
//                       Change
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item style={{ width: "100%" }}>
//               <Card
//                 style={{
//                   padding: "1rem",
//                   paddingBottom: "2rem",
//                   width: "100%",
//                 }}
//               >
//                 <CardHeader
//                   title="Credentials"
//                   titleTypographyProps={{ variant: "h6", color: "primary" }}
//                   style={{ marginTop: "1rem" }}
//                   // action={
//                   //   <>
//                   //     {editCredentials === true ? (
//                   //       <Button
//                   //         style={{ marginTop: "1.3rem" }}
//                   //         color="primary"
//                   //         onClick={handleCredentialsSave}
//                   //       >
//                   //         Save
//                   //       </Button>
//                   //     ) : (
//                   //       <Button
//                   //         style={{ marginTop: "1.3rem" }}
//                   //         color="primary"
//                   //         onClick={handleEditCredentials}
//                   //       >
//                   //         Edit
//                   //       </Button>
//                   //     )}
//                   //   </>
//                   // }
//                 />
//                 <CardContent>
//                   <div
//                     style={{ display: "flex", justifyContent: "space-between" }}
//                   >
//                     <p style={{ fontWeight: "bold" }}>Role</p>
//                     <p>
//                       {credentials.role ? credentials.role.toUpperCase() : ""}
//                     </p>
//                   </div>
//                   <Button
//                     style={{ marginTop: "1.3rem" }}
//                     color="primary"
//                     onClick={handleResetPassword}
//                   >
//                     Reset Password
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
//         </Grid>

//         <Grid item lg md sm={12} xs={12}>
//           <Card style={{ padding: "1rem", paddingBottom: "2rem" }}>
//             <CardHeader
//               title="Permissons"
//               titleTypographyProps={{ variant: "h6", color: "primary" }}
//               action={
//                 <>
//                   {editPermission === true ? (
//                     <Button
//                       style={{ marginTop: "1.3rem" }}
//                       color="primary"
//                       onClick={handlePermissionSave}
//                     >
//                       Save
//                     </Button>
//                   ) : (
//                     <Button
//                       style={{ marginTop: "1.3rem" }}
//                       color="primary"
//                       onClick={handleEditPermissions}
//                     >
//                       Edit
//                     </Button>
//                   )}
//                 </>
//               }
//             />
//             <CardContent>
//               <Grid container spacing={2}>
//                 {PermissionData.map((permission, index) => {
//                   return (
//                     <Grid item xs={12} sm={12} md={4} lg={4}>
//                       <FormControlLabel
//                         key={index}
//                         disabled={!editPermission}
//                         control={
//                           <Checkbox
//                             checked={true}
//                             onChange={handlePermissionsChange}
//                             name={permission.name}
//                             color="primary"
//                           />
//                         }
//                         label={permission.title}
//                       />
//                     </Grid>
//                   );
//                 })}
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//       <Card style={{ marginTop: "3rem" }}>
//         <CardHeader
//           style={{
//             padding: "1rem 1rem",
//           }}
//           title="Personal Information"
//           titleTypographyProps={{ variant: "h6", color: "primary" }}
//         />
//         <CardContent>
//           <Grid container spacing={3}>
//             <Grid item lg={6} md={6}>
//               <TextField
//                 label="First Name"
//                 id="user-first-name"
//                 defaultValue="Default Value"
//                 variant="outlined"
//                 style={{ minWidth: 350 }}
//               />
//             </Grid>
//             <Grid item lg={6} md={6}>
//               <TextField
//                 label="Last Name"
//                 id="user-last-name"
//                 defaultValue="Default Value"
//                 // className={classes.textField}
//                 // margin="dense"
//                 variant="outlined"
//                 style={{ minWidth: 350 }}
//               />
//             </Grid>
//             <Grid item lg={6} md={6}>
//               <TextField
//                 label="Email"
//                 id="user-email"
//                 defaultValue="Default Value"
//                 // className={classes.textField}
//                 // margin="dense"
//                 variant="outlined"
//                 style={{ minWidth: 350 }}
//               />
//             </Grid>
//             <Grid item lg={6} md={6}>
//               <TextField
//                 label="Contact Number"
//                 id="user-contact-number"
//                 defaultValue="Default Value"
//                 // className={classes.textField}
//                 // margin="dense"
//                 disabled
//                 variant="outlined"
//                 style={{ minWidth: 350 }}
//               />
//             </Grid>
//             <Grid item>
//               <TextField
//                 id="user-description"
//                 label="Description"
//                 multiline
//                 rows={6}
//                 defaultValue="Default Value"
//                 variant="outlined"
//               />
//             </Grid>
//           </Grid>
//         </CardContent>
//         <CardActions
//           style={{
//             display: "flex",
//             justifyContent: "flex-end",
//             padding: "1rem",
//             // padding: "2rem",
//           }}
//         >
//           <Button
//             style={{ alignSelf: "right" }}
//             variant="contained"
//             color="primary"
//           >
//             Save
//           </Button>
//         </CardActions>
//       </Card>
//     </SideBar>
//   );
// };

// export default User;

// // import React, { useEffect, useState } from "react";
// // import { Button, Container, Form, Image, Row, Spinner } from "react-bootstrap";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Redirect } from "react-router-dom";
// // import { getUserData, updateUserInfo } from "../../actions/user.actions";
// // import Layout from "../../components/Layout";
// // import Input from "../../components/UI/Input/input";

// // const User = (props) => {
// //   const authenticate = useSelector((state) => state.auth.authenticate);
// //   const token = useSelector((state) => state.auth.token);
// //   const dispatch = useDispatch();
// //   const { userID } = props.location.state;

// //   const user = useSelector((state) => state.user);

// //   // const [updateUser, setUpdateUser] = useState(
// //   //   useSelector((state) => state.userUpdate)
// //   // );
// //   const update = useSelector((state) => state.userUpdate);

// //   const [userData, setUserData] = useState({});
// //   const [updateForm, setUpdateForm] = useState(false);
// //   const [savingData, setSavingData] = useState(false);

// //   useEffect(() => {
// //     dispatch(getUserData(userID, token));
// //   }, []);

// //   useEffect(() => {
// //     setUserData(user.user);
// //   }, [user]);

// //   const updateValue = (e) => {
// //     setUserData({
// //       ...userData,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   const handleUpdateForm = (command) => {
// //     if (command === "save") {
// //       dispatch(updateUserInfo(userData, token));
// //       setSavingData(!savingData);
// //     }
// //     setUpdateForm(!updateForm);
// //   };

// //   if (!authenticate) {
// //     return <Redirect to="/" />;
// //   }
// //   return (
// //     <Layout sidebar>
// //       {update.updating ? (
// //         <Spinner animation="border" role="status">
// //           <span className="sr-only">Loading...</span>
// //         </Spinner>
// //       ) : (
// //         <>
// //           <p>{JSON.stringify(update.message)}</p>
// //           <Button
// //             onClick={(e) =>
// //               handleUpdateForm(e.target.innerHTML.trim().toLowerCase())
// //             }
// //           >
// //             {updateForm ? "Save" : "Edit"}
// //           </Button>
// //           <Container>
// //             <Row>
// //               <Input
// //                 id="first_name"
// //                 label="Fristname"
// //                 type="text"
// //                 name="firstname"
// //                 disabled={!updateForm}
// //                 value={userData.firstname}
// //                 onChange={(e) => updateValue(e)}
// //                 placeholder="Firstname"
// //               />
// //             </Row>
// //             <Row>
// //               <Input
// //                 id="last_name"
// //                 label="Lastname"
// //                 type="text"
// //                 name="lastname"
// //                 value={userData.lastname}
// //                 disabled={!updateForm}
// //                 onChange={(e) => updateValue(e)}
// //                 placeholder="Lastname"
// //               />
// //             </Row>
// //             <Row>
// //               <Input
// //                 id="email"
// //                 label="Email"
// //                 type="text"
// //                 name="email"
// //                 value={userData.email}
// //                 disabled={!updateForm}
// //                 onChange={(e) => updateValue(e)}
// //                 placeholder="Email"
// //               />
// //             </Row>
// //             <Row>
// //               <Input
// //                 id="contact-number"
// //                 label="Contact Number"
// //                 type="text"
// //                 name="contactNumber"
// //                 value={userData.contactNumber}
// //                 disabled={!updateForm}
// //                 onChange={(e) => updateValue(e)}
// //                 placeholder="Contact Number"
// //               />
// //             </Row>
// //             <Row>
// //               <Form.Label>Profile Picture</Form.Label>
// //               <Image src="https://picsum.photos/171/180" roundedCircle />
// //             </Row>
// //             <Row>
// //               <Input
// //                 id="affiliation"
// //                 label="Affiliation"
// //                 type="text"
// //                 name="affiliation"
// //                 value={userData.affiliation ? userData.affiliation : "NULL"}
// //                 disabled={!updateForm}
// //                 onChange={(e) => updateValue(e)}
// //                 placeholder="Affiliation"
// //               />
// //             </Row>
// //             <Row>
// //               <Input
// //                 id="description"
// //                 label="Description"
// //                 type="textarea"
// //                 as="textarea"
// //                 rows={3}
// //                 name="description"
// //                 value={userData.description}
// //                 disabled={!updateForm}
// //                 onChange={(e) => updateValue(e)}
// //                 placeholder="Description"
// //               />
// //             </Row>
// //             {userData.permissions
// //               ? Object.keys(userData.permissions).map((permission) => (
// //                   <Form.Check
// //                     label={permission}
// //                     name={permission}
// //                     checked={userData.permissions[permission]}
// //                     disabled={!updateForm}
// //                     onChange={(e) =>
// //                       (userData.permissions[permission] = e.target.checked)
// //                     }
// //                   ></Form.Check>
// //                 ))
// //               : undefined}
// //           </Container>
// //         </>
// //       )}
// //     </Layout>
// //   );
// // };

// // export default User;
