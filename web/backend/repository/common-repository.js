import mysql from 'mysql2/promise';

const config = {
  host: process.env.DB_HOST || '',
  user: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE_NAME || '',
  ssl: {},
};

const getOffset = (currentPage = 1, listPerPage) => {
  return (currentPage - 1) * [listPerPage];
};

const emptyOrRows = (rows) => {
  if (!rows) {
    return [];
  }
  return rows;
};

const executeQuery = async (sql, params) => {
  const connection = await mysql.createConnection(config);
  const [results] = await connection.execute(sql, params);

  return results;
};

export { getOffset, emptyOrRows, executeQuery };
