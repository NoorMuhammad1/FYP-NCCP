import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import React, { useState } from "react";
import { translate } from "react-range/lib/utils";
import { Link } from "react-router-dom";
import ResetPasswordValidator from "./ResetPasswordValidator";
import axios from "../../helpers/axios";

import "./style.css";
import useFormResetPassword from "./useFormResetPassword";
const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const [message, setMessage] = useState("");
  const token = window.location.href.split("/")[
    window.location.href.split("/").length - 1
  ];
  const handleSubmission = async () => {
    await axios
      .post("/resetPassword", { token, password: resetPassword.password })
      .then((response) => {
        setPasswordReset(true);
        setMessage(response.data.message);
      })
      .catch(({ response }) => {
        setPasswordReset(false);
        setMessage(response.data.message);
      });
    console.log("hii");
    const slides = document.querySelector(".slides");
    slides.style.transform = "translate(-50%)";
  };
  const {
    resetPassword,
    handleResetSubmit,
    updateResetPassword,
    resetPasswordErrors,
  } = useFormResetPassword(handleSubmission, ResetPasswordValidator);

  const passwordForm = () => {
    return (
      <div className="reset-password-div">
        <h3>Set new password</h3>
        <div className="reset-password-form">
          <FormControl
            variant="outlined"
            name="password"
            className="password-input-box"
            error={resetPasswordErrors.password}
          >
            <InputLabel htmlFor="password">New password</InputLabel>
            <OutlinedInput
              id="password"
              name="password"
              // className="password-input-box"
              placeholder="Min 6 characters with atleast one capital letter"
              type={showPassword ? "text" : "password"}
              value={resetPassword.password}
              onChange={(e) => updateResetPassword(e)}
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
              labelWidth={105}
            />
            <FormHelperText>
              {resetPasswordErrors.password ? resetPasswordErrors.password : ""}
            </FormHelperText>
          </FormControl>
          <FormControl
            variant="outlined"
            name="confirm_password"
            className="password-input-box"
            error={resetPasswordErrors.confirm_password}
          >
            <InputLabel htmlFor="confirm_password">Confirm password</InputLabel>
            <OutlinedInput
              id="confirm_password"
              name="confirm_password"
              placeholder="Min 6 characters with atleast one capital letter"
              type={showConfirmPassword ? "text" : "password"}
              value={resetPassword.confirm_password}
              onChange={(e) => updateResetPassword(e)}
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
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={105}
            />
            <FormHelperText>
              {resetPasswordErrors.confirm_password
                ? resetPasswordErrors.confirm_password
                : ""}
            </FormHelperText>
          </FormControl>
        </div>
        <button
          onClick={(e) => handleResetSubmit(e)}
          className="reset-password-btn"
        >
          Reset
        </button>
      </div>
    );
  };

  const resetResponseSlide = () => {
    return (
      <div className="reset-response-div">
        <h3 className="reset-response-title">
          {passwordReset
            ? "Your account password has been changed successfully"
            : "Password reset failed"}
        </h3>
        <p>{message}</p>
        {passwordReset ? (
          <Link to="">Go to Sign In</Link>
        ) : (
          <Link
            onClick={(e) => {
              const slides = document.querySelector(".slides");
              slides.style.transform = "translate(0%)";
            }}
          >
            Go back to reset
          </Link>
        )}
      </div>
    );
  };

  const [currentSlider, setCurrentSlider] = useState(true);

  return (
    <div className="reset-password-outer-div">
      <div className="slider-outer-div">
        <div className={`slides`}>
          <div className="slide">{passwordForm()}</div>
          <div className="slide">{resetResponseSlide()}</div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
