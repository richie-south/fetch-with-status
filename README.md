# fetch-with-status
fetch with status helpers.

A small lib so you remember to check the status code of your request.

[![npm version](https://badge.fury.io/js/fetch-with-status.svg)](https://badge.fury.io/js/fetch-with-status)

# Installation

```
npm install fetch-with-status

yarn add fetch-with-status
```

# example

```javascript
const {withStatus} = require('fetch-with-status')

withStatus(fetch('https://jsonplaceholder.typicode.com/posts/1'))
  .when(200, (request) =>
    request.json())
  .when([404, 405], (request) =>
    throw new Error('Oh no!'))
  .build()
  .then((json) =>
    console.log(json))
  .catch((error) =>
    console.log('error', error.message))
```

## Summary

* [API](#api)
* [usage](#usage)
* [todo](#todo)

# API

## when

Takes a number | array of numbers and a function.

What gets returned from executed .when get passed to original promise chain after execution.

### Syntax

```javascript
  .when(206, (request, next) => {})

  .when([206, 500], (request, next) => {})
```

### Parameters

* number || Array of numbers: desired status code:s
* function:
    * params:
        * response: fetch response object
        * next: call `next()` if you want to continue to the standard .then promise chain
    * returns: any

### Return value
_self_ so we can chain multible `.when`

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

// Wrap your fetch with the `withStatus` function
withStatus(fetch(/*URL*/))
  // then add all the status handlers you want
  // the full request object is returned in all handlers
  .when(200, (request, next) => {
    console.log('we got an 206 response')
    // if you want to continue down the promise chain call 'next'
    // and your value will be passed down to the first .then
    next(request.json())
  })

  .when([404, 405, 406], (request) => {
    // here we don't call next because we don't want to continue down the promise chain
    console.log('we got an 404, 405 or 406 response')
  })
  // after you added all your desired handlers call .build
  .build()
  // now we have the original promise so we can add .then:s and a .catch
  .then(() => {
    // only request with handlers that call 'next' appear here
  })
  .catch((error) => {

  })
```

# TODO:
- make stuff immutable (more fp)
- tests

