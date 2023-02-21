import { Modal } from '@shopify/polaris';
import { useCallback, useState } from 'react';
import { useAuthenticatedFetch } from '../../hooks';
import { ProductForm } from './ProductForm';

const initialState = {
  title: '',
  bodyHtml: '',
  vendor: '',
  productType: '',
  published: false,
};

export const ProductCreate = ({
  setActive,
  active,
  setToastProps,
  handleSuccess,
}) => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const fetch = useAuthenticatedFetch();

  const handleUpdateProduct = async () => {
    setLoading(true);
    try {
      await fetch(`/api/products/create`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      setData(initialState);
      handleSuccess();
      setToastProps({ content: 'Create product successfully' });
    } catch (error) {
      setToastProps({
        content: 'There was an error create this product',
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = useCallback(() => setActive(!active), [active]);

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
          <ProductForm data={data} setData={setData} />
        </Modal.Section>
      </Modal>
    </>
  );
};
