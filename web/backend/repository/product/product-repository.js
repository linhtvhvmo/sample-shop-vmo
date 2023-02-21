import { emptyOrRows, executeQuery } from '../common-repository.js';

export const getProduct = async () => {
  const rows = await executeQuery('SELECT * from product ');
  const data = emptyOrRows(rows);
  return data;
};

export const getProductWithAttribute = async (field, value) => {
  const rows = await executeQuery(
    `SELECT * from product WHERE ${field}=${value}`,
  );
  const data = emptyOrRows(rows);
  return data;
};

export const updateProductWithId = async (body, id) => {
  const rows = await executeQuery(
    `UPDATE product SET title='${body.title}', bodyHtml='${
      body.bodyHtml
    }', vendor='${body.vendor}', productType='${body.productType}', published=${
      body.published ? 1 : 0
    } WHERE id=${id}`,
  );
  const data = emptyOrRows(rows);
  return data;
};

export const createProductRepo = async (body) => {
  const rows = await executeQuery(
    `INSERT INTO product (title,bodyHtml,vendor,productType,published) VALUES ('${
      body.title
    }','${body.bodyHtml}','${body.vendor}','${body.productType}',${
      body.published ? 1 : 0
    })`,
  );
  const data = emptyOrRows(rows);
  return data;
};
