import axios from "axios";
import Cookies from "js-cookie";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const VeridoAPI = axios.create({
  baseURL: BASE_URL,
});

VeridoAPI.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

VeridoAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors
    if (!error.response) {
      window.alert(
        "Network Error\nPlease check your internet connection and try again."
      );
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      !String(error.response.config.url).includes("/signin")
    ) {
      Cookies.remove("access_token");
      Cookies.remove("user_role");
      window.location.href = "/signin";
      return Promise.reject(error);
    }

    if (error.response.status >= 500) {
      window.alert(
        "Server Error\n" +
          "Something went wrong on our end. Please try again later."
      );
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
