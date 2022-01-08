import { session } from "../context/auth/util";

export const api = ({ headers: {} }) =>
  axios.create({
    baseURL: "http://caiu.com.br/appmedico/",
    timeout: 1000,
    headers: {
      Authorization: "Bearer " + session?.get()?.token || "",
      ...headers,
    },
  });
