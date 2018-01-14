# fetch-with-status
fetch with status helpers

[![npm version](https://badge.fury.io/js/fetch-with-status.svg)](https://badge.fury.io/js/fetch-with-status)

# Installation

```
npm install fetch-with-status

yarn add fetch-with-status
```

## Summary

* [API](#api)
* [usage](#usage)
* [todo](#todo)

# API

## Status handler

Starts with `on` then continues with status code ex `on400`.

What gets returned from status handler get passed to original promise chain.

### Syntax

```javascript
  .on206((request) => {})
```

### Parameters

* function:
    * param:
        * response: fetch response object
    * returns: any

### Return value
_self_ so we can chain multible status handlers

## Build
### Syntax

```javascript
  .build()
```

### Parameters

none

### Return value
_Promise_: originl fetch promise


# Usage

```javascript
// Require it like this
const {withStatus} = require('fetch-with-status')

//Wrap your fetch with the `withStatus` function
withStatus(fetch(/*URL*/))
  // then add all the status handlers you want
  // the full request object is returned in all handlers
  .on206((request) => {
    console.log('we got an 206 response')
  })
  // after you added all your desired handlers call .build
  .build()
  // now we return the original promise so you can add a .catch or chain .then
  .catch((error) => {

  })
```

## example

```javascript
const {withStatus} = require('fetch-with-status')

withStatus(fetch('https://jsonplaceholder.typicode.com/posts/1'))
  .on200((request) => {
    // only requests with status 200 land here
    return on200.json()
  })
  .on404((request) => {
    // only requests with status 404 land here
    throw new Error('Oh no!')
  })
  .build()
  // now we have a normal promise and all returns from fns above land here
  .then((json) => {

    console.log(json)
  })
  .catch((error) => {
    console.log('error', error.message)
  })
```

# TODO:
- make stuff immutable (more fp)
- tests

