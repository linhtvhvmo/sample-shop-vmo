import { TitleBar } from '@shopify/app-bridge-react';
import { Layout, Page } from '@shopify/polaris';
import { ProductManagement } from '../modules/product/ProductManagement';

export default function ProductPage() {
  return (
    <Page>
      <TitleBar
        title='Product'
        primaryAction={{
          content: 'Create product',
          onAction: () => console.log('Primary action'),
        }}
        secondaryActions={[
          {
            content: 'Secondary action',
            onAction: () => console.log('Secondary action'),
          },
        ]}
      />
      <Layout>
        <Layout.Section>
          <ProductManagement />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
