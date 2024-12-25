export const setUserDetails = (userDetails: any) => {
  sessionStorage.setItem("user", JSON.stringify(userDetails));
};

export const setToken = (token: string, refresh_token: string) => {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("refresh_token", refresh_token);
};

export const setSessionStorage = (response: any) => {
  sessionStorage.setItem("token", response.refreshToken);
  sessionStorage.setItem("refresh_token", response.token);
  sessionStorage.setItem("user", JSON.stringify(response.user));
};

export const clearSession = () => {
  sessionStorage.clear();
};

export const getUserDetails = () => {
  const userDetailsString = sessionStorage.getItem("user");
  const userDetails: any = userDetailsString
    ? JSON.parse(userDetailsString)
    : null;
  if (userDetails) {
    return userDetails;
  } else {
    return null;
  }
};

export const getToken = () => {
  const token = sessionStorage.getItem("token");

  return token || "";
};

export const isEmailValid = (email: string) => {
  const emailregex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!emailregex.test(email)) {
    return false;
  }
  return true;
};

export const isMobileValid = (mobile: string) => {
  const pattern = new RegExp(/^\d{1,10}$/);
  if (mobile.length !== 10 || !pattern.test(mobile)) {
    return false;
  }
  return true;
};

export const getAuthToken = () => {
  const token = sessionStorage.getItem("token");
  return token ? "Bearer " + token : "";
};
