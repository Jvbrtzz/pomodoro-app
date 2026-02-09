import {jwtDecode} from "jwt-decode";
import { User, UserInfo } from "../interfaces/user";

export function getAccessToken(): any{
  return localStorage.getItem("accessToken");
}

export function decodeAccessToken(): UserInfo | null {
  const accessToken = getAccessToken();
  const decodedToken = accessToken ? (jwtDecode(accessToken) as UserInfo): null;
    return decodedToken;
}

export function setAccessToken(token: string) {
  window.dispatchEvent(new Event("auth-change"))
  localStorage.setItem("accessToken", token);
}

export function clearAccessToken() {
  window.dispatchEvent(new Event("auth-change"))
  localStorage.removeItem("accessToken");
}