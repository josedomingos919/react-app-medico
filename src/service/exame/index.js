import { api } from "./../api";

export function add(data = {}) {
  try {
    return api()
      .post("exame", data)
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("error=> ", error);
    return error;
  }
}

export function upload(data = {}) {
  try {
    return api()
      .post("exame/upload", data)
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("error=> ", error);
    return error;
  }
}

export function schedule(data = {}) {
  try {
    return api()
      .post("exame/schedule", data)
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("error=> ", error);
    return error;
  }
}

export function get() {
  try {
    return api()
      .get("exame/list")
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("error=> ", error);
    return error;
  }
}

export function getUploadDocumentType() {
  try {
    return api()
      .get(`exame/upload/document-type`)
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("error=> ", error);
    return error;
  }
}
