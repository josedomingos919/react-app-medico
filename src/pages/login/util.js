import { isEmail, isEmpty } from "../../utilities/functions";

export const initialFormData = { email: "", password: "" };

export const isValidForm = ({ email, password }) => {
  let status = true;
  let response = { ...initialFormData };

  if (!isEmail(email)) {
    status = false;
    response.email = "O email é inválido!";
  }

  if (isEmpty(password)) {
    status = false;
    response.password = "Password não pode ser nula!";
  }

  return {
    status,
    response,
  };
};
