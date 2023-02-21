import { getImageByProductId } from '../../repository/product-image/product-image-repository.js';
import {
  createProductRepo,
  getProduct,
  getProductWithAttribute,
  updateProductWithId,
} from '../../repository/product/product-repository.js';
import { errorFunction, sampleData } from '../common-service.js';

export const getProductService = async () => {
  try {
    const data = await getProduct();
    const result = await Promise.all(
      data.map(async (item) => {
        const itemImage = await getImageByProductId(item.id);
        return {
          ...item,
          published: item.published === 1,
          image: itemImage.map((thisImage) => thisImage.image),
        };
      }),
    );
    return { ...sampleData, data: result };
  } catch (error) {
    return errorFunction(error);
  }
};

export const getOneProduct = async (field, value) => {
  try {
    const data = await getProductWithAttribute(field, value);
    const result = await Promise.all(
      data.map(async (item) => {
        const itemImage = await getImageByProductId(item.id);
        return {
          ...item,
          published: item.published === 1,
          image: itemImage.map((thisImage) => thisImage.image),
        };
      }),
    );
    return { ...sampleData, data: result };
  } catch (error) {
    return errorFunction(error);
  }
};

export const updateProductById = async (body, id) => {
  const find = await getOneProduct('id', id);
  if (find.data.length === 0) {
    return { ...sampleData, status: 404, error: 'Not found product' };
  }
  try {
    await updateProductWithId(body, id);
    return { ...sampleData };
  } catch (error) {
    return errorFunction(error);
  }
};

export const createProduct = async (body) => {
  try {
    await createProductRepo(body);
    return { ...sampleData };
  } catch (error) {
    return errorFunction(error);
  }
};
