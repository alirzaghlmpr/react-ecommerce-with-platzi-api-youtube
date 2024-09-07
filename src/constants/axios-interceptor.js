import axios from "axios";
import { getCookie, setCookie } from "../utils/helpers/cookie";
import refreshTokenApi from "../utils/apis/auth/refreshTokenApi";

const getAccessToken = async () => {
  const cookie = await getCookie("credential");
  return cookie?.access_token;
};

const getRefreshToken = async () => {
  const cookie = await getCookie("credential");
  return cookie?.refresh_token;
};

export const apiClient = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1",
});

apiClient.interceptors.request.use(
  async (config) => {
    const access_token = await getAccessToken();
    if (access_token) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = await getRefreshToken();
        const response = await refreshTokenApi({ refreshToken: refreshToken });

        const newAccessToken = response?.data?.access_token;
        const newRefreshToken = response?.data?.refresh_token;

        const lastCookie = await getCookie("credential");
        const newCookie = {
          ...lastCookie,
          access_token: newAccessToken,
          refresh_token: newRefreshToken,
        };

        console.log("new credential is \n:", newCookie);
        await setCookie("credential", newCookie);

        apiClient.defaults.headers[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return apiClient(originalRequest);
      } catch (error) {
        console.log("failed to submit new refresh token!");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
