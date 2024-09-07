import apiClient from "../../../constants/axios-interceptor";

export const refreshTokenApi = async (data) => {
  try {
    return await apiClient.post("/auth/refresh-token", data);
  } catch (error) {
    return error;
  }
};

export default refreshTokenApi;
