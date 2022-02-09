import axios from "axios";

import { session } from "../../context/auth/util";
import { baseURL } from "./util";

export const api = (props = {}) => {
  const { headers = {} } = props;

  const token = session?.get()?.token ?? "";

  if (token) headers.Authorization = `Bearer ${token}`;

  const instance = axios.create({
    baseURL,
    timeout: 9000,
    headers,
  });

  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      console.log("err?.response?.data=> ", err);
      if (
        err?.response?.data?.error === 403 ||
        err?.response?.status === 403 ||
        !err.status ||
        (typeof err === "object" && err.message === "Network Error")
      ) {
        session.clear();
        window.location.reload();
      }
      return err;
    }
  );

  return instance;
};
