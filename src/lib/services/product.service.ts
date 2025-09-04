import { stringify } from "query-string";
import apiClient from "./apiClient.js";

export const getPosts = async (limit: number) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = (await response.json()) as Array<any>;
  return data.filter((x) => x.id <= limit);
};

export const getProduts = async (params: any): Promise<any> => {
  const res = await apiClient.get(`/products?${stringify(params)}`);
  return res.data;
};

export const deleteProduct = async (id: string) => {
  await apiClient.delete(`/products/${id}`);
  return true;
};
