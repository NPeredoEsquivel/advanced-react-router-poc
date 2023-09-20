import { redirect } from "react-router-dom";

export const getAuthToken = () => {
  const token = localStorage.getItem("token");
  const tokenDuration = getTokenDuration();

  if (!token) return null;

  if (tokenDuration < 0) {
    return "EXPIRED_TOKEN";
  }

  return token;
};

export const setAuthToken = (token) => {
  localStorage.setItem("token", token);
};

export const tokenLoader = () => {
  return getAuthToken();
};

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth");
  }

  return null;
}

export const setExpirationDate = () => {
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 1);
  localStorage.setItem("expirationDate", expirationDate.toISOString());
};

export const getTokenDuration = () => {
  const expirationDate = new Date(localStorage.getItem("expirationDate"));
  const now = new Date();

  const duration = expirationDate.getTime() - now.getTime();

  return duration;
};
