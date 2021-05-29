const emailValidator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
const SignInValidator = (value) => {
  let errors = {};
  if (!value.email.trim()) {
    errors.email = 'Email cannot be empty';
  }
  else if (!emailValidator.test(value.email.trim())) {
    errors.email = 'must be of form: name@gmail.com';
  }
  if (!value.password.trim()) {
    errors.password = 'Password cannot be empty';
  }
  else if (!passwordValidator.test(value.password.trim())) {
    errors.password =
      'Password should be atleast 6 characters long and have atleast one capital letter in it.';
  }
  return errors;
};

export default SignInValidator;
