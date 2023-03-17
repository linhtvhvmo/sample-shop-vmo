import { TitleBar } from '@shopify/app-bridge-react';
import { Button, Card, Layout, Page } from '@shopify/polaris';
import { useAppQuery, useAuthenticatedFetch } from '../hooks';

export default function HomePage() {
  const fetch = useAuthenticatedFetch()

  const handleGet = async() => {
    const response = await fetch('/api/metaobject/get-schedule',{ method: "GET" })
    console.log(await response.json())
  } 
  const handlePost = async() => {
    const response = await fetch('',{ method: "POST", body: undefined })
    console.log(await response.json())
  } 
  const handlePut = async() => {
    const response = await fetch('',{ method: "PUT", body: undefined })
    console.log(await response.json())
  } 
  const handleDelete = async() => {
    const response = await fetch('',{ method: "DELETE" })
    console.log(await response.json())
  } 

  return (
    <Page narrowWidth>
      <TitleBar title='App name' primaryAction={null} />
      <Layout>
        <Layout.Section>
          <Card sectioned><Button onClick={handleGet}>get</Button>
        <Button onClick={handlePost}>post</Button>
        <Button onClick={handlePut}>put</Button>
        <Button onClick={handleDelete}>delete</Button></Card>
        </Layout.Section>
        
      </Layout>
    </Page>
  );
}
