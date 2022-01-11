import { api } from "../api";

export const login = async (data = {}) => {
  try {
    return api()
      .post("auth/login", data)
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("error=> ", error);
    return error;
  }
};

export const getUserInfo = async (token = "") => {
  try {
    return api()
      .get(`auth/${token}`)
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("error=> ", error);
    return error;
  }
};
