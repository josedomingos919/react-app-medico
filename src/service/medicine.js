import { api } from "./api";

export function add(data = []) {
  try {
    return api()
      .post("dashboard/medicine/add", data)
      .catch((error) => console.log(error?.response?.data?.error));
  } catch (error) {
    console.log("error=> ", error);
    return error;
  }
}
