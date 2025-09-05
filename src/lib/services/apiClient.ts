import { token, user } from "$lib/stores/auth.js";
import axios, { AxiosError, type AxiosResponse } from "axios";
import { get } from "svelte/store";

const sharedToken = localStorage.getItem("token");

const API_URL = "http://localhost:4000/api";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    // ...(sharedToken ? { Authorization: `Bearer ${sharedToken}` } : {}),
  },
});

apiClient.interceptors.request.use((config) => {
  const currentToken = get(token);
  // console.log("currentToken", currentToken);
  if (currentToken) {
    config.headers.Authorization = `Bearer ${currentToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response: AxiosResponse<any, any>) => response,
  (error: AxiosError) => {
    console.error("API Error:", error.response?.data || error.message);
    if (error?.response?.status === 403) {
      user.set(null);
      token.set(null);
      setTimeout(() => {
        window.location.href = "/login";
      }, 10);
    }
    throw error;
    // return Promise.reject(error);
  }
);

export default apiClient;
