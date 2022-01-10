import { api } from "./api";

import * as medicine from "./medicine";

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

export const services = { medicine };
