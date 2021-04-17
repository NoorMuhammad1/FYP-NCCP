import React, { useRef, useState } from "react";
import SideBar from "../../components/SideBar";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import MailIcon from "@material-ui/icons/Mail";
import CreateIcon from "@material-ui/icons/Create";
import { TextField } from "@material-ui/core";
import Button from "../../components/UI/Button/Button";
import useFormUserSettings from "./useFormUserSettings";
import userSettingsValidator from "./userSettingsValidator";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserInfo,
  updateUserProfilePicture,
} from "../../actions/user.actions";
const AdminDashboardSettings = () => {
  const dispatch = useDispatch();
  const handleBasicInformationSubmission = () => {
    setEditUserInfo(true);
    dispatch(updateUserInfo(UserSettingsValue));
  };
  const {
    handleUserSettingsSubmit,
    UserSettingsValue,
    updateUserSettingsValue,
    UserSettingsErrors,
  } = useFormUserSettings(
    handleBasicInformationSubmission,
    userSettingsValidator
  );

  const [editUserInfo, setEditUserInfo] = useState(true);
  const [updateProfilePicture, setUpdateProfilePicture] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const inputFile = useRef(null);

  const handlePictureChange = (e) => {
    const formData = new FormData();
    formData.append("user_id", user._id);
    formData.append("profilePicture", UserSettingsValue.profilePicture);
    dispatch(updateUserProfilePicture(formData));
    setUpdateProfilePicture(false);
  };

  return (
    <SideBar active="settings">
      <div className="settings-outer-div">
        <div className="basic-information-menu-div">
          <div className="user-settings-image">
            <Badge
              overlap="circle"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              badgeContent={
                <Avatar
                  style={{
                    backgroundColor: "rgb(51, 104, 198)",
                    width: "30px",
                    height: "30px",
                  }}
                >
                  <CreateIcon style={{ width: "18px", height: "18px" }} />
                </Avatar>
              }
            >
              <Avatar
                alt={`${UserSettingsValue.firstname} ${UserSettingsValue.lastname}`}
                style={{ width: "100px", height: "100px" }}
                src={UserSettingsValue.profilePicture}
              />
            </Badge>
          </div>
          {updateProfilePicture ? (
            <Button
              backgroundColor="rgb(51, 104, 198)"
              text="Save"
              onClick={(e) => handlePictureChange(e)}
              className="basic-information-button"
            />
          ) : null}

          <div className="user-settings-options-div">
            <ul className="user-settings-options-list">
              <li
                className="user-settings-option"
                onClick={() => setEditUserInfo(false)}
              >
                Change Information
              </li>
              <li className="user-settings-option">Change Password</li>
              <li
                className="user-settings-option"
                onClick={() => inputFile.current.click()}
              >
                Change Profile Picture
                <input
                  type="file"
                  id="file"
                  name="profilePicture"
                  // value={UserSettingsValue.profilePicture}
                  onChange={(e) => {
                    updateUserSettingsValue(e);
                    setUpdateProfilePicture(true);
                  }}
                  ref={inputFile}
                  style={{ display: "none" }}
                />
              </li>
            </ul>
          </div>
        </div>
        <div className="basic-information-div">
          <TextField
            className="basic-information-textfield"
            variant="outlined"
            label="Firstname"
            name="firstname"
            value={UserSettingsValue.firstname}
            onChange={(e) => updateUserSettingsValue(e)}
            error={UserSettingsErrors.firstname ? true : false}
            helperText={UserSettingsErrors.firstname}
            disabled={editUserInfo}
          />
          <TextField
            className="basic-information-textfield"
            variant="outlined"
            label="Lastname"
            name="lastname"
            value={UserSettingsValue.lastname}
            onChange={(e) => updateUserSettingsValue(e)}
            error={UserSettingsErrors.lastname ? true : false}
            helperText={UserSettingsErrors.lastname}
            disabled={editUserInfo}
          />
          <TextField
            className="basic-information-textfield"
            variant="outlined"
            type="email"
            label="Email"
            name="email"
            value={UserSettingsValue.email}
            onChange={(e) => updateUserSettingsValue(e)}
            error={UserSettingsErrors.email ? true : false}
            helperText={UserSettingsErrors.email}
            disabled={editUserInfo}
          />
          <TextField
            variant="outlined"
            label="Contact Number"
            name="contactNumber"
            className="basic-information-textfield"
            value={UserSettingsValue.contactNumber}
            onChange={(e) => updateUserSettingsValue(e)}
            error={UserSettingsErrors.contactNumber ? true : false}
            helperText={UserSettingsErrors.contactNumber}
            disabled={editUserInfo}
          />

          {editUserInfo ? null : (
            <Button
              backgroundColor="rgb(51, 104, 198)"
              text="Update"
              onClick={(e) => handleUserSettingsSubmit(e)}
              className="basic-information-button"
            />
          )}
        </div>
      </div>
      {/* <h1>Settings</h1>

      <div className="settings-form-div">
        <div className="profile-picture-settings">
          <Badge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent={
              <Avatar
                style={{
                  backgroundColor: "blue",
                  width: "22px",
                  height: "22px",
                }}
              >
                <CreateIcon style={{ width: "15px", height: "15px" }} />
              </Avatar>
            }
          >
            <Avatar alt="Travis Gowrd" />
          </Badge>
        </div>

        <TextField variant="outlined" label="Firstname" name="firstname" />
        <TextField variant="outlined" label="Lastname" name="lastname" />
        <TextField variant="outlined" label="Email" name="email" />
        <TextField
          variant="outlined"
          label="Contact Number"
          name="contactNumber"
        />
        <div className="operations-div">
          <Button
            backgroundColor="rgb(51, 104, 198)"
            text="Reset Password"
            onClick={(e) => alert("hi")}
          />
          <Button
            backgroundColor="rgb(51, 104, 198)"
            text="Update"
            onClick={(e) => alert("hi")}
          />
        </div>
      </div> */}
    </SideBar>
  );
};

export default AdminDashboardSettings;
