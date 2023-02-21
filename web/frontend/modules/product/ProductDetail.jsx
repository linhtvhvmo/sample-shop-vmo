import { Modal } from '@shopify/polaris';
import { useCallback, useEffect, useState } from 'react';
import { useAppQuery, useAuthenticatedFetch } from '../../hooks';
import { ProductForm } from './ProductForm';

export const ProductDetail = ({ id, setActive, active, setToastProps }) => {
  const handleChange = useCallback(() => setActive(!active), [active]);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const fetch = useAuthenticatedFetch();

  const {
    data: product,
    refetch: refresh,
    isLoading: isLoading,
    isRefetching: isRefetching,
  } = useAppQuery({
    url: `/api/products/get-product?field=id&value=${id}`,
    reactQueryOptions: {
      onSuccess: () => {
        setToastProps({ content: 'Get product successfully!' });
      },
      onError: () => {
        setToastProps({
          content: 'There was an error get this product',
          error: true,
        });
      },
    },
  });

  const handleUpdateProduct = async () => {
    setLoading(true);
    try {
      await fetch(`/api/products/update?id=${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      setToastProps({ content: 'Update product successfully' });
    } catch (error) {
      setToastProps({
        content: 'There was an error update this product',
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (product?.data) {
      setData(product.data[0]);
    }
  }, [product]);

  return (
    <>
      <Modal
        open={active}
        onClose={handleChange}
        title='Edit Product'
        primaryAction={{
          content: 'Save',
          onAction: handleUpdateProduct,
          loading,
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: handleChange,
          },
        ]}
      >
        <Modal.Section>
          <ProductForm
            data={data}
            setData={setData}
            loading={isRefetching || isLoading}
          />
        </Modal.Section>
      </Modal>
    </>
  );
};
