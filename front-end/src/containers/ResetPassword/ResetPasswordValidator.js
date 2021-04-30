const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
const ResetPasswordValidator = (value) => {
  let errors = {};

  if (!value.password.trim()) {
    errors.password = 'Password cannot be empty';
  }
  else if (!passwordValidator.test(value.password.trim())) {
    errors.password =
      'Password should be atleast 6 characters long and have atleast one capital letter in it.';
  }
  if (!value.confirm_password.trim()) {
    errors.confirm_password = 'Confirm Password cannot be empty';
  }
  else if (!(value.password === value.confirm_password)) {
    errors.confirm_password = 'Password don\'t match';
  }
  return errors;
};

export default ResetPasswordValidator;
