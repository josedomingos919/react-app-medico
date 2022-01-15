export const isEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const isEmpty = (val) => {
  if (!val) return true;

  if (
    typeof val === "function" ||
    typeof val === "number" ||
    typeof val === "boolean" ||
    Object.prototype.toString.call(val) === "[object Date]"
  )
    return false;

  if (val === null || val.length === 0) return true;

  if (typeof val === "object") {
    var r = true;

    for (var f in val) r = false;

    return r;
  }
};

export const formatDate = (stringDate = "") =>
  new Date(stringDate).toLocaleString();
