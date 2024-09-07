import apiClient from "../../../constants/axios-interceptor";

export const getCategoryByIdApi = async (id) => {
  try {
    return await apiClient.get(`/categories/${id}`);
  } catch (error) {
    return error;
  }
};

export default getCategoryByIdApi;
