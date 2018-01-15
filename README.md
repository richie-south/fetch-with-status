# fetch-with-status
fetch with status helpers.

A small lib so you remember to check the status code of your request.

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

## when

Takes a number and a function.

What gets returned from status handler get passed to original promise chain after execution.

### Syntax

```javascript
  .when(206, (request) => {})
```

### Parameters

* number: desired status code
* function:
    * param:
        * response: fetch response object
    * returns: any

### Return value
_self_ so we can chain multible `on`

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
  .when(206, (request) => {
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
  .when(200, (request) => {
    // only requests with status 200 land here
    return request.json()
  })
  .when(404, (request) => {
    // only requests with status 404 land here
    throw new Error('Oh no!')
  })
  .build()
  // now we have a normal promise and return value from executed fn above land here
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

