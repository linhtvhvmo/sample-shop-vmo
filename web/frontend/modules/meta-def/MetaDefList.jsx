import { TitleBar } from '@shopify/app-bridge-react';
import { Card, Layout } from '@shopify/polaris';
import { useState } from 'react';
import { CustomTable } from '../../components';
import { useAppQuery } from '../../hooks';
import { MetaDefInfo } from './MetaDefInfo';

export const MetaDefList = () => {
  const emptyToastProps = { content: null };
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [detail, setDetail] = useState(false);

  const {
    data: dataDefList,
    refetch: refreshListDef,
    isLoading: isLoadingListDef,
    isRefetching: isRefetchingDef,
  } = useAppQuery({
    url: '/api/metaobject/get-list-definition',
    reactQueryOptions: {
      onSuccess: () => {
        setToastProps({ content: 'Get data successfully!' });
      },
      onError: () => {
        setToastProps({
          content: 'There was an error get list definitions',
          error: true,
        });
      },
    },
  });

  const toastMarkup = toastProps.content && !refreshListDef && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );
  const handleOpenDetail = () => {
    setDetail(true);
  };
  return (
    <>
      {toastMarkup}
      <TitleBar
        title='Metaobject definitions'
        secondaryActions={[
          {
            content: 'Edit',
            onAction: handleOpenDetail,
            loading: isRefetchingDef || isLoadingListDef,
            disabled: selectedProduct.length !== 1,
          },
        ]}
      />
      <Layout>
        <Layout.Section>
          <Card
            title='Definition List'
            sectioned
            primaryFooterAction={{
              content: 'Reload list',
              onAction: () => {
                refreshListDef();
              },
              loading: isLoadingListDef || isRefetchingDef,
            }}
          >
            <CustomTable
              loading={isRefetchingDef || isLoadingListDef}
              headings={['Display name key', 'id', 'Name Definition']}
              data={dataDefList?.body?.data?.metaobjectDefinitions?.nodes}
              setSelected={setSelectedProduct}
            />
          </Card>
        </Layout.Section>
      </Layout>
      {selectedProduct.length === 1 && (
        <MetaDefInfo
          id={selectedProduct[0]}
          setActive={setDetail}
          active={detail}
          setToastProps={setToastProps}
        />
      )}
    </>
  );
};
