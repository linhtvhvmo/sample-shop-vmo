import "dotenv/config";
import express from "express";
import { readFileSync } from "fs";
import { join } from "path";
import serveStatic from "serve-static";
import GDPRWebhookHandlers from "../gdpr.js";
import shopifyApi from "../shopify.js";
import {
  getListMetaObject,
  getListOfMetaDef,
  getListSchedule,
  getMetaDefById,
} from "./service/meta.object.js";
import * as scheduleService from "./service/schedule.object";
import * as scheduleOrderService from "./service/schedule-order.object"

const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopifyApi.config.auth.path, shopifyApi.auth.begin());
app.get(
  shopifyApi.config.auth.callbackPath,
  shopifyApi.auth.callback(),
  shopifyApi.redirectToShopifyOrAppRoot()
);
app.post(
  shopifyApi.config.webhooks.path,
  shopifyApi.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

// All endpoints after this point will require an active session
app.use("/api/*", shopifyApi.validateAuthenticatedSession());

app.use(express.json());

app.get("/api/products/count", async (_req, res) => {
  const countData = await shopifyApi.api.rest.Product.count({
    session: res.locals.shopify.session,
  });
  console.log(countData);
  res.status(200).send(countData);
});

app.get("/api/products/get-product-shopify", async (_req, res) => {
  const result = await shopifyApi.api.rest.Product.all({
    session: res.locals.shopify.session,
  });
  res.status(200).send(result);
});

app.get("/api/metaobject/get-list-definition", async (_req, res) => {
  let page = 1;
  if (!_req.query.page) {
    page = 1;
  } else {
    page = _req.query.page;
  }
  const result = await getListOfMetaDef(
    page,
    res.locals.shopify.session,
    _req.headers.host
  );
  res.status(200).send(result);
});

app.get("/api/metaobject/get-definition", async (_req, res) => {
  const result = await getMetaDefById(
    _req.query.id,
    res.locals.shopify.session,
    _req.headers.host
  );
  res.status(200).send(result);
});

app.get("/api/metaobject/get-list", async (_req, res) => {
  let page = 1;
  if (!_req.query.page) {
    page = 1;
  } else {
    page = _req.query.page;
  }
  const result = await getListMetaObject(
    _req.query.type,
    page,
    res.locals.shopify.session,
    _req.headers.host
  );
  res.status(200).send(result);
});

app.get("/api/metaobject/get-metaobject", async (_req, res) => {
  const result = await getMetaObjectById(
    _req.query.id,
    res.locals.shopify.session,
    _req.headers.host
  );
  res.status(200).send(result);
});

// SCHEDULE DELIVERY ROUTES
app.get("/api/metaobject/get-schedule", async (_req, res) => {
  let page = _req.query.page ? _req.query.page : 1;
  const result = await scheduleService.getListSchedule(
    page,
    res.locals.shopify.session,
    _req.headers.host
  );
  res.status(200).send(result);
});

app.get("/api/metaobject/get-one-schedule/:id", async (_req, res) => {
  const result = await scheduleService.getScheduleById(
    _req.query.id,
    res.locals.shopify.session,
    _req.headers.host
  );
  res.status(200).send(result);
});

app.post("/api/metaobject/create-schedule", async (_req, res) => {
  const result = await scheduleService.createSchedule(
    _req.body.scheduleDate,
    _req.body.comment,
    _req.body.customerType,
    _req.body.maximumOrder,
    _req.body.isCustomed,
    _req.body.identity,
    _req.body.area,
    _req.body.district,
    res.locals.shopify.session,
    _req.headers.host
  );
  res.status(200).send(result);
});

app.post("/api/metaobject/update-one-schedule/:id", async (_req, res) => {
  const result = await scheduleService.updateScheduleById(
    _req.query.id,
    _req.body.scheduleDate,
    _req.body.comment,
    _req.body.customerType,
    _req.body.maximumOrder,
    _req.body.isCustomed,
    _req.body.identity,
    _req.body.area,
    _req.body.district,
    res.locals.shopify.session,
    _req.headers.host
  );
  res.status(200).send(result);
});

app.post("/api/metaobject/delete-schedule", async (_req, res) => {
  const result = await scheduleService.deleteBulkSchedule(
    _req.body.ids,
    res.locals.shopify.session,
    _req.headers.host
  );
  res.status(200).send(result);
});

// SCHEDULE ORDER ROUTES
app.get("/api/metaobject/get-schedule-order", async (_req, res) => {
  let page = _req.query.page ? _req.query.page : 1;
  const result = await scheduleOrderService.getListScheduleOrder(
    page,
    res.locals.shopify.session,
    _req.headers.host
  );
  res.status(200).send(result);
});

app.get("/api/metaobject/get-one-schedule-order/:id", async (_req, res) => {
  const result = await scheduleOrderService.getScheduleOrderById(
    _req.query.id,
    res.locals.shopify.session,
    _req.headers.host
  );
  res.status(200).send(result);
});

app.post("/api/metaobject/create-schedule-order", async (_req, res) => {
  const result = await scheduleOrderService.createScheduleOrder(
    _req.body.identity,
    _req.body.scheduleId,
    _req.body.orderId,
    res.locals.shopify.session,
    _req.headers.host
  );
  res.status(200).send(result);
});

app.post("/api/metaobject/update-one-schedule-order/:id", async (_req, res) => {
  const result = await scheduleOrderService.updateScheduleOrderById(
    _req.query.id,
    _req.body.identity,
    _req.body.scheduleId,
    _req.body.orderId,
    res.locals.shopify.session,
    _req.headers.host
  );
  res.status(200).send(result);
});

app.post("/api/metaobject/delete-schedule-order", async (_req, res) => {
  const result = await scheduleOrderService.deleteBulkScheduleOrder(
    _req.body.ids,
    res.locals.shopify.session,
    _req.headers.host
  );
  res.status(200).send(result);
});

// START APP
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopifyApi.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
