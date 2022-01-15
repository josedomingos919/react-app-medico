import { api } from "./../api";

export function create(data = {}) {
  try {
    return api()
      .post("exame/waiting/create", data)
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("error=> ", error);
    return error;
  }
}

export function enable(data = {}) {
  try {
    return api()
      .post("exame/waiting/enable", data)
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("error=> ", error);
    return error;
  }
}

export function refuse(data = {}) {
  try {
    return api()
      .post("exame/waiting/refuse", data)
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("error=> ", error);
    return error;
  }
}

export function get() {
  try {
    return api()
      .get("exame/waiting")
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("error=> ", error);
    return error;
  }
}

export function getOne(id = 0) {
  try {
    return api()
      .get(`exame/waiting/${id}/info`)
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("error=> ", error);
    return error;
  }
}

export function getDoctors() {
  try {
    return api()
      .get("exame/waiting/doctor/list")
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("error=> ", error);
    return error;
  }
}

export function getTeam() {
  try {
    return api()
      .get("exame/waiting/equipe/list")
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("error=> ", error);
    return error;
  }
}
