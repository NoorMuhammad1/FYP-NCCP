import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../../actions";
import axios from "../../helpers/axios";
import "./style.css";
const ForgetPassword = () => {
  const emailValidator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const dispatch = useDispatch();
  const [emailValue, setEmailValue] = useState("");
  const [slideChange, setSlideChange] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmission = async () => {
    await axios
      .post("/forget-password", { email: emailValue })
      .then((response) => {
        setSlideChange(true);
        setEmailSent(true);
        setMessage(response.data.message);
      })
      .catch(({ response }) => {
        setSlideChange(true);
        setEmailSent(false);
        setMessage(response.data.message);
      });
    console.log("hii");
    // const slides = document.querySelector(".slides");
    // slides.style.transform = "translate(-50%)";
  };

  // useEffect(() => {
  //   if (slideChange) {
  //     dispatch(
  //       forgetPassword({
  //         email: emailValue,
  //       })
  //     );
  //   }
  // }, [slideChange]);
  return (
    <div className="outer-div">
      {/* <div className="upper-nav">Logo</div> */}
      {slideChange ? (
        <div className="check-email-div">
          <h3>{emailSent ? "Check your Email" : "Failed"}</h3>
          <p>{message}</p>
        </div>
      ) : (
        <div className="forget-password-div">
          <div className="forget-password-title">
            <h3>Forgot password</h3>
            <p>Instructions will be sent to your email</p>
          </div>

          <TextField
            label="Email"
            name="email"
            type="email"
            placeholder="example@name.com"
            variant="outlined"
            className="forgot-password-email-input"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            error={!emailValidator.test(emailValue.trim()) && emailValue !== ""}
            helperText="must be of form: name@gmail.com"
            required
          />
          <button
            onClick={(e) => {
              if (emailValidator.test(emailValue.trim())) {
                handleSubmission();
              }
            }}
            className="send-instructions-btn"
          >
            Send Instructions
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
