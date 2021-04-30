import {
  FormControl, FormControlLabel, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Radio,
  RadioGroup, TextField,
}                                                         from '@material-ui/core';
import Backdrop                                           from '@material-ui/core/Backdrop';
import Fade                                               from '@material-ui/core/Fade';
import Modal                                              from '@material-ui/core/Modal';
import CheckCircleIcon                                    from '@material-ui/icons/CheckCircle';
import ErrorIcon                                          from '@material-ui/icons/Error';
import Visibility                                         from '@material-ui/icons/Visibility';
import VisibilityOff                                      from '@material-ui/icons/VisibilityOff';
import React, { useEffect, useRef, useState }             from 'react';
import { Button, FormLabel }                              from 'react-bootstrap';
import ReCAPTCHA                                          from 'react-google-recaptcha';
import { useDispatch, useSelector }                       from 'react-redux';
import { Link, Redirect }                                 from 'react-router-dom';
import { authConstants, login, resetSignUpStore, signup } from '../../actions';
import useSignInForm                                      from './SignInUseForm';
import SignInValidator                                    from './SignInValidator';
import useFormSignUp                                      from './SignUpUseForm';
import SignUpValidator                                    from './SignUpValidator';
import './style.css';

const Signin = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInForm, setSignInForm] = useState(true);
  const [signUpForm, setSignUpForm] = useState(false);
  const auth = useSelector((state) => state.auth);

  const signUpStore = useSelector((state) => state.sign);
  const signInStore = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Modal show code

  const [modalOpen, setModalOpen] = useState(false);
  const [signInModal, setSignInModal] = useState(false);

  const [userType, setUserType] = useState('');

  const selectUserType = (e) => {
    setUserType(e.target.name);
    const signUpSlides = document.getElementById(
      'sign-in-form-slides-inner-div'
    );
    signUpSlides.style.transform = 'translate(-50%)';
  };

  const goBack = () => {
    const signUpSlides = document.getElementById(
      'sign-in-form-slides-inner-div'
    );
    signUpSlides.style.transform = 'translate(0%)';
  };

  // method to reset the sign up  store on modal close

  const reset = () => {
    dispatch(resetSignUpStore());
  };

  //

  useEffect(() => {
    if (signUpStore.error.found || signUpStore.registered) {
      setModalOpen(true);
    }
  }, [signUpStore]);

  useEffect(() => {
    if (signInStore.error.found) {
      setSignInModal(true);
    }
  }, [signInStore]);

  const userLogin = () => {
    // e.preventDefault();
    const { email, password } = signInValue;
    const user = {
      email,
      password,
      token: recaptchaRef.current.getValue(),
    };
    dispatch(login(user));
  };

  // Material Ui React Material
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUpSubmission = () => {
    dispatch(signup(signUpValue));
  };

  const {
          signInValue,
          handleSignInSubmit,
          updateSignInValue,
          signInErrors,
        } = useSignInForm(userLogin, SignInValidator);

  const {
          handleSignUpSubmit,
          signUpValue,
          updateSignUpValue,
          signUpErrors,
        } = useFormSignUp(handleSignUpSubmission, SignUpValidator);

  // Captcha functions

  const recaptchaRef = useRef();

  if (auth.authenticate) {
    if (userType === 'employee') {
      return <Redirect to={'/adminDashboard'} />;
    }
    else {
      return <Redirect to={'/'} />;
    }
  }

  // const sign_in_btn = document.querySelector("#sign-in-btn");
  // const sign_up_btn = document.querySelector("#sign-up-btn");
  // const container = document.querySelector(".container");

  // console.log(container);

  const signInButtonPress = () => {
    setSignInForm(true);
  };

  const signUpButtonPress = () => {
    setSignInForm(false);
  };

  // sign_up_btn.addEventListener("click", () => {
  //   container.classList.add("sign-up-mode");
  // });

  // sign_in_btn.addEventListener("click", () => {
  //   container.classList.remove("sign-up-mode");
  // });

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="signup-response-modal"
        open={modalOpen}
        onClose={(e) => {
          setModalOpen(false);
          reset();
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <div className="signup-repsonse-modal-content-div">
            {signUpStore.registered ? (
              <CheckCircleIcon
                className="signup-response-modal-icon"
                style={{ fontSize: '5.5rem' }}
              />
            ) : null}
            {signUpStore.error.found ? (
              <ErrorIcon
                className="signup-response-modal-icon"
                style={{ fontSize: '5.5rem' }}
              />
            ) : null}
            <h2 id="transition-modal-title">
              {signUpStore.registered ? 'Success' : 'Error'}
            </h2>
            <p id="transition-modal-description">
              {signUpStore.registered
                ? 'The signup request was successful. Check your email for verification'
                : signUpStore.error.message}
            </p>
          </div>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="signup-response-modal"
        open={signInModal}
        onClose={(e) => {
          setSignInModal(false);
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={signInModal}>
          <div className="signup-repsonse-modal-content-div">
            {signInStore.error.found ? (
              <ErrorIcon
                className="signup-response-modal-icon"
                style={{ fontSize: '5.5rem' }}
              />
            ) : null}
            <h2 id="transition-modal-title">
              {signInStore.error.found ? 'Error' : null}
            </h2>
            <p id="transition-modal-description">
              {signInStore.error.found ? signInStore.error.message : null}
            </p>
          </div>
        </Fade>
      </Modal>
      <div class={`container-div ${signInForm ? '' : 'sign-up-mode'}`}>
        <div class="forms-container">
          <div class="signin-signup">
            <form action="#" className="sign-in-form">
              <div className="sign-in-form-slides-outer-div">
                <div
                  className="sign-in-form-slides-inner-div"
                  id="sign-in-form-slides-inner-div"
                >
                  <div className="sign-in-type">
                    <h3>What type of user are you?</h3>
                    <Button name="user" onClick={(e) => selectUserType(e)}>
                      General User
                    </Button>
                    <Button name="employee" onClick={(e) => selectUserType(e)}>
                      Employee
                    </Button>
                  </div>
                  <div>
                    <h2 className="title">Sign In</h2>
                    <TextField
                      error={signInErrors.email ? true : undefined}
                      label="Email"
                      name="email"
                      placeholder="e.g. name@gmail.com"
                      value={signInValue.email}
                      onChange={(e) => updateSignInValue(e)}
                      helperText={signInErrors.email ? signInErrors.email : ''}
                      variant="outlined"
                      autoComplete="off"
                      style={{ width: '70%', margin: '1rem 0 0.5rem 0' }}
                    />
                    <FormControl
                      // className={clsx(classes.margin, classes.textField)}
                      variant="outlined"
                      style={{ width: '70%', margin: '1rem 0 0.5rem 0' }}
                      error={signInErrors.password ? true : undefined}
                      // helperText={signInErrors.password ? signInErrors.password : ""}
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        name="password"
                        placeholder="Min 6 letters & a capital letter"
                        type={showPassword ? 'text' : 'password'}
                        value={signInValue.password}
                        onChange={(e) => updateSignInValue(e)}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={(e) => setShowPassword(!showPassword)}
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
                        {signInErrors.password ? signInErrors.password : ''}
                      </FormHelperText>
                    </FormControl>
                    <Link to="/forgetPassword" className="forget-password-link">
                      Forgot your password?
                    </Link>
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={authConstants.ReCAPTCHA_KEY}
                    />

                    <Button
                      type="submit"
                      className="sign-in-btn"
                      onClick={(e) => handleSignInSubmit(e)}
                    >
                      sign in
                    </Button>
                  </div>
                </div>
              </div>
            </form>
            <form class="sign-up-form">
              <h2 className="title">Sign Up</h2>
              <div className="sign-up-form-content">
                <TextField
                  label="First Name"
                  name="firstname"
                  placeholder="Only characters are allowed"
                  variant="outlined"
                  className="input"
                  value={signUpValue.firstname}
                  onChange={(e) => updateSignUpValue(e)}
                  error={signUpErrors.firstname}
                  helperText={signUpErrors.firstname}
                  required
                />
                <TextField
                  label="Last Name"
                  name="lastname"
                  placeholder="Only characters are allowed"
                  variant="outlined"
                  className="input"
                  value={signUpValue.lastname}
                  onChange={(e) => updateSignUpValue(e)}
                  error={signUpErrors.lastname}
                  helperText={signUpErrors.lastname}
                  required
                />
                <TextField
                  label="Email"
                  name="email"
                  placeholder="e.g. name@gmail.com"
                  variant="outlined"
                  className="input"
                  value={signUpValue.email}
                  onChange={(e) => updateSignUpValue(e)}
                  error={signUpErrors.email}
                  helperText={signUpErrors.email}
                  required
                />
                <TextField
                  label="Affiliation"
                  name="affiliation"
                  placeholder="Institute affiliated to"
                  variant="outlined"
                  className="input"
                  value={signUpValue.affiliation}
                  onChange={(e) => updateSignUpValue(e)}
                  error={signUpErrors.affiliation}
                  helperText={signUpErrors.affiliation}
                  required
                />
                <FormControl
                  component="fieldset"
                  error={signUpErrors.type}
                  className="user-type-radio-group"
                >
                  <FormLabel component="legend">
                    What type of user are you?
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-label="user-type"
                    name="type"
                    value={signUpValue.type}
                    onChange={(e) => updateSignUpValue(e)}
                  >
                    <FormControlLabel
                      value="Student"
                      control={<Radio color="default" />}
                      label="Student"
                    />
                    <FormControlLabel
                      value="ResearchInstitute"
                      control={<Radio color="default" />}
                      label="Research Institute"
                    />
                    <FormControlLabel
                      value="Industry"
                      control={<Radio color="default" />}
                      label="Industry"
                    />
                  </RadioGroup>
                  <FormHelperText>
                    {signUpErrors.type ? signUpErrors.type : ''}
                  </FormHelperText>
                </FormControl>
                {/* 
                <TextField
                  label="Description"
                  name="description"
                  placeholder="Only characters are allowed"
                  variant="outlined"
                  className="input"
                  value={signUpValue.description}
                  onChange={(e) => updateSignUpValue(e)}
                  error={signUpErrors.description}
                  helperText={signUpErrors.description}
                  multiline
                  rows={4}
                /> */}

                <FormControl
                  variant="outlined"
                  // style={{ width: "40%", margin: "1rem 0 0.5rem 0" }}
                  className="input password-input"
                  error={signUpErrors.password ? true : undefined}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password *
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    name="password"
                    placeholder="Min 6 letters & a capital letter"
                    type={showPassword ? 'text' : 'password'}
                    value={signUpValue.password}
                    // className="input"
                    onChange={(e) => updateSignUpValue(e)}
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
                    {signUpErrors.password ? signUpErrors.password : ''}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  variant="outlined"
                  // style={{ width: "40%", margin: "1rem 0 0.5rem 0" }}
                  error={signUpErrors.confirm_password ? true : undefined}
                  className="input"
                  required
                >
                  <InputLabel htmlFor="outlined-adornment-confirm-password">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-confirm-password"
                    name="confirm_password"
                    placeholder="Min 6 letters & a capital letter"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={signUpValue.confirme_password}
                    onChange={(e) => updateSignUpValue(e)}
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
                    {signUpErrors.confirm_password
                      ? signUpErrors.confirm_password
                      : ''}
                  </FormHelperText>
                </FormControl>
                <Link className="forget-password-link">
                  Already a user Sign In
                </Link>
                <Button
                  type="submit"
                  className="sign-up-btn"
                  onClick={(e) => handleSignUpSubmit(e)}
                >
                  sign up
                </Button>
                {/* <TextField
                  error={signUpErrors.email ? true : undefined}
                  // id="outlined-error-helper-text"
                  label="Email"
                  name="email"
                  placeholder="e.g. name@gmail.com"
                  value={value.email}
                  onChange={(e) => updateValue(e)}
                  helperText={errors.email ? errors.email : ""}
                  variant="outlined"
                  style={{ width: "70%", margin: "1rem 0 0.5rem 0" }}
                />
                <TextField
                  error={errors.email ? true : undefined}
                  // id="outlined-error-helper-text"
                  label="Email"
                  name="email"
                  placeholder="e.g. name@gmail.com"
                  value={value.email}
                  onChange={(e) => updateValue(e)}
                  helperText={errors.email ? errors.email : ""}
                  variant="outlined"
                  style={{ width: "70%", margin: "1rem 0 0.5rem 0" }}
                />
                <TextField
                  error={errors.email ? true : undefined}
                  // id="outlined-error-helper-text"
                  label="Email"
                  name="email"
                  placeholder="e.g. name@gmail.com"
                  value={value.email}
                  onChange={(e) => updateValue(e)}
                  helperText={errors.email ? errors.email : ""}
                  variant="outlined"
                  style={{ width: "70%", margin: "1rem 0 0.5rem 0" }}
                /> */}
              </div>
            </form>
            {/* <form action="#" class="sign-in-form">
              <h2 class="title">Sign in</h2>
              <div class="input-field">
                <i class="fas fa-user"></i>
                <input type="text" placeholder="Username" />
              </div>
              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input type="password" placeholder="Password" />
              </div>
              <input type="submit" value="Login" class="btn solid" /> */}
            {/* <p class="social-text">Or Sign in with social platforms</p>
              <div class="social-media">
                <a href="#" class="social-icon">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="fab fa-google"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div> */}
            {/* </form> */}
            {/* <form action="#" class="sign-up-form">
              <h2 class="title">Sign up</h2>
              <div class="input-field">
                <i class="fas fa-user"></i>
                <input type="text" placeholder="Username" />
              </div>
              <div class="input-field">
                <i class="fas fa-envelope"></i>
                <input type="email" placeholder="Email" />
              </div>
              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input type="password" placeholder="Password" />
              </div>
              <input type="submit" class="btn" value="Sign up" /> */}
            {/* <p class="social-text">Or Sign up with social platforms</p>
              <div class="social-media">
                <a href="#" class="social-icon">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="fab fa-google"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div> */}
            {/* </form> */}
          </div>
        </div>
        <div class="panels-container">
          <div class="panel left-panel">
            <div class="content">
              <h3>New here ?</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Debitis, ex ratione. Aliquid!
              </p>
              <button
                class="btn transparent"
                id="sign-up-btn"
                onClick={signUpButtonPress}
              >
                Sign up
              </button>
            </div>
            {/* <img src="img/log.svg" class="image" alt="" /> */}
          </div>
          <div class="panel right-panel">
            <div class="content">
              <h3>One of us ?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                laboriosam ad deleniti.
              </p>
              <button
                class="btn transparent"
                id="sign-in-btn"
                onClick={signInButtonPress}
              >
                Sign in
              </button>
            </div>
            {/* <img src="img/register.svg" class="image" alt="" /> */}
          </div>
        </div>
      </div>
      {/* <Layout>
        <Container>
          <Row style={{ marginTop: "2rem" }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={userLogin}>
                <Input
                  id="email_username"
                  label="Email/Username"
                  type="email"
                  value={email}
                  placeholder="Email/Username"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  id="basicPassword"
                  label="Password"
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Layout> */}
    </>
  );
};

export default Signin;
