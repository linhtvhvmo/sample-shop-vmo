import { emptyOrRows, executeQuery } from '../common-repository.js';

export const getProductImage = async () => {
  const rows = await executeQuery('SELECT * from product_image');
  const data = emptyOrRows(rows);
  return data;
};

export const getImageByProductId = async (id) => {
  const rows = await executeQuery(
    `SELECT image from product_image WHERE productId=${id}`,
  );
  const data = emptyOrRows(rows);
  return data;
};
