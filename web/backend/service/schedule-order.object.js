import shopifyGraphQuery from "../../shopifyGraph.js";
import * as metaObjectService from "./meta.object";
import { typeList } from "./constants.js";

//Schedule API
export const getListScheduleOrder = async (page, session, host) => {
  const response = await metaObjectService.getListMetaObject(
    typeList.scheduleOrder,
    page,
    session,
    host
  );
  return response;
};

export const getScheduleOrderById = async (id, session, host) => {
  const response = await metaObjectService.getMetaObjectById(id, session, host);
  return response;
};

export const createScheduleOrder = async (
  identity,
  scheduleId,
  orderId,
  session,
  host
) => {
  const response = await shopifyGraphQuery(
    host,
    session,
    `mutation {
      metaobjectCreate(
        metaobject: {
        type: "${typeList.scheduleOrder}",
        fields: [
          { key: "identity", value: "${identity}" },
          { key: "schedule_id", value: "${scheduleId}" },
          { key: "order_id", value: "${orderId}" },
        ],
      }) {
        metaobject {
          id
          displayName
          fields {
            key
            value
          }
        }
      },
    }`
  );
  return response;
};

export const updateScheduleOrderById = async (
  id,
  identity,
  scheduleId,
  orderId,
  session,
  host
) => {
  const response = await shopifyGraphQuery(
    host,
    session,
    `mutation {
        metaobjectUpdate(
          id: "${id}",
          metaobject: {
          fields: [
            { key: "identity", value: "${identity}" },
            { key: "schedule_id", value: "${scheduleId}" },
            { key: "order_id", value: "${orderId}" },
          ],
        }) {
          metaobject {
            id
            displayName
            fields {
              key
              value
            }
          }
        },
      }`
  );
  return response;
};

export const deleteBulkScheduleOrder = async (idArr, session, host) => {
  const response = await metaObjectService.deleteBulk(idArr, session, host);
  return response;
};
