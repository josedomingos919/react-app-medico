const saveSession = (data) => {
  localStorage.setItem("user_session", JSON.stringify(data));
};

const getSession = () => {
  try {
    return JSON.parse(localStorage.getItem("user_session") || "{}");
  } catch {
    return {};
  }
};

const clearSession = () => localStorage.removeItem("user_session");

export const session = {
  get: getSession,
  save: saveSession,
  clear: clearSession,
};
