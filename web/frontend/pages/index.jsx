import { TitleBar } from '@shopify/app-bridge-react';
import { Card, Layout, Page } from '@shopify/polaris';

export default function HomePage() {
  return (
    <Page narrowWidth>
      <TitleBar title='App name' primaryAction={null} />
      <Layout>
        <Layout.Section>
          <Card sectioned>index</Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
