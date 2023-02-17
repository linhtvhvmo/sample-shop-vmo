import 'dotenv/config';
import express from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import serveStatic from 'serve-static';
import GDPRWebhookHandlers from '../gdpr.js';
import productCreator from '../product-creator.js';
import shopify from '../shopify.js';
import { getProductImageService } from './service/product-image/product-image-service.js';
import { getProductService } from './service/product/product-service.js';
const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);

const STATIC_PATH =
  process.env.NODE_ENV === 'production'
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot(),
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers }),
);

// All endpoints after this point will require an active session
app.use('/api/*', shopify.validateAuthenticatedSession());

app.use(express.json());

app.get('/api/products/count', async (_req, res) => {
  const countData = await shopify.api.rest.Product.count({
    session: res.locals.shopify.session,
  });
  console.log(countData);
  res.status(200).send(countData);
});

app.get('/api/products/get-products', async (_req, res) => {
  let status = 200;
  let error = null;
  let data = null;
  try {
    data = await getProductService();
    console.log(data);
  } catch (err) {
    console.log(err.message);
    status = 500;
    error = err.message;
  }
  res.status(status).send({ success: status === 200, error, data });
});

app.get('/api/products/get-product-images', async (_req, res) => {
  let status = 200;
  let error = null;
  let data = null;
  try {
    data = await getProductImageService();
    console.log(data);
  } catch (err) {
    console.log(err.message);
    status = 500;
    error = err.message;
  }
  res.status(status).send({ success: status === 200, error, data });
});

app.get('/api/products/create', async (_req, res) => {
  let status = 200;
  let error = null;

  try {
    await productCreator(res.locals.shopify.session);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});

app.use(serveStatic(STATIC_PATH, { index: false }));

app.use('/*', shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set('Content-Type', 'text/html')
    .send(readFileSync(join(STATIC_PATH, 'index.html')));
});

app.listen(PORT);
