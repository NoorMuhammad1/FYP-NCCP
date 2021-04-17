const emailValidator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
const userSettingsValidator = (value) => {
  let errors = {};

  if (!isNaN(value.firstname.trim())) {
    errors.firstname = "Firstname can only contian characters";
  }
  if (!value.firstname.trim()) {
    errors.firstname = "Firstname cannot be empty";
  }
  if (!isNaN(value.lastname.trim())) {
    errors.lastname = "Lastname can only contian characters";
  }
  if (!value.lastname.trim()) {
    errors.lastname = "Lastname cannot be empty";
  }
  if (!value.email.trim()) {
    errors.email = "Email cannot be empty";
  } else if (!emailValidator.test(value.email.trim())) {
    errors.email = "must be of form: name@gmail.com";
  }
  if (!value.contactNumber.trim()) {
    errors.contactNumber = "Contact number cannot be empty";
  }

  return errors;
};

export default userSettingsValidator;
