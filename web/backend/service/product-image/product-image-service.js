import { getProductImage } from '../../repository/product-image/product-image-repository.js';

export const getProductImageService = async () => {
  return await getProductImage();
};
