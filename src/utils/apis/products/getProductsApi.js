import apiClient from "../../../constants/axios-interceptor";

export const getProductsApi = async (offset = null, limit = null) => {
  try {
    return await apiClient.get(
      `/products?${
        offset != null && limit != null && `offset=${offset}&limit=${limit}`
      }`
    );
  } catch (error) {
    return error;
  }
};

export default getProductsApi;
