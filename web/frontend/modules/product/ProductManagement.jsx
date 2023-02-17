import { Toast } from '@shopify/app-bridge-react';
import { Card } from '@shopify/polaris';
import { useState } from 'react';
import { CustomTable } from '../../components';
import { useAppQuery, useAuthenticatedFetch } from '../../hooks';

export const ProductManagement = () => {
  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(true);
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const fetch = useAuthenticatedFetch();
  const {
    data: productList,
    refetch: refreshTest,
    isLoading: isLoadingTest,
    isRefetching: isRefetchingTest,
  } = useAppQuery({
    url: '/api/products/get-products',
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });

  const handleTest = async () => {
    setIsLoading(true);
    const response = await fetch('/api/products/get-products');

    if (response.ok) {
      setToastProps({ content: 'Get data successfully!' });
      await refreshTest();
    } else {
      setIsLoading(false);
      setToastProps({
        content: 'There was an error creating products',
        error: true,
      });
    }
  };

  const toastMarkup = toastProps.content && !isRefetchingTest && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );

  return (
    <>
      {toastMarkup}
      <Card
        title='Product List'
        sectioned
        primaryFooterAction={{
          content: 'Product list',
          onAction: () => {
            handleTest();
          },
          loading: isLoading,
        }}
      >
        {!isLoadingTest && <CustomTable data={productList.data} />}
      </Card>
    </>
  );
};
