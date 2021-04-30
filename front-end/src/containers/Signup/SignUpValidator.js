const emailValidator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
const SignUpValidator = (value) => {
  let errors = {};
  if (!value.firstname.trim()) {
    errors.firstname = 'Firstname cannot be empty';
  }
  if (!value.lastname.trim()) {
    errors.lastname = 'Lastname cannot be empty';
  }
  if (!value.email.trim()) {
    errors.email = 'Email cannot be empty';
  }
  else if (!emailValidator.test(value.email.trim())) {
    errors.email = 'Email value is incorrect';
  }
  if (!value.username.trim()) {
    errors.username = 'Username cannot be empty';
  }
  if (!value.type.trim()) {
    errors.type = 'One of the type must be selected';
  }
  if (!value.affiliation.trim()) {
    errors.affiliation = 'Affiliation cannot be empty';
  }
  if (!value.description.trim()) {
    errors.description = 'Description cannot be empty';
  }
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

export default SignUpValidator;
