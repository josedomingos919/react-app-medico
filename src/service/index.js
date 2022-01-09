import { api } from "./api";

export const loginRequest = async (data = {}) => {
  try {
    return api()
      .post("auth/login", data)
      .catch((error) => {
        console.log(error?.response?.data?.error);
      });
  } catch (error) {
    console.log("error=> ", error);
    return error;
  }
};
