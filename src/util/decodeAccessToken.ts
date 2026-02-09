import {jwtDecode} from "jwt-decode";

export function getAccessToken(): any{
  return localStorage.getItem("accessToken");
}

export function decodeAccessToken() {
  const accessToken = getAccessToken();
  const decodedToken = accessToken ? (jwtDecode(accessToken) as { user_id?: number, username?: string }) : {};
    return decodedToken;
}

export function setAccessToken(token: string) {
  localStorage.setItem("accessToken", token);
}

export function clearAccessToken() {
  localStorage.removeItem("accessToken");
}