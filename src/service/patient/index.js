import { api } from "./../api";

export function add(data = {}) {
  try {
    return api()
      .post("dashboard/patient/add", data)
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("error=> ", error);
    return error;
  }
}

export function update(data = {}) {
  try {
    return api()
      .post("dashboard/patient/update", data)
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("error=> ", error);
    return error;
  }
}

export function destroy(data = {}) {
  try {
    return api()
      .post("dashboard/patient/delete", data)
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("error=> ", error);
    return error;
  }
}

export function get() {
  try {
    return api()
      .get("dashboard/patient")
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("error=> ", error);
    return error;
  }
}

export function getOne(id = 0) {
  try {
    return api()
      .get(`dashboard/patient/${id}/info`)
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("error=> ", error);
    return error;
  }
}
