import { stringify } from "query-string";
import apiClient from "./apiClient.js";
import type { UserType } from "$lib/types/user.type.js";

export const getUsers = async (params: any): Promise<any> => {
  const res = await apiClient.get(`/users?${stringify(params)}`);
  return res.data;
};

export const getUser = async (id: string): Promise<any> => {
  const res = await apiClient.get(`/users/${id}`);
  return res.data;
};

export const createUser = async (body: UserType): Promise<any> => {
  const res = await apiClient.post(`/users`, { ...body });
  return res.data;
};

export const updateUser = async (body: UserType): Promise<any> => {
  const res = await apiClient.put(`/users/${body.id}`, { ...body });
  return res.data;
};

export const deleteUser = async (id: string) => {
  await apiClient.delete(`/users/${id}`);
  return true;
};
