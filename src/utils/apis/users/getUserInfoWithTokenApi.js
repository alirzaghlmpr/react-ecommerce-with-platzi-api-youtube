import apiClient from "../../../constants/axios-interceptor";

export const getUserInfoWithTokenApi = async () => {
  try {
    return await apiClient.get("/auth/profile");
  } catch (error) {
    return error;
  }
};

export default getUserInfoWithTokenApi;
