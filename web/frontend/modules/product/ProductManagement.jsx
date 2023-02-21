import { TitleBar, Toast } from '@shopify/app-bridge-react';
import { Card, Layout } from '@shopify/polaris';
import { useState } from 'react';
import { CustomTable } from '../../components';
import { useAppQuery } from '../../hooks';
import { ProductCreate } from './ProductCreate';
import { ProductDetail } from './ProductDetail';

export const ProductManagement = () => {
  const emptyToastProps = { content: null };
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const [detail, setDetail] = useState(false);
  const [create, setCreate] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const {
    data: productList,
    refetch: refetchList,
    isLoading: isLoading,
    isRefetching: isRefetching,
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

  const toastMarkup = toastProps.content && !isRefetching && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );

  const handleOpenDetail = () => {
    setDetail(true);
  };

  const handleOpenCreate = () => {
    setCreate(true);
  };

  const handleSuccess = async () => {
    setCreate(false);
    await refetchList();
  };

  return (
    <>
      <TitleBar
        title='Product'
        primaryAction={{
          content: 'Create',
          onAction: handleOpenCreate,
          loading: isRefetching || isLoading,
        }}
        secondaryActions={[
          {
            content: 'Delete',
            onAction: () => console.log('Secondary action'),
            loading: isRefetching || isLoading,
            disabled: selectedProduct.length !== 1,
          },
          {
            content: 'Edit',
            onAction: handleOpenDetail,
            loading: isRefetching || isLoading,
            disabled: selectedProduct.length !== 1,
          },
        ]}
      />
      <Layout>
        <Layout.Section>
          <Card
            title='Product List'
            sectioned
            primaryFooterAction={{
              content: 'Reload list',
              onAction: () => {
                refetchList();
              },
              loading: isRefetching || isLoading,
            }}
          >
            <CustomTable
              loading={isRefetching || isLoading}
              data={productList?.data}
              headings={['Title', 'Body', 'Vendor', 'Type', 'Published']}
              ignoreFields={['image']}
              setSelected={setSelectedProduct}
            />
          </Card>
        </Layout.Section>
      </Layout>
      {toastMarkup}
      {selectedProduct.length === 1 && (
        <ProductDetail
          id={selectedProduct[0]}
          setActive={setDetail}
          active={detail}
          setToastProps={setToastProps}
        />
      )}
      <ProductCreate
        setActive={setCreate}
        active={create}
        setToastProps={setToastProps}
        handleSuccess={handleSuccess}
      />
    </>
  );
};
