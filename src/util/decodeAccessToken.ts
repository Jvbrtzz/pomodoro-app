import {jwtDecode} from "jwt-decode";

export function decodeAccessToken() {
  const accessToken = localStorage.getItem("accessToken");
  const decodedToken = accessToken ? (jwtDecode(accessToken) as { user_id?: number }) : {};
    return decodedToken;
}

export function setAccessToken(token: string) {
  localStorage.setItem("accessToken", token);
}

export function clearAccessToken() {
  localStorage.removeItem("accessToken");
}