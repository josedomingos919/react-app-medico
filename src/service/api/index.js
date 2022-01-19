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

  return instance;
};
