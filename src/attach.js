// @flow
import React from "react";
import ReactDOM from "react-dom";
import partial from "lodash/partial";

import { getOptionByValue, getOptionsBySearch } from "./graphql";
import Autocomplete from "./Autocomplete";

import type { SelectOption, OptionSet } from "./types";

type AfterReplace = (name: string, initial: ?SelectOption) => void;

async function replaceInput(
  input: HTMLInputElement,
  getByValue: string => Promise<?SelectOption>,
  getOptions: string => Promise<OptionSet>
) {
  const { name, value } = input;

  const initial = await getByValue(value);

  let reactPlaceholder = input;
  const parentNode = input.parentNode;
  if (parentNode) {
    reactPlaceholder = document.createElement("div");
    parentNode.replaceChild(reactPlaceholder, input);
  }

  ReactDOM.render(
    <Autocomplete name={name} initial={initial} getOptions={getOptions} />,
    reactPlaceholder
  );
  return { name, initial };
}

export default function attach(
  graphqlUrl: string,
  getQuery: string,
  searchQuery: string,
  authToken: string,
  flag: string = "data-graphql-autocomplete",
  afterReplace: ?AfterReplace = null
) {
  const getByValue = partial(getOptionByValue, graphqlUrl, getQuery, authToken);
  const getOptions = partial(
    getOptionsBySearch,
    graphqlUrl,
    searchQuery,
    authToken
  );
  document.addEventListener("DOMContentLoaded", function() {
    const inputs: any = document.querySelectorAll(`input[${flag}]`);
    inputs.forEach(async (i: HTMLInputElement) => {
      const { name, initial } = await replaceInput(i, getByValue, getOptions);
      if (afterReplace) {
        afterReplace(name, initial);
      }
    });
  });
}
