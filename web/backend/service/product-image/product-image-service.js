import { getProductImage } from '../../repository/product-image/product-image-repository.js';
import { sampleData } from '../common-service.js';

export const getProductImageService = async () => {
  try {
    const data = await getProductImage();
    return { ...sampleData, data };
  } catch (error) {
    return errorFunction(error);
  }
};
