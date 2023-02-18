import { Toast } from '@shopify/app-bridge-react';
import { Card } from '@shopify/polaris';
import { useState } from 'react';
import { CustomTable } from '../../components';
import { useAppQuery } from '../../hooks';

export const ProductManagement = () => {
  const emptyToastProps = { content: null };
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const {
    data: productList,
    refetch: refreshTest,
    isLoading: isLoading,
    isRefetching: isRefetchingTest,
  } = useAppQuery({
    url: '/api/products/get-products',
    reactQueryOptions: {
      onSuccess: () => {
        setToastProps({ content: 'Get data successfully!' });
      },
      onError: () => {
        setToastProps({
          content: 'There was an error get list products',
          error: true,
        });
      },
    },
  });

  const handleGetListProduct = async () => {
    await refreshTest();
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
          content: 'Reload list',
          onAction: () => {
            handleGetListProduct();
          },
          loading: isLoading,
        }}
      >
        <CustomTable
          loading={isRefetchingTest || isLoading}
          data={productList?.data}
          headings={['Title', 'Body', 'Vendor', 'Type', 'Published']}
          ignoreFields={['image']}
        />
      </Card>
    </>
  );
};
