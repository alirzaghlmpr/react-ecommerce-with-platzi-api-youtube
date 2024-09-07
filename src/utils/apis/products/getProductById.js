import apiClient from "../../../constants/axios-interceptor";

export const getProductById = async (id) => {
  try {
    return await apiClient.get(`/products/${id}`);
  } catch (error) {
    return error;
  }
};

export default getProductById;
