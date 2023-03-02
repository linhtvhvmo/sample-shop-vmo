import { shopifyApi } from '@shopify/shopify-api';
import '@shopify/shopify-api/adapters/node';

const shopifyGraphQuery = async (host, session, query) => {
  const shopify = new shopifyApi({
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecretKey: process.env.SHOPIFY_API_SECRET,
    scopes: ['read_products'],
    hostName: host,
  });

  const client = new shopify.clients.Graphql({
    session: session,
  });
  const result = await client.query({
    data: query,
  });
  return result;
};
export default shopifyGraphQuery;
