import { stringify } from "query-string";
import apiClient from "./apiClient.js";
import type { UserType } from "$lib/types/user.type.js";

export const getMe = async (): Promise<any> => {
  const res = await apiClient.get(`/auth/me`);
  return res.data;
};

export const login = async (body: any): Promise<any> => {
  const res = await apiClient.post(`/auth/login`, { ...body });
  return res.data;
};

export const register = async (body: UserType): Promise<any> => {
  const res = await apiClient.post(`/auth/register`, { ...body });
  return res.data;
};
