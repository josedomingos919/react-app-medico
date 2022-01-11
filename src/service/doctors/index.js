import { api } from "./../api";

export function add(data = {}) {
  try {
    return api()
      .post("dashboard/doctors/add", data)
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("error=> ", error);
    return error;
  }
}

export function update(data = {}) {
  try {
    return api()
      .post("dashboard/doctors/update", data)
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("error=> ", error);
    return error;
  }
}

export function disable(data = {}) {
  try {
    return api()
      .post("dashboard/doctors/disable", data)
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("error=> ", error);
    return error;
  }
}

export function get() {
  try {
    return api()
      .get("dashboard/doctors")
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("error=> ", error);
    return error;
  }
}

export function getOne(id = 0) {
  try {
    return api()
      .get(`dashboard/doctors/${id}/info`)
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("error=> ", error);
    return error;
  }
}
