import { emptyOrRows, executeQuery } from '../common-repository.js';

export const getProduct = async () => {
  const rows = await executeQuery('SELECT * from product ');
  const data = emptyOrRows(rows);
  return data;
};
