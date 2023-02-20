export const errorFunction = (err) => {
  console.error(err);
  return { ...sampleData, status: 500, error: err.message };
};

export const sampleData = {
  data: null,
  error: null,
  status: 200,
};
