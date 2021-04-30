import {
  Avatar, Checkbox, Fade, FormControl, FormControlLabel, FormHelperText, IconButton, InputAdornment, InputLabel, Modal,
  OutlinedInput, TextField,
}                                    from '@material-ui/core';
import Backdrop                      from '@material-ui/core/Backdrop';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import CheckCircleIcon               from '@material-ui/icons/CheckCircle';
import ErrorIcon                     from '@material-ui/icons/Error';
import { addUser }                   from 'actions/user.actions';
import SideBar                       from 'components/SideBar';
import AddUserValidator              from 'containers/AdminDashboard/AddUser/addUserValidator';
import 'containers/AdminDashboard/AddUser/style.css';
import useFormAddUser                from 'containers/AdminDashboard/AddUser/useFormAddUser';
import React, { useState }           from 'react';
import { useDispatch, useSelector }  from 'react-redux';
import { Link }                      from 'react-router-dom';

const AddUser = (props) => {
  const dispatch = useDispatch();
  const add_user = useSelector((state) => state.user.add_user);
  const handleAddUser = () => {
    // var form = new FormData();
    // Object.keys(addUserValue).map((item) => {
    //   form.append(item, addUserValue[item]);
    // });
    dispatch(addUser(addUserValue));
    console.log('sdfjsd');
    setModalOpen(true);
  };

  const nextSlide = () => {
    const slider_div = document.getElementById('add__user__details__slides');
    slider_div.style.transform = 'translateX(-50%)';
  };
  const prevSlide = () => {
    const slider_div = document.getElementById('add__user__details__slides');
    slider_div.style.transform = 'translateX(0%)';
  };
  const {
          addUserValue,
          handleAddUserSubmit,
          updateAddUser,
          addUserErrors,
        } = useFormAddUser(nextSlide, AddUserValidator);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  // const ErrorModal = () => {
  //   return(
  // );
  // };

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
                style={{ fontSize: '5.5rem' }}
              />
            ) : null}
            {add_user.error.found ? (
              <ErrorIcon
                className="signup-response-modal-icon"
                style={{ fontSize: '5.5rem' }}
              />
            ) : null}
            <h2 id="transition-modal-title">
              {add_user.added
                ? 'Success'
                : add_user.error
                  ? 'Error'
                  : 'Waiting for response'}
            </h2>
            <p id="transition-modal-description">
              {add_user.added
                ? 'User creation successfull'
                : add_user.error.message}
            </p>
          </div>
        </Fade>
      </Modal>
      <SideBar active="Users">
        <div className="add__user__div">
          <h3>Add User</h3>
          <div className="add__user__details__outer__div">
            <div
              id="add__user__details__slides"
              className="add__user__details__slides"
            >
              <div className="add__user__details__slide add__user__details__div">
                <h4>Details</h4>
                <TextField
                  variant="outlined"
                  type="text"
                  name="firstname"
                  className="input"
                  label="Firstname"
                  value={addUserValue.firstname}
                  onChange={(e) => updateAddUser(e)}
                  error={addUserErrors.firstname ? true : false}
                  helperText={addUserErrors.firstname}
                />
                <TextField
                  variant="outlined"
                  type="text"
                  name="lastname"
                  className="input"
                  label="Lastname"
                  value={addUserValue.lastname}
                  onChange={(e) => updateAddUser(e)}
                  error={addUserErrors.lastname ? true : false}
                  helperText={addUserErrors.lastname}
                />
                <TextField
                  variant="outlined"
                  type="text"
                  className="input"
                  name="email"
                  label="Email"
                  value={addUserValue.email}
                  onChange={(e) => updateAddUser(e)}
                  error={addUserErrors.email ? true : false}
                  helperText={addUserErrors.email}
                />

                <FormControl variant="outlined" className="input">
                  <Avatar src={addUserValue.profile_picture} />
                  <InputLabel htmlFor="outlined-profile-picture">
                    Profile Picture
                  </InputLabel>
                  <OutlinedInput
                    type="file"
                    id="outlined-profile-picture"
                    name="profile_picture"
                    onChange={(e) => updateAddUser(e)}
                    labelWidth={105}
                  />
                </FormControl>
                <FormControl
                  variant="outlined"
                  className="input password-input"
                  error={addUserErrors.password ? true : undefined}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password *
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    name="password"
                    placeholder="Min 6 letters & a capital letter"
                    type={showPassword ? 'text' : 'password'}
                    value={addUserValue.password}
                    // className="input"
                    onChange={(e) => updateAddUser(e)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={(e) => setShowPassword(!showPassword)}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                  <FormHelperText id="my-helper-text">
                    {addUserErrors.password ? addUserErrors.password : ''}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  variant="outlined"
                  className="input"
                  required
                  error={addUserErrors.confirm_password ? true : false}
                >
                  <InputLabel htmlFor="outlined-adornment-confirm-password">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-confirm-password"
                    name="confirm_password"
                    placeholder="Min 6 letters & a capital letter"
                    type={showConfirmPassword ? 'text' : 'password'}
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
                    labelWidth={70}
                  />
                  <FormHelperText id="my-helper-text">
                    {addUserErrors.confirm_password}
                  </FormHelperText>
                </FormControl>

                {/* <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple">
                  Age
                </InputLabel>
                <Select
                  native
                  value={addUserValue.role}
                  label="Role"
                  inputProps={{
                    name: "role",
                    id: "outlined-age-native-simple",
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value="admin">Admin</option>
                  <option value="internal">Internal</option>
                </Select>
              </FormControl> */}
                <div className="button__div">
                  <button className="btn add__user__cancel__form__button">
                    <Link
                      to="/dashboard/users"
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                      Cancel
                    </Link>
                  </button>
                  <button
                    className="btn add__user__next__form__button"
                    onClick={(e) => handleAddUserSubmit(e)}
                  >
                    Next
                  </button>
                </div>
              </div>
              <div className="add__user__details__slide add__user__permissions__div">
                <h4>Permissions</h4>
                <div className="add__user__permissions">
                  {Object.keys(addUserValue.permissions).map(
                    (permission, key) => {
                      return (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={addUserValue.permissions[permission]}
                              onChange={(e) => updateAddUser(e)}
                              name={permission}
                              color="primary"
                              className="add__user__permission__checkbox"
                            />
                          }
                          // style={{ backgroundColor: "red", fontSize: "12px" }}
                          label={permission.replaceAll('_', ' ').toUpperCase()}
                          key={key}
                        />
                      );
                    }
                  )}
                  <div className="permission__button__div">
                    <button
                      className="btn add__user__cancel__form__button"
                      onClick={(e) => prevSlide()}
                    >
                      Back
                    </button>
                    <button
                      className="btn add__user__next__form__button"
                      onClick={(e) => handleAddUser()}
                    >
                      Next
                    </button>
                  </div>
                </div>

                {/* <FormControlLabel
                control={
                  <Checkbox
                    // checked={state.checkedB}
                    // onChange={handleChange}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Primary"
              /> */}
              </div>
            </div>
          </div>
        </div>
      </SideBar>
    </>
  );
};

export default AddUser;
