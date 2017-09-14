// @flow
import React from "react";
import Select from "react-select";
import { State } from "react-powerplug";
import "react-select/dist/react-select.css";

import type { SelectOption, OptionSet } from "./types";

type GetOptions = (q: string) => Promise<OptionSet>;

const Autocomplete = ({
  name,
  initial,
  getOptions
}: {
  name: string,
  initial: ?SelectOption,
  getOptions: GetOptions
}) => {
  return (
    <State initial={{ selected: initial }}>
      {({ state: { selected }, setState }) => (
        <Select.Async
          name={name}
          value={selected}
          loadOptions={getOptions}
          onChange={selected => setState({ selected })}
        />
      )}
    </State>
  );
};

export default Autocomplete;
