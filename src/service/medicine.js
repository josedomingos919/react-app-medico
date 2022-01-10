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

export function get() {
  try {
    return api()
      .get("dashboard/medicine")
      .catch((error) => console.log(error?.response?.data?.error));
  } catch (error) {
    console.log("error=> ", error);
    return error;
  }
}
