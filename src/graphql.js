// @flow
import type { SelectOption, OptionSet } from "./types";

type Transformer<T> = (res: { data: any }) => T;

async function execute<T>(
  url: string,
  graphQLParams: Object,
  authToken: string,
  transform: Transformer<T>
): Promise<T> {
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(graphQLParams)
  });

  const data = await response.json();
  return transform(data);
}

export async function getOptionsBySearch(
  url: string,
  query: string,
  authToken: string,
  search: string
): Promise<OptionSet> {
  const operation = `query Search($q:String!) { ${query} }`;
  const graphQLParams = {
    operationName: "Search",
    variables: {
      q: search
    },
    query: operation
  };
  const transform = ({ data }) => {
    return {
      options: data.result.edges.map(e => ({
        value: e.node.value,
        label: e.node.label
      }))
    };
  };
  return execute(url, graphQLParams, authToken, transform);
}

export async function getOptionByValue(
  url: string,
  query: string,
  authToken: string,
  useIdForLookup: boolean,
  value: string
): Promise<?SelectOption> {
  if (!value) {
    return Promise.resolve(null);
  }
  const varType = useIdForLookup ? "ID!" : "String!";
  const operation = `query Get($id:${varType}) { ${query} }`;

  const graphQLParams = {
    operationName: "Get",
    variables: {
      id: value
    },
    query: operation
  };

  return await execute(url, graphQLParams, authToken, ({ data }) => {
    const result = data.result;
    return {
      value: result.value,
      label: result.label
    };
  });
}
