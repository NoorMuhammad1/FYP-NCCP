import { ErrorOutlineSharp } from "@material-ui/icons";

const emailValidator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

const PersonalInformationValidator = (value) => {
  let errors = {};
  if (!value.firstname.trim()) {
    errors.firstname = "First name cannot be empty";
  }
  if (!value.lastname.trim()) {
    errors.lastname = "Last name cannot be empty";
  }
  if (!value.contactNumber.trim()) {
    errors.contactNumber = "Contact Number cannot be empty";
  }
  if (!value.email.trim()) {
    errors.email = "Email cannot be empty";
  } else if (!emailValidator.test(value.email.trim())) {
    errors.email = "must be of form: name@gmail.com";
  }

  return errors;
};

export default PersonalInformationValidator;
