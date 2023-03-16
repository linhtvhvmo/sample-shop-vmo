import shopifyGraphQuery from '../../shopifyGraph.js';

export const getListOfMetaDef = async (page, session, host) => {
  const response = await shopifyGraphQuery(
    host,
    session,
    `{
    metaobjectDefinitions(first:${page * 10}){
      nodes {
        displayNameKey
        id
        name
      }
    }
  }`,
  );
  return response;
};

export const getMetaDefById = async (id, session, host) => {
  const response = await shopifyGraphQuery(
    host,
    session,
    `{
            metaobjectDefinition(id: "${id}"){
              id
              displayNameKey
              name
              fieldDefinitions {
                key
                name
                required
                description
              }
            }
          }`,
  );
  return response;
};

export const getListMetaObject = async (type, page, session, host) => {
  const response = await shopifyGraphQuery(
    host,
    session,
    `{
            metaobjects(type: ${type}, first: ${page * 10}){
            edges{
              node{
                id
                displayName
                fields{
                  key
                  value
                }
                definition {
                  displayNameKey
                  fieldDefinitions{
                    key
                    name
                  }
                }
              }
            }
          }
        }`,
  );
  return response;
};

//Schedule API
export const getListSchedule = async (page, session, host) => {
  const type = "schedule";
  const response = await shopifyGraphQuery(
    host,
    session,
    `{
            metaobjects(type: "${type}", first: ${page * 10}){
            edges{
              node{
                id
                displayName
                fields{
                  key
                  value
                }
                definition {
                  displayNameKey
                  fieldDefinitions{
                    key
                    name
                  }
                }
              }
            }
          }
        }`,
  );
  return response;
};

export const getScheduleById = async (id, session, host) => {
  const response = await shopifyGraphQuery(
    host,
    session,
    `{
            metaobject(id:"${id}"){
                id
            displayName
            handle
            fields {
              key
              value
            }
          }
        }`,
  );
  return response;
};

export const updateScheduleById = async (id, session, host) => {
  return response;
};

export const deleteScheduleById = async (idArr, session, host) => {
  return response;
};


//Schedule Order API
export const getListScheduleOrder = async (page, session, host) => {
  const type = "schedule";
  const response = await shopifyGraphQuery(
    host,
    session,
    `{
            metaobjects(type: "${type}", first: ${page * 10}){
            edges{
              node{
                id
                displayName
                fields{
                  key
                  value
                }
                definition {
                  displayNameKey
                  fieldDefinitions{
                    key
                    name
                  }
                }
              }
            }
          }
        }`,
  );
  return response;
};

export const getScheduleOrderById = async (id, session, host) => {
  const response = await shopifyGraphQuery(
    host,
    session,
    `{
            metaobject(id:"${id}"){
                id
            displayName
            handle
            fields {
              key
              value
            }
          }
        }`,
  );
  return response;
};

export const updateScheduleOrderById = async (id, session, host) => {
  return response;
};

export const deleteScheduleOrderById = async (idArr, session, host) => {
  return response;
};


