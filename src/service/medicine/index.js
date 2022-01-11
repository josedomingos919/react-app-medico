import { api } from "./../api";

export function add(data = {}) {
  try {
    return api()
      .post("dashboard/medicine/add", data)
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("error=> ", error);
    return error;
  }
}

export function update(data = {}) {
  try {
    return api()
      .post("dashboard/medicine/update", data)
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("error=> ", error);
    return error;
  }
}

export function destroy(data = {}) {
  try {
    return api()
      .post("dashboard/medicine/delete", data)
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("error=> ", error);
    return error;
  }
}

export function get() {
  try {
    return api()
      .get("dashboard/medicine")
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("error=> ", error);
    return error;
  }
}

export function getOne(id = 0) {
  try {
    return api()
      .get(`dashboard/medicine/${id}/info`)
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("error=> ", error);
    return error;
  }
}
