import { getImageByProductId } from '../../repository/product-image/product-image-repository.js';
import { getProduct } from '../../repository/product/product-repository.js';

export const getProductService = async () => {
  const data = await getProduct();
  return Promise.all(
    data.map(async (item) => {
      const itemImage = await getImageByProductId(item.id);
      return {
        ...item,
        published: item.published === 1,
        image: itemImage.map((thisImage) => thisImage.image),
      };
    }),
  );
};
