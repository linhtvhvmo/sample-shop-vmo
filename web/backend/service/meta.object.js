import shopifyGraphQuery from "../../shopifyGraph.js";

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
  }`
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
          }`
  );
  return response;
};

export const getListMetaObject = async (type, page, session, host) => {
  const response = await shopifyGraphQuery(
    host,
    session,
    `{
      metaobjects(type: "${type}", first: ${page * 10}) {
        edges {
          node {
            id
            displayName
            fields {
              key
              value
            }
            definition {
              displayNameKey
              fieldDefinitions {
                key
                name
              }
            }
          }
        }
      }
    }`
  );
  return response;
};

export const getMetaObjectById = async (id, session, host) => {
  const response = await shopifyGraphQuery(
    host,
    session,
    `{
      metaobject(id: "${id}") {
        id
        displayName
        handle
        fields {
          key
          value
        }
      }
    }`
  );
  return response;
};

export const deleteBulk = async (idArr, session, host) => {
  const response = await shopifyGraphQuery(
    host,
    session,
    `mutation {
        metaobjectBulkDelete(where: {
          ids: ["${idArr}"],
        }) {
          job {
            id
          }
        }
      }`
  );
  return response;
};
