const emailValidator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const paswordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

const passwordValidator = (value) => {
  let errors = {};

  if (!value.password.trim()) {
    errors.password = "Password cannot be empty";
  } else if (!paswordValidator.test(value.password.trim())) {
    errors.password =
      "Password should be atleast 6 characters long and have atleast one capital letter in it.";
  }
  if (!value.confirmPassword.trim()) {
    errors.confirmPassword = "Confirm Password cannot be empty";
  } else if (!(value.password === value.confirmPassword)) {
    errors.confirmPassword = "Password don't match";
  }
  return errors;
};

export default passwordValidator;
