import { TitleBar } from '@shopify/app-bridge-react';
import { Card, Heading, Layout, Page, TextContainer } from '@shopify/polaris';
import { ProductManagement } from '../modules/product/ProductManagement';

export default function ProductPage() {
  return (
    <Page>
      <TitleBar
        title='Product'
        primaryAction={{
          content: 'Primary action',
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
          <Card sectioned>
            <Heading>Products list</Heading>
            <TextContainer>
              <ProductManagement />
            </TextContainer>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
