import shopifyGraphQuery from "../../shopifyGraph.js";
import * as metaObjectService from "./meta.object.js";
import * as commonService from "./common";
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
      metaobjectCreate(
        metaobject: {
        type: "${typeList.schedule}",
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

export const updateSchedulePriority = async (id, priority, session, host) => {
  const response = await shopifyGraphQuery(
    host,
    session,
    `mutation {
        metaobjectUpdate(
          id: "${id}",
          metaobject: {
          fields: [
            { key: "priority", value: "${priority}" },
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

export const getScheduleForCheckout = async (fromDate, toDate, session, host) => {
  const getScheduleList = await metaObjectService.getListMetaObject(
    typeList.schedule,
    9.9,
    session,
    host
  );

  const scheduleDataList = [];

  for (let i = 0; i < getScheduleList.body.data.metaobjects.edges.length; i++) {
    element = getScheduleList.body.data.metaobjects.edges[i].node;
    const scheduleDataObj = commonService.parseFieldsToObj(element.fields);
    scheduleDataObj.id = element.id;

    const checkDateBetween = commonService.checkDateBetween(fromDate, toDate, scheduleDataObj.schedule_date)
    if (scheduleDataObj.is_customed === "0") {
      scheduleDataList.push(scheduleDataObj);
    } else if (scheduleDataObj.is_customed === "1" && checkDateBetween) {
      scheduleDataList.push(scheduleDataObj);
    }
  }

  return scheduleDataList;
};
