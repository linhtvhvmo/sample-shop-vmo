import shopifyGraphQuery from "../../shopifyGraph.js";
import * as metaObjectService from "./meta.object";
import { typeList } from "./constants.js";

//Schedule API
export const getListSchedule = async (page, session, host) => {
  const response = await metaObjectService.getListMetaObject(
    typeList.schedule,
    page,
    session,
    host
  );
  return response;
};

export const getScheduleById = async (id, session, host) => {
  const response = await metaObjectService.getMetaObjectById(id, session, host);
  return response;
};

export const createSchedule = async (
  scheduleDate,
  comment,
  customerType,
  maximumOrder,
  isCustomed,
  identity,
  area,
  district,
  session,
  host
) => {
  const response = await shopifyGraphQuery(
    host,
    session,
    `mutation {
        metaobjectUpdate(
          type: "${typeList.schedule}",
          metaobject: {
          fields: [
            { key: "schedule_date", value: "${scheduleDate}" },
            { key: "comment", value: "${comment}" },
            { key: "customer_type", value: "${customerType}" },
            { key: "maximum_order", value: "${maximumOrder}" },
            { key: "is_customed", value: "${isCustomed}" },
            { key: "identity", value: "${identity}" },
            { key: "area", value: "${area}" },
            { key: "district", value: "${district}" },
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

export const updateScheduleById = async (
  id,
  scheduleDate,
  comment,
  customerType,
  maximumOrder,
  isCustomed,
  identity,
  area,
  district,
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
            { key: "schedule_date", value: "${scheduleDate}" },
            { key: "comment", value: "${comment}" },
            { key: "customer_type", value: "${customerType}" },
            { key: "maximum_order", value: "${maximumOrder}" },
            { key: "is_customed", value: "${isCustomed}" },
            { key: "identity", value: "${identity}" },
            { key: "area", value: "${area}" },
            { key: "district", value: "${district}" },
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

export const deleteBulkSchedule = async (idArr, session, host) => {
  const response = await metaObjectService.deleteBulk(idArr, session, host);
  return response;
};
