import * as yup from "yup";
export const editUserValidationSchema = yup.object({
  firstname: yup
    .string()
    .required("Firstname cannot be empty")
    .min(3, "Firstname cannot be less than 3 characters"),
  lastname: yup
    .string()
    .required("Lastname cannot be empty")
    .min(3, "Lastname cannot be less than 3 characters"),
  email: yup
    .string()
    .email()
    .required("email cannot be empty")
    .min(3, "email cannot be less than 3 characters"),
  role: yup.string(),
});
