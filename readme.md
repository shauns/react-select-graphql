# react-select-graphql

[![Greenkeeper badge](https://badges.greenkeeper.io/shauns/react-select-graphql.svg)](https://greenkeeper.io/)

Use GraphQL to power auto-complete

## What is this?

A helper for replacing `<input>`s with a React-based autocomplete component, backed by GraphQL. It uses [react-select](https://github.com/JedWatson/react-select.git) for the widget, and plain `fetch` for communicating with the GraphQL server.

## Authentication

This library presumes you need to authenticate callers, and expects you to provide an authentication token, which it puts in the `Authorization` header.


## GraphQL Queries

You have to provide two queries -- one to fetch an item by its value, and one that searches for items by a string query. In both cases, the eventual items should have properties `label` and `value`, and the root query should alias into `result`. For the search query, a Relay style `edges` and `node` structure is expected. The example below in the API demonstrates things best.

## Installing

You can install via Yarn/NPM:

```console
yarn add react-select-graphql
```

Or, you can use [unpkg](unpkg.com) -- in this case you need to ensure you also have `React` and `ReactDOM` available on the page.

```html
<script crossorigin src="https://unpkg.com/react@15/dist/react.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@15/dist/react-dom.js"></script>
<script src="https://unpkg.com/react-select-graphql/dist/react-select-graphql.min.js" />
<script>
  ReactSelectGraphql(/* See Below */);
</script>
```

## API

```jsx
import ReactSelectGraphql from 'react-select-graphql';

ReactSelectGraphql(
  // GraphQL endpoint
  'https://example.com/graphql',
  // Single item query, expecting `id` variable
  'result: Item(id:$id) { label: itemName, value: itemValue }',
  // Multiple item search, expecting `q` variable
  'result: FindItems(q:$q) { edges { node { label: itemName, value: itemValue } } }',
  // Auth token, put into `Authorization: Bearer auth-token`
  'auth-token'
);
```
