import { stringify } from "query-string";
import apiClient from "./apiClient.js";
import type { ProductType } from "$lib/types/product.type.js";

export const getProducts = async (params: any): Promise<any> => {
  const res = await apiClient.get(`/products?${stringify(params)}`);
  return res.data;
};

export const getProduct = async (id: string): Promise<any> => {
  const res = await apiClient.get(`/products/${id}`);
  return res.data;
};

export const createProduct = async (body: ProductType): Promise<any> => {
  const res = await apiClient.post(`/products`, { ...body });
  return res.data;
};

export const updateProduct = async (body: ProductType): Promise<any> => {
  const res = await apiClient.put(`/products/${body.id}`, { ...body });
  return res.data;
};

export const deleteProduct = async (id: string) => {
  await apiClient.delete(`/products/${id}`);
  return true;
};
